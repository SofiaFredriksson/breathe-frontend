import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import '../Nav.css'

class NavBar extends React.Component {

  render() {
    return(
      <div className='navWrapper'>
        Breathe {this.props.currentUser.first_name} <br/>

          <button><NavLink to='/'>
          Breathe
          </NavLink></button>

          <button><NavLink to='/reflections'>
          Reflections
          </NavLink></button>

          <button><NavLink to='new_activity'>
          New
          </NavLink></button>

        <button><NavLink to='signUp'>
          Sign Up
          </NavLink></button>

          <button><NavLink to='logIn'>
          {this.props.currentUser.id ? "Log Out" : "Log In"}
          </NavLink></button>


      </div>
    )
  }
}

export default NavBar
