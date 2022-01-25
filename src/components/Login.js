//importacion de paquetes
import { useState } from 'react';

//importacion de assets
import '../css/Login.css';

export default function Login({ action }) {
    //verificación de conexion a internet
    window.addEventListener('offline', () =>
        alert('falla en la conexion a internet')
    );
    //estados de inputs de usuario
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    //funcion de registro y login conjugada
    async function Login() {
        //verificacion de usuario y correo
        let user = await fetch(
            `https://serverless-chat.vercel.app/api/users/${userEmail}/${userName}`
        ).then((x) => x.json());
        //certifiacion de existencia de usuario
        if (user.length > 0) {
            localStorage.setItem('userData', JSON.stringify(user[0]));
            action(user[0]);
        } else {
            //creacion de nuevo usuario
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

            //integracion a los estados y sesion del chat
            localStorage.setItem('userData', JSON.stringify(user));
            action(user);
        }
    }

    return (
        <div className='log'>
            <header>
                <h1>Inicia Sesión</h1>
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
