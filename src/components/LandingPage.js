import React from 'react'

import { withRouter } from 'react-router-dom'

const LandingPage = (props) => {
  return(
    <div>
    <h1>BREATHE</h1>
    <br/><br/>
    <button onClick={() => props.history.push('/login')}>Login</button>
    <button onClick={() => props.history.push('/signup')}>Signup</button>

    </div>
  )
}

export default withRouter(LandingPage)
