import Pusher, { Channel } from "pusher-js";

let PUSHER: Pusher;

const setPusher = (key: string, cluster: string) => {
  if (!PUSHER) {
    PUSHER = new Pusher(key, {
      cluster: cluster,
    });
  }
};

const subscribeChannel = (channelName: string): Channel | null => {
  if (PUSHER) {
    return PUSHER.subscribe(channelName);
  }
  return null;
};

const unsubscribeChannel = (channelName: string) => {
  if (PUSHER) {
    PUSHER.unsubscribe(channelName);
  }
};

const bindEvent = (channel: Channel, eventName: string, handler: Function) => {
  channel.bind(eventName, handler);
};

const unbindEvent = (channel: Channel, eventName: string) => {
  channel.unbind(eventName);
};

export {
  setPusher,
  subscribeChannel,
  unsubscribeChannel,
  bindEvent,
  unbindEvent,
};
