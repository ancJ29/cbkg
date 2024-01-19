import callApi from "@/services/api";
import { Message } from "@/types";
import { create } from "zustand";

type UserStore = {
  messages: Message[];
  loadMessage: () => void;
};

export default create<UserStore>((set) => ({
  messages: [],
  loadMessage: async () => {
    const res = await callApi<unknown, ApiFetchResponse>({
      action: "get-messages",
      params: {},
    });

    res?.messages &&
      set({
        messages: res?.messages.map((message) => ({
          ...message,
          params: JSON.parse(message.params as unknown as string),
        })),
      });
  },
}));

type ApiFetchResponse = {
  cursor?: string;
  messages?: Message[];
};
