import React from 'react'

const CategoryButtons = (props) => {
  return(
    <div className="form">
      <button value='Social' onClick={(event) => props.handleCategoryClick(event)}>Social</button>
      <button value='Nourish' onClick={(event) => props.handleCategoryClick(event)}>Nourish</button>
      <button value='Sweat' onClick={(event) => props.handleCategoryClick(event)}>Sweat</button>
      <button value='Nature' onClick={(event) => props.handleCategoryClick(event)}>Nature</button>
    </div>
  )
}

export default CategoryButtons
