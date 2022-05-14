import React from 'react'
import "./Card.css";

function Card(props) {
  return (
    <div>
        <div className="card">
          <div>{props.content}</div>
        </div>
    </div>
  )
}

export default Card