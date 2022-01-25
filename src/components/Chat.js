import { useEffect, useState } from 'react';
import '../css/Chat.css';
import Message from './Message';
import Send from './send.svg';

export default function Chat({ data, logOutAction }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setInterval(async () => {
            await fetch('https://serverless-chat.vercel.app/api/messages')
                .then((x) => x.json())
                .then((x) => setMessages(x));
        }, 1000);
    }, []);

    async function sendMessage() {
        if (message.trim() === '') {
            alert('El mensaje no puede estar vacio');
        } else {
            await fetch('https://serverless-chat.vercel.app/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: data.userName,
                    userId: data._id,
                    messageText: message,
                    fecha: new Date(),
                }),
            });
        }
    }

    return (
        <div className='App'>
            <header>
                <h1>Chat MongoDB - React</h1>
                <div>
                    <button className='buttonLogOut' onClick={logOutAction}>
                        Cerrar Sesion
                    </button>
                </div>
            </header>
            <main>
                <div className='chatBox'>{Message(messages, data)}</div>
                <div className='textBoxArea'>
                    <textarea
                        className='textBox'
                        onChange={(e) => setMessage(e.target.value)}
                        defaultValue={message}
                    />
                    <button onClick={sendMessage}>
                        <img src={Send} alt='button svg' />
                    </button>
                </div>
            </main>
        </div>
    );
}
