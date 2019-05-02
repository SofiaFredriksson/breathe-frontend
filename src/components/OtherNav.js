import React from 'react'
import { withRouter } from 'react-router-dom'

import '../Nav.css'

class OtherNav extends React.Component {

  render() {
    return(

          <div className='navWrapper'>
          Breathe
          </div>

    )
  }
}

export default withRouter(OtherNav)
