/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import agentPic from "/icons/profile.png";
import { LuPhone } from "react-icons/lu";
import { Link, useParams } from "react-router";

import { MdSend } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import back from "/icons/back.svg";
import verifiedId from "/icons/id-verified.svg";
// import { useSocket } from "../hooks/useSocket";
import { fetchMessages } from "../lib/fetchMessages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { messaging } from "../utils/messageRequest";
import Loader from "../components/Reuseables/Loader";



const Chat = () => {
  // allmessages();
  const { userId } = useParams();
  const [otherUser, setOtherUser] = useState<any | null>(null);
  // const [localMessages, setLocalMessages] = useState([]);
  // const {socket, isConnected} = useSocket()
  // console.log(userId);

  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const {
    data: messages,
    isError,
    isFetching,
    isLoading,
    isFetchedAfterMount
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages(userId as string),
  });


  useEffect( () => {

    if (isFetchedAfterMount) {
      console.log("first other user", messages)
      setOtherUser(messages[0]?.otherUser); // Save the first fetch result
    }

  },[isFetchedAfterMount, messages, otherUser]);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  // setOtherUser(messages[0].otherUser);

  queryClient.invalidateQueries({ queryKey: ["messages"] });

  const mutation = useMutation({
    mutationKey: ["messages"],
    mutationFn: () => messaging(messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const messageData = {
    recipient: userId,
    message: content,
  };

  const sendMessage = async () => {
    // console.log("content", content);
    if (content.trim() === "") {
      return;
    }
    console.log("my content", content);
    // console.log(setIsTexted(true))
    setIsTexted(true);

    await mutation.mutate();
    setContent("");
  };

  // const sendMessage = () => {
  //   if (socket && content.trim() !== "") {

  //     socket.emit("sendMessage", messageData);

  //     setContent("");
  //   }
  // };

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('receiveMessage', (messageData) => {
  //       console.log('New message received:', messageData);
  //       // toast({
  //       //   title: 'New message',
  //       //   description: messageData.message,
  //       //   status: 'info',
  //       //   duration: 5000,
  //       //   isClosable: true,
  //       // });
  //     });
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.off('receiveMessage');
  //     }
  //   };
  // }, [socket]);

  const [isTexted, setIsTexted] = useState<boolean>(true);

  const convertToNormalTime = (timestamp: any) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isError) {
    return <div>Error fetching messages</div>;
  }
  return (
    <main className="">
      <div className="flex items-center gap-2 px-5 py-2.5 top-0 fixed w-full bg-white">
        <Link
          to={"/chat"}
          className="rounded-full bg-primary size-7 flex items-center justify-center"
        >
          <img src={back} alt="back" className="size-3.5" />
        </Link>

        
        {isTexted && (
          <div className="flex justify-between grow">
            <div className="flex gap-2 items-center">
              <img src={agentPic} className="size-11 rounded-xl" />
              <div>
                <h2 className="text-dark font-semibold">
                  {otherUser?.firstName}
                </h2>
              </div>
            </div>

            <button className="border border-primary rounded-xl  p-2">
              <LuPhone className="size-5 text-primary" />
            </button>
          </div>
        )}
      </div>

      <section className="p-5 py-16 bg-[#f7f7f7]">
        {/* <p>golke</p> */}
        {isFetching && <Loader />}
        {isLoading ? (
          <Loader />
        ) : messages[0].length > 0 ? (
          <div>
            {messages[0].map((message: any, i: number) => (
              <div
                key={i}
                className={`flex my-3 ${
                  message?.sender == userId && "justify-end"
                }`}
              >
                <div
                  className={` max-w-[76%] w-fit p-3 rounded-xl ${
                    message?.sender == userId
                      ? "bg-primary text-white"
                      : "bg-white text-dark"
                  }`}
                >
                  {message?.message}
                  <p className="!text-[10px] text-right mt-1">
                    {convertToNormalTime(message.timestamp)}{" "}
                    {message?.senderId == userId && "read"}
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl max-w-[90%] p-2">
              <img
                src="https://placehold.co/600x400/png"
                className="rounded-xl"
              />
              <p className="text-dark text-lg font-semibold mb-1">
                Campus Haven Lodge
              </p>
              <p className="">
                Campus Haven Hostel is a serene and well-equipped living space
                design...
              </p>
              <Link to={"/checkout"} className="w-full">
                <button className="bg-primary p-3 mt-1.5 w-full rounded-xl text-white">
                  Pay now
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid place-items-center">
            <img
              src="https://placehold.co/400"
              alt="back"
              className="size-36  rounded-xl object-cover"
            />
            <h2 className="text-dark font-semibold text-xl">
            {messages[0]?.otherUser?.firstName} {" "}
            {messages[0]?.otherUser?.lastName}
            </h2>
            <div className="text-variant-500 flex gap-2 items-center">
              <span>Verified Agent</span>{" "}
              <img src={verifiedId} className="size-5" />
            </div>
          </div>
        )}
      </section>

      {/* Send Message input function */}
      <div className="w-full py-2.5 px-5 flex rounded-t-xl bg-white items-center justify-between bottom-0 fixed">
        {/* <div> */}
        <HiPlus className="text-variant-400 size-6" />
        {/* </div> */}
        <div className="grow px-2">
          <input
            type="text"
            className="w-full bg-[#E5E5E54D] p-2 outline-none rounded-lg"
            placeholder="Type something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {/* <div> */}
        <button onClick={() => sendMessage()}>
          <MdSend className="text-primary size-6" />
        </button>
        {/* </div> */}
      </div>
    </main>
  );
};

export default Chat;
