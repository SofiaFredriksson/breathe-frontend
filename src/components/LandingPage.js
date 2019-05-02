import React from 'react'
import logo from '../containers/logo.png'

import { withRouter } from 'react-router-dom'

const LandingPage = (props) => {
  return(
    <div>
    <img src={logo} />
    <br/><br/>
    <button onClick={() => props.history.push('/login')}>Login</button>
    <button onClick={() => props.history.push('/signup')}>Signup</button>

    </div>
  )
}

export default withRouter(LandingPage)
