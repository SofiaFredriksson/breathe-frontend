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
import OtherNav from '../components/OtherNav'


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
    currentUser: {},
    searchTerm: 'better'
  }

//initial fetches, setting state for activities, categories and currentUser
componentDidMount(){
  const token = localStorage.getItem("token")
  if(token){
    fetch("http://localhost:3001/api/v1/auto_login", {
      headers: {"Authorization": token}
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
        alert(data.error)
      }else{
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

handleBreatheClick = () => {
  this.setState({
    clicked: 'home'
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
  .catch(error => alert('Error:', error));
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


handleLoginSubmit = (event, body, formel) => {
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
      formel()
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

deleteClick = (id) => {
  fetch(`http://localhost:3001/api/v1/reflections/${id}`, {method: 'DELETE'})
  .then(resp => resp.json())
  .then(data => this.setState({
    currentUser: {...this.state.currentUser,
      reflections: [...this.state.currentUser.reflections.filter(ref => ref.id !== data.id)]},
  }))
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
    currentUser: {},
    clicked: 'home'
  }, this.props.history.push('/'))
}

  renderContent = () => {
    switch(this.state.clicked) {
      case 'home':
        return <CategoryButtons handleCategoryClick={this.handleCategoryClick}/>;
      case 'category':
        return <TimeSelect selectedCategory={this.state.selectedCategory} handleTimeSelect={this.handleTimeSelect}/>;
      case 'activity':
        return <ActivityPage suggestedActivity={this.state.suggestedActivity} selectedTime={this.state.selectedTime} handleDoneClick={this.handleDoneClick} handleBreatheClick={this.handleBreatheClick}/>;
      case 'form':
        return <ReflectionForm suggestedActivity={this.state.suggestedActivity} currentUser={this.state.currentUser} handleReflectionSubmit={this.handleReflectionSubmit}/>;
     default:
        return null;
    }
  }


  render() {
    return(
      <React.Fragment>
        {(!this.state.currentUser.id)
        ?
          <div>
          <OtherNav />
          <Switch>
          <Route path="/login" render={(routerProps) => <LogInForm {...routerProps} handleLoginSubmit={this.handleLoginSubmit} />}/>
          <Route path="/signup" render={(routerProps) => <SignUpForm {...routerProps} handleSignupSubmit={this.handleSignupSubmit} /> }/>
          <Route path="" component={LandingPage}/>
          </Switch>
          </div>
        :
          <div>
            <NavBar homeNavClick={this.homeNavClick} currentUser={this.state.currentUser} logOut={this.logOut}/>
            <Switch>
            <Route path="/login" render={(routerProps) => <LogInForm {...routerProps} handleLoginSubmit={this.handleLoginSubmit} />}/>
            <Route path="/signup" render={(routerProps) => <SignUpForm {...routerProps} handleSignupSubmit={this.handleSignupSubmit} /> }/>
            <Route path="/reflections" render={(routerProps) => <ReflectionsPage currentUser={this.state.currentUser} activities={this.state.activities} deleteClick={this.deleteClick}/>}/>
            <Route path="/new_activity" render={(routerProps) => <ActivityForm categories={this.state.categories} handleActivitySubmit={this.handleActivitySubmit}/>}/>
            <Route path="/breathe" render={(routerProps) => <div>{this.renderContent()}</div>} />
            </Switch>
          </div>
        }

         <a  style={{position: 'fixed', bottom: '8px', right: '5px', backgroundColor: 'black', color: 'white', textDecoration: 'none', padding: '4px 6px', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif', fontSize: '12px', fontWeight: 'bold', lineHeight: '1.2', display: 'inline-block', borderRadius: '3px'}} href="https://unsplash.com/@fabimoe?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Fabian Møller"><span style={{display: 'inline-block', padding: '2px 3px'}}><svg xmlns="http://www.w3.org/2000/svg" style={{height: '12px', width: 'auto', position: 'relative', verticalAlign: 'middle', top: '-2px', fill: 'white'}} viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" /></svg></span><span style={{display: 'inline-block', padding: '2px 3px'}}>Fabian Møller</span></a>
      </React.Fragment>
    )
  }
}
export default withRouter(HomePage)
