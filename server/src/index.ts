import "dotenv/config";
import "express-async-errors";
import "src/db";
import express from "express";
import authRouter from "routes/auth";
import formidable from "formidable";
import path from "path";
import http from "http";
import productRouter from "routes/product";
import { sendErrRes } from "./utils/helper";
import { Server } from "socket.io";
import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";
import morgan from "morgan";
import conversationRouter from "./routes/conversation";
import ConversationModel from "./models/conversation";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/socket-message",
});

app.use(morgan("dev"));
let cors = require("cors");
app.use(cors());
app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API Routes
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/conversation", conversationRouter);

//SOCKET.io
io.use((socket, next) => {
  const socketReq = socket.handshake.auth as { token: string } | undefined;
  if (!socketReq?.token) {
    return next(new Error("Unauthorized request!"));
  }

  try {
    socket.data.jwtDecode = verify(socketReq.token, process.env.JWT_SECRET!);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new Error("jwt expired!"));
    }

    return next(new Error("Invalid token!"));
  }

  next();
});

type MessageProfile = {
  id: string;
  name: string;
  avatar?: string;
};

type IncomingMessage = {
  message: {
    id: string;
    time: string;
    text: string;
    user: MessageProfile;
  };
  to: string;
  conversationId: string;
};

type OutgoingMessageResponse = {
  message: {
    id: string;
    time: string;
    text: string;
    user: MessageProfile;
  };
  from: MessageProfile;
  conversationId: string;
};

io.on("connection", (socket) => {
  const socketData = socket.data as { jwtDecode: { id: string } };
  const userId = socketData.jwtDecode.id;
  socket.join(userId);
  // console.log(socket.data);
  // console.log("user is connected");
  socket.on("chat:new", async (data: IncomingMessage) => {
    const { conversationId, to, message } = data;

    await ConversationModel.findByIdAndUpdate(conversationId, {
      $push: {
        chats: {
          sentBy: message.user.id,
          content: message.text,
          timestamp: message.time,
        },
      },
    });

    const messageResponse: OutgoingMessageResponse = {
      from: message.user,
      conversationId, 
      message: message,
    };

    socket.to(to).emit("chat:message", messageResponse);
  });

  socket.on('chat:typing', (typingData: {to: string, active: boolean}) => {
    socket.to(typingData.to).emit('chat:typing',{typing: typingData.active})
  })
});

app.post("/upload-file", async (req, res) => {
  const form = formidable({
    uploadDir: path.join(__dirname, "public"),
    filename(name, ext, part, form) {
      return Date.now() + "_" + part.originalFilename;
    },
  });
  await form.parse(req);
  res.send("ok");
});

app.use(function (err, req, res, next) {
  res.status(500).json({ message: err.message });
} as express.ErrorRequestHandler);

app.use("*", (req, res) => {
  sendErrRes(res, "Not Found!", 404);
});

server.listen(8000, () => {
  console.log("The app is running on http:/localhost:8000");
});
