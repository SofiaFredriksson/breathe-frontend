import React from 'react'
import '../Nav.css'

class NavBar extends React.Component {

  render() {
    return(
      <div className='navWrapper'>

          <button onClick={() => this.props.handleNavClick('home')}>
          Breathe
          </button>

          <button onClick={() => this.props.handleNavClick('reflections')}>
          Reflections
          </button>

          <button onClick={() => this.props.handleNavClick('newActivity')}>
          New
          </button>

          <button onClick={() => this.props.handleNavClick('signUp')}>
          Sign Up
          </button>

          <button onClick={() => this.props.handleNavClick('logIn')}>
          Log In
          </button>


      </div>
    )
  }
}

export default NavBar
