import { React, useState, useEffect, useRef } from 'react'
import "./Chatbot.css"
import sendBtn from "./sendBtn.png"

export default function Chatbot() {

    const [message, setMessage] = useState('');

    const [inputList, setInputList] = useState([]);

    const messaagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messaagesEndRef.current?.scrollIntoView({ behaviour: "smooth" })
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleClick = () => {
        if (message) {
            setInputList(inputList.concat(<Input key={inputList.length + 1} />));
            setMessage('')
        }
    };

    const Input = () => {
        useEffect(() => {
            scrollToBottom()
        }, [])
        // const responseTxt = "";
        // useEffect(() => {
        //     const timer = setTimeout(() => {
        //         setIsResonding(true);
        //         console.log('This will run after 1 second!')
        //     }, 2000);
        //     return () => clearTimeout(timer);
        // }, [])

        // if (isResponding)
        //     responseTxt = Response(message);

        return (
            <div>
                <p className='query text'>{message}</p>
                <p className='res text'>{Response(message)}</p>
            </div>
        );
    };

    const Response = (msg) => {
        switch (msg) {
            case "hello": return "heyy!"
            case "how are you?": return "I am good! How are you?"
            case "who are you?": return "I am bot developed by Dr. Prithviraj"
            default: return "I don't Understand you!"
        }
    };

    return (
        <div id='chat'>
            <div id='messages'>
                {inputList}
            </div>
            <div className='input'>
                <input
                    type="text"
                    id="message"
                    name="message"
                    onChange={handleChange}
                    value={message}
                    placeholder="Enter message...."
                />
                <button onClick={handleClick}>
                    <img src={sendBtn} alt="Send" />
                </button>
            </div>
            <div ref={messaagesEndRef} />
        </div>
    );
}
