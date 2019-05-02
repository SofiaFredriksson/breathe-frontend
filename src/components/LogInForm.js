import React from 'react'

import { withRouter } from 'react-router-dom'

class LogInForm extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    console.log(this.state);
    return (
    <div>
    <h1>Login</h1>
      <form onSubmit={(event) => this.props.handleLoginSubmit(event, this.state)}>
        <label>
          Username:
          <br/>
          <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
        </label>
          <br/><br/>
        <label>
          Password:
          <br/>
          <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
        </label>
          <br/><br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
  }
}

export default withRouter(LogInForm)
