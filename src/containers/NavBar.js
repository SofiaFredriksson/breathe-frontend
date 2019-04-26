import React from 'react'
import '../Nav.css'

class NavBar extends React.Component {

  render() {
    return(
      <div className='navWrapper'>

          <button onClick={this.props.handleReflectionClick}>
          Reflections
          </button>

          <button>
          Breaths
          </button>

          <button>
          New
          </button>

          <button>
          Breathe
          </button>

          <button>
          Login
          </button>


      </div>
    )
  }
}

export default NavBar
