/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
// import agentPic from "/icons/profile.png";
import { LuPhone } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { MdSend } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import back from "/icons/back.svg";
import verifiedId from "/icons/id-verified.svg";
import { fetchMessages } from "../lib/fetchMessages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { messaging } from "../utils/messageRequest";
import { convertToNormalTime } from "../utils/ConvertToNormalTime";
import { useUserStore } from "../store/UseUserStore";
import { fetchUserById } from "../lib/fetchUser";

const Chat = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [otherUser, setOtherUser] = useState<any | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const { user } = useUserStore();

  const [messagesList, setMessagesList] = useState<any | null>(null);

  const { data: recipientDetails } = useQuery({
    queryKey: ["recipientDetails", `recipient ${userId}`],
    queryFn: () => fetchUserById(userId),
  });

  useEffect(() => {
    // const firstOtherUser = recipientDetails?.hostels?.user;
    console.log("recipient details", recipientDetails?.user);
    setOtherUser(recipientDetails?.user);
  }, [recipientDetails]);

  // const [localMessages, setLocalMessages] = useState([]);
  // const {socket, isConnected} = useSocket()
  // console.log(userId);

  const [content, setContent] = useState("");
  const [isTexted, setIsTexted] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // Fetch messages
  const {
    data: fetchedMessages = [],
    isError,
    isLoading,
    isFetchedAfterMount,
  } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => fetchMessages(userId as string),
    enabled: !!userId,
    refetchInterval: 5000, // Poll for new messages every 5 seconds
  });

  // Set isTexted to true if we have messages
  useEffect(() => {
    // const lastMessage = fetchedMessages?.messages[fetchedMessages?.messages.length - 1];
    // console.log("last message", lastMessage);

    console.log(fetchedMessages);

    if (Array.isArray(fetchedMessages) && fetchedMessages.length > 0) {
      setIsTexted(true);
      console.log(fetchedMessages);
    }

    console.log(isTexted);

    if (isFetchedAfterMount) {
      const messages = fetchedMessages.messages;
      console.log("all messages", messages);
      console.log("first other user", messages[messages?.length - 1]);
      if (fetchedMessages?.otherUser) setOtherUser(fetchedMessages.otherUser);
    }

    setMessagesList(fetchedMessages?.messages);

    // Scroll to the last message
    // setTimeout(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
    // }, 100); // slight delay to allow render
  }, [fetchedMessages, isLoading, isFetchedAfterMount]);

  // Setup mutation for sending messages
  const mutation = useMutation({
    mutationFn: (messageData: { recipient: string; message: string }) =>
      messaging(messageData),
    onSuccess: () => {
      // Invalidate and refetch messages after sending
      queryClient.invalidateQueries({ queryKey: ["messages", userId] });
    },
  });

  // Handle sending a message
  const sendMessage = () => {
    if (content.trim() === "") {
      return;
    }

    const newMessage = {
      _id: Date.now().toString(), // temporary unique ID
      sender: user?._id,
      recipient: otherUser?._id || userId,
      message: `${content}`,
      conversationId: userId,
      timestamp: new Date().toISOString(),
      __v: 0,
    };

    setMessagesList((prev: any) => [...prev, newMessage]);

    const messageData = {
      recipient: otherUser?._id || userId,
      message: content,
    };

    // Send the message
    mutation.mutate(messageData);

    // Clear the input field
    setContent("");

    // Ensure the chat header shows
    setIsTexted(true);
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    console.log("Other user data", otherUser);
  }, [otherUser]);

  return (
    <main className="h-screen flex flex-col">
      <div className="flex items-center gap-2 px-5 py-2.5 top-0 fixed w-full bg-white z-10 border-b">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-primary size-7 flex items-center justify-center"
        >
          <img src={back} alt="back" className="size-4" />
        </button>
        <div className="flex justify-between grow">
          <div className="flex gap-3 items-center">
            <img
              src={
                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              className="size-11 rounded-full"
              alt="Agent profile"
            />
            <div>
              <h2 className="text-dark font-semibold capitalize">
                {otherUser?.firstName}
              </h2>
            </div>
          </div>

          <button className="border border-primary rounded-xl p-2">
            <LuPhone className="size-5 text-primary" />
          </button>
        </div>
      </div>

      {/* Messages Section */}
      <section className="p-5 bg-[#f7f7f7] flex-1 overflow-y-auto mt-16 mb-16">
        {isError && (
          <div className="p-5 text-center text-red-500">
            Error fetching messages
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : messagesList?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {messagesList?.map((message: any, i: number) => {
              return (
                <div
                  key={i}
                  className={`flex ${
                    message?.sender != otherUser?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  ref={
                    i === fetchedMessages?.messages.length - 1
                      ? lastMessageRef
                      : null
                  }
                >
                  <div
                    className={`max-w-[76%] w-fit p-3 rounded-xl ${
                      message?.sender != otherUser?._id
                        ? "bg-primary text-white"
                        : "bg-white text-dark"
                    }`}
                  >
                    {message?.message}
                    <p className="!text-[10px] text-right mt-1">
                      {convertToNormalTime(message.timestamp)}{" "}
                      {message?.user != userId && "read"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid place-items-center">
            <img
              src="https://placehold.co/400"
              alt="back"
              className="size-36  rounded-xl object-cover"
            />
            <h2 className="text-dark font-semibold text-xl">
              {otherUser?.firstName} {otherUser?.lastName}
            </h2>
            <div className="text-variant-500 flex gap-2 items-center">
              <img src={verifiedId} className="size-5" />
            </div>
          </div>
        )}
      </section>

      <div className="w-full py-2.5 px-5 flex rounded-t-xl bg-white items-center justify-between bottom-0 fixed border-t">
        <button className="p-2">
          <HiPlus className="text-variant-400 size-6" />
        </button>
        <div className="grow px-2">
          <input
            type="text"
            className="w-full bg-[#E5E5E54D] p-2 outline-none rounded-lg"
            placeholder="Type something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={sendMessage}
          disabled={!content.trim()}
          className={`p-2 ${!content.trim() ? "opacity-50" : ""}`}
        >
          <MdSend className="text-primary size-6" />
        </button>
      </div>
    </main>
  );
};

export default Chat;
