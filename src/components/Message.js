const Message = (data, userData) => {
    //verifica que los datos no esten vacios
    if (data === null) {
        alert('No se puede pasar de aca');
    }
    //acomoda los mensajes en orden por fecha de envio
    data = data.sort((a, b) => {
        a = new Date(a.fecha);
        b = new Date(b.fecha);
        return a < b ? -1 : a > b ? 1 : 0;
    });
    // verifica si el mensaje es del usuario o de otro
    let listMessages = data.map((x) => {
        let type =
            x.userName === userData.userName
                ? x.userId === userData._id
                    ? 1
                    : 0
                : 0;

        return (
            <div
                key={x._id}
                className={type === 0 ? 'messageOtherBox' : 'messageMeBox'}
            >
                <p className={type === 0 ? 'messageOther' : 'messageMe'}>
                    <b>{type !== 0 ? 'Yo' : x.userName}:</b>
                    <br />
                    {x.messageText}
                </p>
            </div>
        );
    });
    return listMessages;
};

export default Message;
