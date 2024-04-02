import asyncStorage, { Keys } from "@utils/asyncStorage";
import client, { baseURL } from "app/api/client";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { Profile, updateAuthState } from "app/store/auth";
import { Dispatch, UnknownAction } from "redux";
import { Response } from "app/hooks/useClient";
import { io } from "socket.io-client";
import { updateConversation } from "app/store/conversation";

const socket = io(baseURL, { path: "/socket-message", autoConnect: false });

type MessageProfile = {
  id: string;
  name: string;
  avatar?: string;
};

export type NewMessageResponse = {
  message: {
    id: string;
    time: string;
    text: string;
    user: MessageProfile;
  };
  from: MessageProfile;
  conversationId: string;
};

export const handleSocketConnection = (
  profile: Profile,
  dispatch: Dispatch<UnknownAction>
) => {
  socket.auth = { token: profile?.accessToken };
  socket.connect();

  socket.on("chat:message", (data: NewMessageResponse) => {
    const { conversationId, from, message } = data;

    dispatch(
      updateConversation({
        conversationId,
        chat: message,
        peerProfile: from,
      })
    );
  });

  socket.on("connect_error", async (error) => {
    if (error.message === "jwt expired!") {
      const refreshToken = await asyncStorage.get(Keys.REFRESH_TOKEN);
      const res = await runAxiosAsync<Response>(
        client.post(`${baseURL}/auth/refresh-token`, { refreshToken })
      );
      if (res) {
        await asyncStorage.save(Keys.AUTH_TOKEN, res.tokens.access);
        await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh);
        dispatch(
          updateAuthState({
            profile: { ...profile, accessToken: res.tokens.access },
            pending: false,
          })
        );
        socket.auth = { token: res.tokens.access };
        socket.connect();
      }
    }
  });
};

export default socket;
