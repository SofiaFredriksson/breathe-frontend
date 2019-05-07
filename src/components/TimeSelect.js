import React from 'react'

const TimeSelect = (props) => {
    if(props.selectedCategory.id)
    return (
    <div className="form">
    <h1>{props.selectedCategory.name}</h1>
    How much time do you have?
    <br/>
    <div className="custom-select">
      <select onChange={(event) => props.handleTimeSelect(event)}>
        <option>Choose a time</option>
        <option value="3">3 minutes</option>
        <option value="5">5 minutes</option>
        <option value="8">8 minutes</option>
        <option value="15">15 minutes</option>
        <option value="20">20 minutes</option>
        <option value="30">30+ minutes</option>

      </select>
      </div>
    </div>
  )
  return(
    <div>
    BREATHE
    </div>
  )

}

export default TimeSelect
