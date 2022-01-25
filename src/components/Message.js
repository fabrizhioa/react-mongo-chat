const Message = ({ userName = 'Anonimous', userMessage, type = 0 }) => {
    return (
        <div className={type === 0 ? 'messageOtherBox' : 'messageMeBox'}>
            <p className={type === 0 ? 'messageOther' : 'messageMe'}>
                <b>{type === 0 ? userName : 'Me'}:</b>
                <br />
                {userMessage}
            </p>
        </div>
    );
};

export default Message;
