import React from 'react'

class SignUpForm extends React.Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log(this.props);
    return (
    <div className="form">
      <h1>Sign Up</h1>
      <form onSubmit={(event) => this.props.handleSignupSubmit(event, this.state)}>
        <label>
        First name:
        <br/>
        <input type="text" value={this.state.first_name} name="first_name" onChange={this.handleChange} />
        </label>
          <br/><br/>
        <label>
        Last name:
        <br/>
        <input type="text" value={this.state.last_name} name="last_name" onChange={this.handleChange} />
        </label>
          <br/><br/>
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

export default SignUpForm
