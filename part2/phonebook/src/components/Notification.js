import React from 'react'

const Notification = ({ content, status }) => {
  if (content === null) {
    return null
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  
  return (
    <div style={status === "success" ? successStyle : errorStyle}>
      {content}
    </div>
  )
}


export default Notification;