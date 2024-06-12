import Pusher from "pusher-js";

import { useCallback } from "react";
import getConfig from "../services/user/getConfig";

const usePusher = () => {
  const setupPusher = useCallback(() => {
    getConfig()
      .then((response) => {
        const pusher = new Pusher(response.pusherKey, {
          cluster: response.pusherCluster,
        });

        const channel = pusher.subscribe(response.userPusherChannel);

        channel.bind("new-chat", () => {
          console.log("new chat");
        });

        channel.bind("new-message", () => {
          console.log("new message");
        });
      })
      .catch();
  }, []);

  return {
    setupPusher,
  };
};

export default usePusher;
