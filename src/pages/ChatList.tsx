/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import search from "/icons/search-01.svg";
import ChatComponent from "../components/Ui/ChatComponent";
import { fetchConversations } from "../lib/fetchConversations";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchUser } from "../lib/fetchUser";
import { VscChevronLeft } from "react-icons/vsc";
import {
  useConversationStore,
  ConversationType,
} from "../store/useConversationStore";

const ChatList = () => {
  const { storedConversations, setStoredConversations } =
    useConversationStore();

  // store conversation l;ist from zustand
  const [conversationList, setConversationList] = useState<
    ConversationType[] | null
  >(null);

  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const { data: fetchedConversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  useEffect(() => {
    if (
      fetchedConversations &&
      JSON.stringify(fetchedConversations) !==
        JSON.stringify(storedConversations)
    ) {
      setStoredConversations(fetchedConversations);
    }

    console.log("savedconvo", storedConversations);

    console.log("fetch", fetchedConversations);
    const convoData = fetchedConversations || storedConversations;

    setConversationList(convoData);
  }, [fetchedConversations, storedConversations, setStoredConversations]);

  return (
    <main>
      <div className="flex items-center justify-between gap-2 px-5 py-5 top-0 fixed w-full bg-white">
        <div className="flex items-center justify-between w-full gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-primary border border-primary p-1 rounded-lg cursor-pointer"
          >
            <VscChevronLeft size={25} />
          </button>
          <h2 className="text-dark font-bold leading-6 flex-1">Messages</h2>
        </div>

        <img src={search} alt="search" className="size-6" />
      </div>

      <section className="p-5 py-16 bg-white">
        <div>
          {conversationList?.length === 0 ? (
            <div className="text-center text-gray-500 my-10">
              <p>You don't have any conversations yet.</p>
            </div>
          ) : (
            conversationList?.map((item: any, i: number) => (
              <Link key={i} to={`/chat/${user?._id}`}>
                <ChatComponent item={item} />
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default ChatList;
