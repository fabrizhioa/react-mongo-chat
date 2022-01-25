//importacion de paquetes
import { useEffect, useState } from 'react';

//importacion de assets
import '../css/Chat.css';
import Send from './send.svg';

//importacion de vista de mensajes

import Message from './Message';

export default function Chat({ data, logOutAction }) {
    //Estados generales del chat
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //Recarga del chat
    useEffect(() => {
        //intervalo de recarga de mensajes
        setInterval(async () => {
            await fetch('https://serverless-chat.vercel.app/api/messages')
                .then((x) => x.json())
                .then((x) => setMessages(x));
        }, 1000);
    }, []);

    //funcion asincrona de envio de nuevos mensajes
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
        setMessage('');
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
                        value={message}
                    />
                    <button onClick={sendMessage}>
                        <img src={Send} alt='button svg' />
                    </button>
                </div>
            </main>
        </div>
    );
}
