//importacion de paquetes
import { useEffect, useState } from 'react';

//importacion de componentes
import Chat from './Chat';
import Login from './Login';

function App() {
    //estado general de usuario
    const [userData, setUserData] = useState(null);
    //verificacion de sesion
    useEffect(() => {
        let storage = localStorage.getItem('userData');
        console.log(storage);
        if (storage !== null) {
            storage = JSON.parse(storage);
            console.log(storage);
            setUserData(storage);
        }
    }, []);

    //funcion de cerrado de sesion

    function logOut() {
        localStorage.removeItem('userData');
        setUserData(null);
    }

    //verificación de existencia de sesion para la visualización respectiva
    return userData === null ? (
        <Login action={(data) => setUserData(data)} />
    ) : (
        <Chat data={userData} logOutAction={logOut} />
    );
}

export default App;
