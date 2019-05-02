import React from 'react'
import '../Reflections.css'

const ReflectionsPage = (props) => {
  console.log(props);
  if(props.currentUser.id && props.activities[0]) return (
    <div className="reflection">
    <div className="title">
    {props.currentUser.first_name}'s Reflections
    </div>
    <div className="gridContainer">
    {props.currentUser.reflections.map(reflection =>
      {return(
      <div className="card" key={reflection.id}>
      <h3>{props.activities.find(activity => activity.id === reflection.activity_id).title}</h3>
      <p>{reflection.content}</p>
      <br/>
      <p>Score: {reflection.score}</p>
      </div>)}
    )}
    </div>

    </div>
  )
  return(
    <div>
    <h1>BREATHE</h1>
    </div>
  )
}

export default ReflectionsPage
