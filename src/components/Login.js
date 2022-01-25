import { useState } from 'react';
import '../css/Login.css';

export default function Login({ action }) {
    window.addEventListener('offline', () =>
        alert('falla en la conexion a internet')
    );

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    async function Login() {
        let user = await fetch(
            `https://serverless-chat.vercel.app/api/users/${userEmail}/${userName}`
        ).then((x) => x.json());

        if (user.length > 0) {
            localStorage.setItem('userData', JSON.stringify(user[0]));
            action(user[0]);
        } else {
            user = await fetch('https://serverless-chat.vercel.app/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: userName,
                    email: userEmail,
                }),
            }).then((x) => x.json());

            console.log(user);
            localStorage.setItem('userData', JSON.stringify(user));
            action(user);
        }
    }

    return (
        <div className='log'>
            <header>
                <h1>Log in Account</h1>
            </header>
            <main>
                <div>
                    <label>Nombre de usuario:</label>
                    <input
                        type='text'
                        placeholder='pedrito99'
                        onChange={(e) => setUserName(e.target.value)}
                        defaultValue={userName}
                    />
                    <label>Email:</label>
                    <input
                        type='email'
                        placeholder='emilio@chance.com'
                        onChange={(e) => setUserEmail(e.target.value)}
                        defaultValue={userEmail}
                    />
                    <button onClick={Login}>Ingresar</button>
                </div>
            </main>
        </div>
    );
}
