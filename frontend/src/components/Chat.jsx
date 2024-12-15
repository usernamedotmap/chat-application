import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeletal from "./MessageSkeletal";
import { useAuthStore } from "../store/useAuthStore";
import { fixingDateAndTime } from "../lib/date";

const Chat = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    listenToMessages,
    notListenToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const endMessage = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    listenToMessages();
    return () => notListenToMessages();
  }, [selectedUser._id, getMessages, listenToMessages, notListenToMessages]);

  useEffect(() => {
    if (endMessage.current && messages) {
      endMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeletal />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`} 
            ref={endMessage}
          >
            <div className={`chat-image avatar `}>
              <div className={`size-10 rounded-full border  `}>
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic ||
                        "profile.png"
                      : selectedUser.profilePic ||
                        "profile.png"
                  }
                  alt="pfp"
                 
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {fixingDateAndTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Pecture"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default Chat;
