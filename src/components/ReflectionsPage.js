import React from 'react'
import '../Reflections.css'

class ReflectionsPage extends React.Component{

  state = {
    searchTerm: '',
    filtered: [],
    reflections: this.props.currentUser.reflections,
    sortBy: ''

  }

  filterSearches = () => {
    return this.state.reflections.filter(reflection => reflection.content.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || reflection.score === parseInt(this.state.searchTerm))
  }
  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  handleRadioChange = (event) => {
    this.setState({
      sortBy: event.target.value
    })
  }

  removeReflection = (reflection) => {
    this.props.deleteClick(reflection.id)
    this.setState({ reflections: this.state.reflections.filter(ref => ref.id !== reflection.id)})
  }

  render() {
  if(this.props.currentUser.id && this.props.activities[0]) return (
    <div className="reflection">
    <div className="title">
    {this.props.currentUser.first_name}'s Reflections
    </div>
    <div className="searchForm">

      <form className="search">
      <input onChange={this.handleChange} name="searchTerm" type="text" placeholder="Search your reflections..."></input>
      </form>
    </div>

      <div className="gridContainer">
      <div className="analyticsCard">
        <div className="analyticsContent">
          <h2>{this.props.currentUser.total_activity_time} Minutes</h2>
          <h2>{this.props.currentUser.reflection_count} Breaths</h2>
        </div>
      </div>
        {this.filterSearches().reverse().map(reflection =>
          {return(
          <div className="card" key={reflection.id}>
            <div className="innerCard">
              <h3>{this.props.activities.find(activity => activity.id === reflection.activity_id).title}</h3>
              <p>{reflection.content}</p>
              <br/>
              <p>Score: {reflection.score}</p>
              <button onClick={() => this.removeReflection(reflection)} className="deleteBtn">Delete</button>
            </div>
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
}

export default ReflectionsPage



// <form className="filter">
// <label>
//   <input type="radio" value="nourish" checked={null} onChange={this.handleRadioChange}/>
//   Nourish
// </label>
// <label>
//   <input type="radio" value="sweat" checked={null} onChange={this.handleRadioChange}/>
//   Sweat
// </label>
// <label>
//   <input type="radio" value="nature" checked={null} onChange={this.handleRadioChange}/>
//   Nature
// </label>
// <label>
//   <input type="radio" value="social" checked={null} onChange={this.handleRadioChange}/>
//   Social
// </label>
// </form>
