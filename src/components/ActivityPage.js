import React from 'react'
import { withRouter } from 'react-router-dom'

class ActivityPage extends React.Component {


  render () {
  return (
    <div className="form">
      <h1>{this.props.suggestedActivity.title}</h1>
      <p>{this.props.suggestedActivity.description}</p>
      <button onClick={this.props.handleDoneClick}>Reflect</button>
      <button onClick={this.props.handleBreatheClick}>Breathe</button>
    </div>
  )
}
}

export default withRouter(ActivityPage)
