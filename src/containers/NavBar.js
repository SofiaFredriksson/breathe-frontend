import React from 'react'

import logo from '../containers/logoSmall.png'

import { withRouter } from 'react-router-dom'

import '../Nav.css'

class NavBar extends React.Component {

  render() {
    return(
      <div>
        <ul>
          <li onClick={this.props.homeNavClick}><img class="logo" src={logo} /></li>

          <li onClick={() => this.props.history.push('/reflections')}>Reflections</li>

          <li onClick={() => this.props.history.push('/new_activity')}>New</li>

          <li style={{float:"right"}} onClick={() => {!this.props.currentUser ? this.props.history.push('/login') : this.props.logOut()}}>
            {this.props.currentUser ? "Log Out" : "Log In"}
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(NavBar)

// Breathe {this.props.currentUser.first_name}
