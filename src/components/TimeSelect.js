import React from 'react'

const TimeSelect = (props) => {
  console.log('this is ' + props.selectedCategory.name);
  return(
    <div>
    <h1>{props.selectedCategory.name}</h1>
    How much time do you have?
    <br/>
      <select onChange={(event) => props.handleTimeSelect(event)}>
        <option value="3">3 minutes</option>
        <option value="5">5 minutes</option>
        <option value="8">8 minutes</option>
        <option value="10">10 minutes</option>
        <option value="15">15 minutes</option>
        <option value="20">20 minutes</option>
        <option value="30">30 minutes</option>
        <option value="40">40 + minutes</option>
      </select>

    </div>
  )

}

export default TimeSelect
