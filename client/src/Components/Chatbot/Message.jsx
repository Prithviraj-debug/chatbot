const MessageDiv = ({chatHistoryUser, chatHistoryBot}) => {
    return (
      <div>
        <p className='user text'>{chatHistoryUser[chatHistoryUser.length - 1]?.text}</p>
        <p className='bot text'>{chatHistoryBot[chatHistoryBot.length - 1]?.text}</p>
      </div>
    )
  }

  export default MessageDiv;