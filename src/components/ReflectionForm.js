import React from 'react'
import '../Form.css'

const ReflectionForm = (props) => {
  return(
    <div>
    <h1>Activity: {props.suggestedActivity.title}</h1>
    <form className="reflectionForm">
    <br/>
    <br/>
    <label>
    Reflect on your activity:
    <br/>
    <textarea name="description" />
    </label>
    </form>
    </div>

  )
}

export default ReflectionForm
