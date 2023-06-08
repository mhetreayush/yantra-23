import { useRef, useState } from "react";
import { BsChat, BsSend } from "react-icons/bs";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [prevMessages, setPrevMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  let chatBoxRef = useRef(null);
  const communicate = () => {
    prevMessages.push({ from: "User", message: newMessage });
    const user = JSON.parse(localStorage.getItem("user"));
    setNewMessage("");
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight + 100;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(process.env.NEXT_PUBLIC_OPENAI_KEY),
      },
      body: JSON.stringify({
        prompt: `You are an AI assistant and you need to respond to the messages the users type. 
        Consider following points:
        1. If the user types anything related to "Hello", you should reply with "Hi ${
          user && user.displayName
        }, how can I help you?"
        2. If the user types anything related to "I want to buy byproducts", you should reply with "Sure, you can click on the 'Waste'" button
        3. If the user types anything related to "I want to sell byproducts", you should reply with "Sure, you can click on the 'Sell'" button
        4. If the user types anything related to "Contact", you should reply with "Sure, you can email us at 'contact@poggers.mail.com'"
        5. If the user types anything related to "Bye", you should reply with "Bye, have a nice day!"
        6. If the user types anything related to "How can this product help me?", you should reply with message that will let the user know that this product is kind of a marketplace where you buy and/or sell byproducts of waste, ensuring that the byproducts are recycled and reused and also at the same time, you are helping the environment and you can get the byproducts at a cheaper rate.
        now reply to the following message: "${newMessage}"`,
        temperature: 0.1,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.5,
        stop: ['"""'],
      }),
    };

    fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        // # Do something with data
        console.log(data);
        console.log(data.choices[0].text);

        setPrevMessages([
          ...prevMessages,
          {
            from: "AI",
            message: data.choices[0].text,
          },
        ]);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;

        // setData(data.choices[0].text);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="absolute bottom-28 z-[100] right-2">
      <button
        onClick={() => setOpen(!open)}
        className="bg-black/50 p-2 rounded-full"
      >
        <BsChat
          size={24}
          className="text-white flex items-center justify-center"
        />
      </button>
      {open && (
        <div className="absolute bottom-0 right-14 rounded-md">
          <div
            ref={chatBoxRef}
            className="bg-white p-4 drop-shadow-lg border-2 border-black rounded-md shadow-md h-96 overflow-y-auto max-h-96 w-80 relative"
          >
            <div className="flex w-full items-end  h-full relative">
              <div className="pt-10">
                {prevMessages.map((message, idx) => {
                  return (
                    <h1
                      key={idx}
                      className={`${
                        message.from == "AI" && "border-black border-b-2  mb-4"
                      }`}
                    >
                      {message.from}: {message.message}
                    </h1>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-x-2 w-full sticky bottom-0 z-50 py-4 bg-white">
              <input
                type="text"
                className="w-full border-2 border-black rounded-md p-2 "
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={communicate}
                className="bg-black/50 p-2 h-10 w-10 flex items-center justify-center rounded-full"
              >
                <BsSend className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
