import React, { useState,useEffect } from 'react'
import "./App.css"
import io from 'socket.io-client'
const socket = io('http://localhost:5000')

const App = () => {

  const [username, SetUserName] = useState("")
  const [chatActive, setChatActive] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, SetNewMessage] = useState("")

  useEffect(() => {
    socket.on('received-message', (message) => {
      setMessages([...messages, message]);
    })
    console.log(messages);
  }, [messages, socket])
 

  const handleActive = () => {
    if (username.length > 0) {
      setChatActive(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageData = {
      message: newMessage,
      user: username,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }

    if (!newMessage == "") {
      socket.emit('send-message', messageData)
    } else {
      alert("Message cannot be empty")
    }
    SetNewMessage("")
  }

  return (
    <>
      <div className="chat-container">
        {
          chatActive ?
            <div className='message-container'>
              <div className='all-messages'>
                <h3 className='title'>Zulqarnain's Chat App</h3>
                            
              {
                messages.map((msg, index) => (
                  <div className={`single-msg ${msg.user === username ? 'my-msg' : ''}`} key={index} >
                    <div className={`single ${msg.user === username ? 'my-msg-and' : ''}`} >
                      <p className='user-name'>{msg.user}</p>
                      <p className='user-msg'>{msg.message}</p>
                      <p className='msg-time'>{msg.time} pm</p>
                    </div>
                  </div>
                 
                ))
              }
              </div>
              <div>
                <form className='msg-box'>
                  <input
                    type="text"
                    placeholder='Type your message...'
                    className='type-msg'
                    value={newMessage}
                    onChange={(e) => SetNewMessage(e.target.value)}
                  />
                  <button className='send-msg' onClick={handleSubmit} type='submit'>Send</button>
                </form>
              </div>
            </div>
            :
            <div className='start-chat'>
              <input
                type="text"
                className='username'
                value={username}
                name=''
                placeholder='your name'
                onChange={(e) => SetUserName(e.target.value)}

              />
              <button
                type="submit"
                onClick={handleActive}
                className='chat-btn'>Start Chat
              </button>
            </div>
        }
      </div>
    </>
  )
}

export default App
