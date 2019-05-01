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
import LandingPage from '../components/LandingPage'


import { Switch, Route, withRouter } from 'react-router-dom'

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
console.log('hello');
  const token = localStorage.getItem("token")
console.log(token);

  if(token){
    console.log(token)
    fetch("http://localhost:3001/api/v1/auto_login", {
      headers: {"Authorization": token}
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
        alert(data.error)
      }else{
        console.log(data)
        this.setCurrentUser(data)
      }
    })
  }

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
  }, () => {this.props.history.push('/breathe')}))
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
      currentUser: {...this.state.currentUser,
        reflections: [...this.state.currentUser.reflections, data]},
      clicked: 'home'
    }, () => {this.props.history.push('/reflections')}))
}

handleSignupSubmit = (event, body) => {
  event.preventDefault()
  fetch(UserAPI, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then(data => {
    if(data.error){
      alert(data.error)
    }else{
      this.setState({
        currentUser: data.user
      }, () => {
        localStorage.setItem("token", data.token)
        this.props.history.push('/breathe')
      })
    }
  } )
}


handleLoginSubmit = (event, body) => {
  event.preventDefault()
  fetch('http://localhost:3001/api/v1/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then(data =>{
    if(data.error){
      alert(data.error)
    }else{
      this.setState({
        currentUser: data.user
      }, () => {
        localStorage.setItem("token", data.token)
        this.props.history.push('/breathe')
      })
    }
  })
}

homeNavClick = () => {
  this.setState({
    clicked: 'home'
  }, this.props.history.push('/breathe') )
}

setCurrentUser = (response) => {
  this.setState({
    currentUser: response.user
  }, () => this.props.history.push(this.props.location.pathname))
}

logOut = () => {
  localStorage.removeItem("token")
  this.setState({
    currentUser: {}
  }, this.props.history.push('/'))
}

  renderContent = () => {
    switch(this.state.clicked) {
      case 'home':
        return <CategoryButtons handleCategoryClick={this.handleCategoryClick}/>;
      case 'category':
        return <TimeSelect selectedCategory={this.state.selectedCategory} handleTimeSelect={this.handleTimeSelect}/>;
      case 'activity':
        return <ActivityPage suggestedActivity={this.state.suggestedActivity} selectedTime={this.state.selectedTime} handleDoneClick={this.handleDoneClick}/>;
      case 'form':
        return <ReflectionForm suggestedActivity={this.state.suggestedActivity} currentUser={this.state.currentUser} handleReflectionSubmit={this.handleReflectionSubmit}/>;
     default:
        return null;
    }
  }


  render() {
    console.log(this.state.currentUser);
    return(
        <div>
      <NavBar homeNavClick={this.homeNavClick} currentUser={this.state.currentUser} logOut={this.logOut}/>
      <Switch>
      <Route path="/login" render={(routerProps) => <LogInForm {...routerProps} handleLoginSubmit={this.handleLoginSubmit} />}/>
      <Route path="/signup" render={(routerProps) => <SignUpForm {...routerProps} handleSignupSubmit={this.handleSignupSubmit} /> }/>
      <Route path="/reflections" render={(routerProps) => <ReflectionsPage currentUser={this.state.currentUser} activities={this.state.activities}/>}/>
      <Route path="/new_activity" render={(routerProps) => <ActivityForm categories={this.state.categories} handleActivitySubmit={this.handleActivitySubmit}/>}/>
      <Route path="/breathe" render={(routerProps) => <div>{this.renderContent()}</div>} />
      <Route path="" component={LandingPage}/>
      </Switch>
      </div>

    )
  }
}
export default withRouter(HomePage)
