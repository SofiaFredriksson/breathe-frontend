import React from 'react'

import { withRouter } from 'react-router-dom'

const LandingPage = (props) => {
  return(
    <div>
    <button onClick={() => props.history.push('/login')}>Login</button>
    <button onClick={() => props.history.push('/signup')}>Signup</button>

    </div>
  )
}

export default withRouter(LandingPage)
