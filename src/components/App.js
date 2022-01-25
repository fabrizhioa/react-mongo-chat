import { useEffect, useState } from 'react/cjs/react.development';
import '../css/Chat.css';
import Message from './Message';
import Send from './send.svg';
function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({});
    const handleClick = () => {
        fetch('https://');
    };

    useEffect(() => {
        setInterval(async () => {}, 7000);
    }, []);

    return (
        <div className='App'>
            <header>
                <h1>Chat MongoDB - React</h1>
            </header>
            <main>
                <div className='chatBox'>
                    <Message
                        userMessage='Este es un mensaje de prueba'
                        type={0}
                    />
                    <Message
                        userMessage='Este es un mensaje de prueba'
                        type={1}
                    />
                </div>
                <div className='textBoxArea'>
                    <textarea
                        className='textBox'
                        onKeyDown={(e) => setMessage(e.target.value)}
                        defaultValue={message}
                    />
                    <button onClick={handleClick}>
                        <img src={Send} alt='button svg' />
                    </button>
                </div>
            </main>
        </div>
    );
}

export default App;
