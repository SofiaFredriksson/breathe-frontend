import React from 'react'

const CategoryButtons = (props) => {
  return(
    <div>
      <button value='social' onClick={(event) => props.handleCategoryClick(event)}>Social</button>
      <button value='nourish' onClick={(event) => props.handleCategoryClick(event)}>Nourish</button>
      <button value='sweat' onClick={(event) => props.handleCategoryClick(event)}>Sweat</button>
      <button value='nature' onClick={(event) => props.handleCategoryClick(event)}>Nature</button>
    </div>
  )
}

export default CategoryButtons
