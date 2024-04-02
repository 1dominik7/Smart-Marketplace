import { connect } from "mongoose";

const uri =
  "mongodb+srv://domen95:8xfDQeFKnr0GTejc@cluster0.adyshat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
connect(uri)
  .then(() => {
    console.log("db connected successfully.");
  })
  .catch((err) => {
    console.log("db connection error:", err.message);
  });
