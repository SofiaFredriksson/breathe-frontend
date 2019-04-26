import React from 'react'
import '../Reflections.css'

const ReflectionsPage = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.currentUser.first_name}'s Reflections</h1>
      {props.currentUser.reflections.map(reflection =>
        {return(
        <div className="card" key={reflection.id}>
        {reflection.content}
        </div>)}
      )}
    </div>
  )
}

export default ReflectionsPage
