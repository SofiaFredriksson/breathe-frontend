import React from 'react'
import '../Form.css'



class ReflectionForm extends React.Component {

  state = {
    content: '',
    score: '',
    user_id: this.props.currentUser.id,
    activity_id: this.props.suggestedActivity.id
  }


  handleChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  handleScoreChange = (event) => {
    this.setState({
      score: parseInt(event.target.value)
    })
  }

  render() {
    console.log(this.state.content);
    console.log(this.state.score);
  return(
    <div className="form">
    <h1>Activity: {this.props.suggestedActivity.title}</h1>
    <form onSubmit={(event) => this.props.handleReflectionSubmit(event, this.state)}>
    <br/><br/>
    <label>
    Reflect on your activity:
    <br/>
    <textarea value={this.state.content} name="content" onChange={this.handleChange} />
    </label>
    <br/><br/>
    <label>
    Rate your activity:
    <br/>
    <select name="score" onChange={this.handleScoreChange}>
      <option value="">Choose a score</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
    </label>
    <br/><br/>
    <input type="submit" value="Submit" />
    </form>
    </div>

  )
}
}

export default ReflectionForm
