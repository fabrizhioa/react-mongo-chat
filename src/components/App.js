import { useEffect, useState } from 'react';
import Chat from './Chat';
import Login from './Login';

function App() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let storage = localStorage.getItem('userData');
        console.log(storage);
        if (storage !== null) {
            storage = JSON.parse(storage);
            console.log(storage);
            setUserData(storage);
        }
    }, []);

    function logOut() {
        localStorage.removeItem('userData');
        setUserData(null);
    }

    return userData === null ? (
        <Login action={(data) => setUserData(data)} />
    ) : (
        <Chat data={userData} logOutAction={logOut} />
    );
}

export default App;
