import React from 'react'
import { withRouter } from 'react-router-dom'

import '../Nav.css'

class OtherNav extends React.Component {

  render() {
    return(

          <div className='navWrapper'>
            <ul>
              <li style={{float:"right"}} onClick={() => {this.props.location.pathname === "/signup" ? this.props.history.push('/login') : this.props.history.push('/signup')}}>
                {this.props.location.pathname === "/signup" ? "Log In" : (this.props.location.pathname === "/login" ? "Sign Up" : "")}
              </li>
            </ul>

          </div>

    )
  }
}

export default withRouter(OtherNav)
