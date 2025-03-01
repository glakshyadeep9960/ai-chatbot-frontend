import React, { useEffect, useRef, useState } from "react";
import {
  FaBarsStaggered,
  FaPaperclip,
  FaPencil,
  FaPlus,
  FaTelegram,
  FaTrash,
  FaX,
} from "react-icons/fa6";
import axios from "axios";
import { baseUrl } from "../utils/apiSettings";
import { showErrorMessage, showSuccessMessage } from "../utils/toast";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [isMessagesFetched, setIsMessagesFetched] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const chatIdParams = urlParams.get("chat");
  useEffect(() => {
    if (chatIdParams) {
      handleFetchMessages(chatIdParams);
    }
  }, [window.location.search]);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleQueryValue = (e) => {
    setQuery(e.target.value);
  };
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleCreateNewChat = async () => {
    navigate("/user");
    setMessages([]);
    await axios({
      method: "POST",
      url: `${baseUrl}/api/v1/ai/create-chat`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        navigate(`/user/ai-chatbot/?chat=${res?.data?.chatId}`);
        setIsMessagesFetched(true);
        handleFetchChats();
      })
      .catch((err) => {
        console.log(err);
        showErrorMessage(err?.response?.data?.message);
      });
  };

  const handleFetchChats = async () => {
    await axios({
      method: "GET",
      url: `${baseUrl}/api/v1/ai/get-chats`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setChats(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetchChats();
  }, []);

  const handleFetchMessages = async (chatId) => {
    setIsMessagesFetched(false);
    navigate(`/user/ai-chatbot/?chat=${chatId}`);
    await axios({
      method: "POST",
      url: `${baseUrl}/api/v1/ai/get-messages`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        chatId: chatId,
      },
    })
      .then((res) => {
        console.log(res?.data?.data, "messages fetched");
        setIsMessagesFetched(true);
        setMessages(res?.data?.data?.messages);
      })
      .catch((err) => {
        console.log(err);
        setIsMessagesFetched(false);
        showErrorMessage(err?.response?.data?.message);
      });
  };
  const htmlParser = (response) => {
    if (!response) return null;

    const elements = [];
    const lines = response.split("\n");

    let inCodeBlock = false;
    let codeContent = [];

    lines.forEach((line, index) => {
      // Improved image handling with regular expression
      const imageMatch = line.match(
        /(https?:\/\/\S+\.(png|jpg|jpeg|gif)|[\w\d]+\.(png|jpg|jpeg|gif))/i
      ); // Matches URLs or filenames

      if (imageMatch) {
        let imgSrc = imageMatch[0];
        //If it's not a full URL, prepend the base URL
        if (!imgSrc.startsWith("http")) {
          imgSrc = `${baseUrl}/${imgSrc}`; // baseUrl is needed here
        }
        elements.push(
          <img
            key={index}
            src={imgSrc}
            alt={`Image ${index + 1}`} // Better alt text
            className="max-w-full h-auto"
          />
        );
      } else if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={index}
              className="bg-black p-3 rounded text-gray-300 font-mono overflow-x-auto"
            >
              {codeContent.join("\n")}
            </pre>
          );
          codeContent = [];
        }
        inCodeBlock = !inCodeBlock;
      } else if (inCodeBlock) {
        codeContent.push(line);
      } else if (/^#{1,6}\s/.test(line)) {
        const headingLevel = line.match(/^#{1,6}/)[0].length;
        elements.push(
          React.createElement(
            `h${headingLevel}`,
            {
              key: index,
              className: `text-white font-semibold mb-2 text-${
                headingLevel === 1 ? "2xl" : "xl"
              }`,
            },
            line.replace(/^#{1,6}\s/, "")
          )
        );
      } else if (/^\*\*(.*?)\*\*/.test(line)) {
        elements.push(
          <p
            key={index}
            className="text-gray-300 mb-1"
            dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          ></p>
        );
      } else if (/^\*(.*?)\*/.test(line)) {
        elements.push(
          <p
            key={index}
            className="text-gray-300 mb-1"
            dangerouslySetInnerHTML={{
              __html: line.replace(/\*(.*?)\*/g, "<em>$1</em>"),
            }}
          ></p>
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={index} className="ml-5 list-decimal text-gray-400 mb-1">
            {line}
          </li>
        );
      } else if (/^-\s/.test(line)) {
        elements.push(
          <li key={index} className="ml-5 list-disc text-gray-400 mb-1">
            {line.replace(/^-\s/, "")}
          </li>
        );
      } else {
        elements.push(
          <p key={index} className="text-gray-300 mb-2">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  const handleSendQuery = async () => {
    if (query.trim() && query !== "" && query) {
      // Save the query value before clearing it
      const userQuery = query;
      const newMessage = { role: "user", text: userQuery };
      setMessages((prev) => [...prev, newMessage]);
      setQuery("");

      try {
        const res = await axios({
          method: "POST",
          url: `${baseUrl}/api/v1/ai/generate-text`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            chatId: chatIdParams,
            question: userQuery,
          },
        });

        // Try to retrieve chat id from header; fallback to chatIdParams if header is missing.
        const newChatId = res.headers["x-chat-id"] || chatIdParams;
        if (newChatId) {
          navigate(`/user/ai-chatbot/?chat=${newChatId}`);
        }
        setMessages((prev) => [...prev, { role: "model", text: res.data }]);
        handleFetchChats();
        console.log(res);
      } catch (err) {
        console.error("Error sending query:", err);
        setMessages((prev) => [
          ...prev,
          { role: "error", text: "An error occurred." },
        ]);
      }
    }
  };

  const [isMouseOver, setIsMouseOver] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [chatNames, setChatNames] = useState({});

  useEffect(() => {
    const initialChatNames = {};
    chats?.forEach((chat) => {
      initialChatNames[chat._id] = chat.chatName;
    });
    setChatNames(initialChatNames);
  }, [chats]);

  const handleEdit = (chatId) => {
    setEditingChatId(chatId);
  };
  const handleSave = async (chatId, newChatName) => {
    await axios({
      method: "PUT",
      url: `${baseUrl}/api/v1/ai/rename-chat`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        chatId: chatId,
        chatName: newChatName,
      },
    })
      .then((res) => {
        showSuccessMessage(res?.data?.message);
        setChatNames({ ...chatNames, [chatId]: newChatName });
        setEditingChatId(null);
        handleFetchChats();
      })
      .catch((err) => {
        showErrorMessage(err?.response?.data?.message);
      });
  };

  const handleCancel = () => {
    setEditingChatId(null);
  };

  const handleDeleteChat = async (chatId) => {
    await axios({
      method: "DELETE",
      url: `${baseUrl}/api/v1/ai/delete-chat/${chatId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        showSuccessMessage(res?.data?.message);
        setChats((prev) => prev.filter((item) => item._id !== chatId));
        setIsMessagesFetched(false);
        setMessages([]);
        navigate("/user/ai-chatbot");
      })
      .catch((err) => {
        showErrorMessage(err?.response?.data?.message);
      });
  };

  const [openSidebar, setOpenSidebar] = useState(false);
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const [imgQuery, setImgQuery] = useState(null);

  const formData = new FormData();

  const handleImageQuery = async (e) => {
    const file = e.target.files[0];
    const newMessage = { role: "user", text: URL.createObjectURL(file) };
    setMessages((prev) => [...prev, newMessage]);
    setImgQuery("");
    formData.append("file", file);
    formData.append("chatId", chatIdParams);
    setImgQuery({
      file: file,
      url: URL.createObjectURL(file),
    });
    await axios({
      method: "POST",
      url: `${baseUrl}/api/v1/ai/generate-text-from-image`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    })
      .then((res) => {
        console.log(res.data.data);
        setMessages((prev) => [
          ...prev,
          { role: "model", text: res?.data?.data },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const messagesContainerRef = useRef(null); // Ref for the message container

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="w-full  h-screen overflow-y-hidden bg-[#212121] flex items-stretch">
      <div
        className={`xl:w-[16%] xl:relative text-[14px] text-white bg-[#171717] h-full p-[15px] flex flex-col  items-start gap-[12px] w-[70%] sm:w-[40%] fixed left-0 top-0 z-[99] ${
          openSidebar === true
            ? "translate-x-0 transition-all"
            : openSidebar === false
            ? "translate-x-[-100vw] transition-all"
            : "translate-x-0"
        } xl:translate-x-0 `}
      >
        <div className="w-full flex items-center justify-between xl:justify-end">
          <FaX
            onClick={handleOpenSidebar}
            className="xl:hidden cursor-pointer"
          />
          <div className="w-[30px] h-[30px]  text-[16px] flex justify-center items-center border cursor-pointer border-white rounded-[100px] self-end">
            <FaPlus
              onClick={() => {
                handleCreateNewChat();
              }}
              className=" z-[5]  "
            />
          </div>
        </div>
        <h3 className="font-semibold">Recent Chats</h3>
        <div className="w-full h-[620px] flex flex-col hide-scrollbar  items-start gap-[12px] overflow-y-scroll">
          {chats?.map((item) => {
            let text;
            text = item?.chatName
              ? item.chatName.split(" ").length <= 5
                ? item.chatName
                : item.chatName.split(" ").slice(0, 5).join(" ") + ".."
              : "No Chat Name";
            return (
              <div
                key={item._id}
                className="w-full text-[14px] flex text-white items-center gap-[7px]"
              >
                {editingChatId === item._id ? (
                  <div className="w-full flex flex-col gap-[7px]">
                    <input
                      type="text"
                      className="text-left bg-transparent outline-none"
                      value={chatNames[item._id]}
                      onChange={(e) => {
                        setChatNames({
                          ...chatNames,
                          [item._id]: e.target.value,
                        });
                      }}
                    />
                    <div className="flex justify-center items-center gap-[7px]">
                      <button
                        className="p-[7px] text-[14px] bg-green-500 text-white rounded-[7px]"
                        onClick={() =>
                          handleSave(item._id, chatNames[item._id])
                        }
                      >
                        Save
                      </button>
                      <button
                        className="p-[7px] text-[14px] bg-red-500 text-white rounded-[7px]"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p
                    onMouseOver={() => {
                      setIsMouseOver(item?._id);
                    }}
                    onMouseLeave={() => {
                      setIsMouseOver(null);
                    }}
                    className="w-full flex items-center gap-[7px] text-left cursor-pointer"
                  >
                    <span
                      onClick={() => {
                        handleFetchMessages(item?._id);
                      }}
                      className="w-[90%]"
                    >
                      {text}
                    </span>
                    {isMouseOver === item?._id ? (
                      <div className="flex items-center gap-[7px]">
                        <FaPencil onClick={() => handleEdit(item._id)} />
                        <FaTrash onClick={() => handleDeleteChat(item?._id)} />
                      </div>
                    ) : null}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full xl:w-[82%] relative overflow-y-scroll hide-scrollbar  h-full p-[15px] flex flex-col items-center gap-[30px] justify-center ">
        <div className="w-full text-white gap-[12px] fixed top-[20px] right-[20px] left-0 px-[20px]  flex justify-between xl:justify-end items-center">
          <FaBarsStaggered
            onClick={handleOpenSidebar}
            className="text-[20px] cursor-pointer xl:hidden"
          />
          <div className="flex items-center gap-[12px]">
            <button
              onClick={() => {
                navigate("/user/");
              }}
              className="px-[20px] py-[7px] text-white rounded-[7px] bg-black"
            >
              Back
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("userToken");
                navigate("/auth/user/login");
              }}
              className="px-[20px] py-[7px] text-white rounded-[7px] bg-black"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="w-full xl:w-[85%]  flex flex-col items-center gap-[20px]">
          {messages?.length !== 0 ? (
            <div
              ref={messagesContainerRef}
              className="w-full h-[550px] hide-scrollbar overflow-y-scroll font-normal flex flex-col gap-[12px] text-white p-4"
            >
              {" "}
              {messages?.map((item, index) => (
                <div key={index} className="w-full flex flex-col gap-[10px]">
                  {item?.role === "user" ? (
                    <div className="flex self-end w-[90%] xl:w-[70%] p-[20px] bg-black rounded-[7px]">
                      {" "}
                      <p className="text-left">
                        <strong>{htmlParser(item?.text)}</strong>
                      </p>
                    </div>
                  ) : item?.role === "model" ? (
                    <div
                      className={`${
                        isMessagesFetched === false ? "animate-pulse" : null
                      } w-[90%] flex self-start bg-[#171717] p-[20px] overflow-scroll hide-scrollbar xl:min-w-[70%] xl:max-w-[85%] rounded-[7px]`}
                    >
                      {" "}
                      <span className="text-left">
                        {htmlParser(item?.text)}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-white text-[26px] text-center font-semibold">
              What Can I help with?
            </h1>
          )}
          {isMessagesFetched === true ? (
            <div className="w-full xl:w-[70%] p-[15px] bg-[#2f2f2f] text-white font-normal rounded-[12px] text-[16px] flex flex-col gap-[12px]">
              <div className="flex items-center gap-[12px]">
                <div className="flex  gap-[7px] justify-center items-center relative">
                  <input
                    type="file"
                    name="imgQuery"
                    id="imgQuery"
                    onChange={handleImageQuery}
                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                  />
                  <FaPaperclip />
                </div>
                <textarea
                  type="text"
                  name="query"
                  id="query"
                  onChange={handleQueryValue}
                  value={query}
                  className="w-full h-[70px] bg-transparent outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && query.trim()) {
                      handleSendQuery();
                    }
                  }}
                  placeholder="Enter Your Query here"
                />
                <FaTelegram
                  onClick={handleSendQuery}
                  className="text-[28px] cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center gap-[20px] text-center text-white">
              <p>Please Create a Chat First! </p>
              <button
                onClick={handleCreateNewChat}
                className="px-[20px] py-[10px] rounded-[7px] bg-black text-white"
              >
                Create Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
