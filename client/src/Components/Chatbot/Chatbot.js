import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import sendBtn from './sendBtn.png';
import './Chatbot.css';
import MessageDiv from './Message.jsx';

const Chatbot = () => {
  const [chatHistoryUser, setChatHistoryUser] = useState([]);
  const [chatHistoryBot, setChatHistoryBot] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messaagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messaagesEndRef.current?.scrollIntoView({ behaviour: "smooth" })
}

  const sendMessage = async () => {
    if (input === '') return;

    // Add the user's message to the chat history
    setChatHistoryUser([...chatHistoryUser, { text: input, sender: 'user' }]);

    // Clear the input field and set the isTyping state to true
    setInput('');
    setIsTyping(true);

    // Send the user's message to the OpenAI API
    const response = await axios.post('http://localhost:3000/chat', {
      message: input,
    })

    // Add the chatbot's response to the chat history
    setChatHistoryBot([...chatHistoryBot, { text: response.data, sender: 'bot' }]);
    setIsTyping(false);

    // Scroll to the bottom of the chat window
    scrollToBottom()

  };

    useEffect(() => {
        scrollToBottom()
        console.log("User:", chatHistoryUser, "Bot:", chatHistoryBot)
    }, [chatHistoryUser, chatHistoryBot])

  return (
    <div>
      <div id='chat'>
            <div id='messages'>
            <MessageDiv chatHistoryUser={chatHistoryUser} chatHistoryBot={chatHistoryBot} />

        {isTyping && <p>Chatbot is typing...</p>}
            </div>
            <div className='input'>
                <input
                    type="text"
                    id="message"
                    name="message"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    placeholder="Enter message...."
                />
                <button onClick={sendMessage}>
                    <img src={sendBtn} alt="Send" />
                </button>
            </div>
            <div ref={messaagesEndRef} />
        </div>

        
      {/* <div>
        {chatHistory.map((chat, index) => (
          <p key={index} className={chat.sender}>
            {chat.text}
          </p>
        ))}
        {isTyping && <p className="bot">Chatbot is typing...</p>}
      </div>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div> */}
    </div>
  );
};

export default Chatbot;