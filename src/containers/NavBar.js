import React from 'react'
import { withRouter } from 'react-router-dom'

import '../Nav.css'

class NavBar extends React.Component {

  render() {
    return(
      <React.Fragment>
        {this.props.currentUser
          ?
          <div className='navWrapper'>
        Breathe {this.props.currentUser.first_name}
        <br/>

          <button onClick={this.props.homeNavClick}>Breathe</button>

          <button onClick={() => this.props.history.push('/reflections')}>Reflections</button>

          <button onClick={() => this.props.history.push('/new_activity')}>New</button>

          <button onClick={() => {!this.props.currentUser ? this.props.history.push('/login') : this.props.logOut()}}>
          {this.props.currentUser ? "Log Out" : "Log In"}
          </button>
          </div>
          :
          <div className='navWrapper'>
          Breathe
          </div>

        }
        </React.Fragment>

    )
  }
}

export default withRouter(NavBar)
