import React from 'react'

class ActivityPage extends React.Component {


  render () {
    console.log(this.props);
  return (
    <div className="form">
      <h1>{this.props.suggestedActivity.title}</h1>
      <p>{this.props.suggestedActivity.description}</p>
      <button onClick={this.props.handleDoneClick}>Done</button>
    </div>
  )
}
}

export default ActivityPage
