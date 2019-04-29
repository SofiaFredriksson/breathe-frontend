import React from 'react'

import TimeSelect from '../components/TimeSelect'
import CategoryButtons from '../components/CategoryButtons'
import ActivityPage from '../components/ActivityPage'
import ReflectionForm from '../components/ReflectionForm'
import ReflectionsPage from '../components/ReflectionsPage'
import NavBar from './NavBar'
import ActivityForm from '../components/ActivityForm'
import SignUpForm from '../components/SignUpForm'
import LogInForm from '../components/LogInForm'

const ActivityAPI = 'http://localhost:3001/api/v1/activities'
const CategoryAPI = 'http://localhost:3001/api/v1/categories'
const UserAPI = 'http://localhost:3001/api/v1/users'
const ReflectionsAPI = 'http://localhost:3001/api/v1/reflections'


class HomePage extends React.Component {
  state = {
    selectedCategory: {},
    selectedTime: '',
    clicked: 'home',
    activities: [],
    suggestedActivity: {},
    categories: [],
    currentUser: {}
  }

//initial fetches, setting state for activities, categories and currentUser
componentDidMount(){
  fetch(ActivityAPI)
  .then(resp => resp.json())
  .then(data => this.setState({
    activities: data
  }))

  fetch(CategoryAPI)
  .then(resp => resp.json())
  .then(data => this.setState({
    categories: data
  }))

  fetch(UserAPI + '/2')
  .then(resp => resp.json())
  .then(data => this.setState({
    currentUser: data
  }))
}
 //click handler for 'done' with activity
handleDoneClick = () => {
  this.setState({
    clicked: 'form'
  })
}

//click handlers for selecting category and time for suggested activity
handleCategoryClick = (event) => {
  this.setState({
    selectedCategory: this.state.categories.find(category => category.name === (event.target.value)),
    clicked: 'category'
  })
}

handleTimeSelect = (event) => {
  const activ = this.state.selectedCategory.activities.filter(activity => activity.time === parseInt(event.target.value))
  const num = Math.floor(Math.random() * (activ.length))
  this.setState({
    selectedTime: event.target.value,
    clicked: 'activity',
    suggestedActivity: activ[num]
  })
}

//nav button click handler
handleNavClick = (value) => {
  this.setState({
    clicked: value
  })
}

//Submit handlers for reflection, activity and user forms (sign up and login)
handleActivitySubmit = (event, body) => {
  event.preventDefault()
  fetch(ActivityAPI, {
  	method: 'POST',
  	headers: {"Content-Type": "application/json"},
  	body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then(data => this.setState({
    clicked: 'home',
    activities: [...this.state.activities, data]
  }))
}

handleReflectionSubmit = (event, body) => {
  event.preventDefault()
  fetch(ReflectionsAPI, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then(data =>
    this.setState({
      clicked: 'reflections',
      currentUser: {...this.state.currentUser,
        reflections: [...this.state.currentUser.reflections, data]}
    }))
}

handleSignupSubmit = (event, body) => {
  event.preventDefault()
  fetch(UserAPI, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then(data => this.setState({
    clicked: 'home'
  }))
}

// handleLoginSubmit = (event, body) => {
//
// }

//conditionally render components
  renderContent = () => {
    switch(this.state.clicked) {
      case 'home':
      return <CategoryButtons handleCategoryClick={this.handleCategoryClick}/>
      case 'category':
        return <TimeSelect selectedCategory={this.state.selectedCategory} handleTimeSelect={this.handleTimeSelect}/>;
      case 'activity':
        return <ActivityPage suggestedActivity={this.state.suggestedActivity} selectedTime={this.state.selectedTime} handleDoneClick={this.handleDoneClick}/>
      case 'form':
        return <ReflectionForm suggestedActivity={this.state.suggestedActivity} currentUser={this.state.currentUser} handleReflectionSubmit={this.handleReflectionSubmit}/>;
      case 'reflections':
        return <ReflectionsPage currentUser={this.state.currentUser} activities={this.state.activities}/>
      case 'newActivity':
        return <ActivityForm categories={this.state.categories} handleActivitySubmit={this.handleActivitySubmit}/>
      case 'signUp':
        return <SignUpForm handleSignupSubmit={this.handleSignupSubmit}/>
      case 'logIn':
        return <LogInForm />
      default:
        return null;
    }
  }


  render() {
    console.log(this.state.currentUser);
    console.log(this.state.activities);
    return(
      <div>
      <NavBar handleNavClick={this.handleNavClick} />
      {this.renderContent()}
      </div>
    )
  }
}

export default HomePage
