import React from 'react'

const ActivityPage = (props) => {
  return (
    <div>
      <h1>{props.suggestedActivity.title}</h1>
      <p>{props.suggestedActivity.description}</p>
    </div>
  )
}

export default ActivityPage
