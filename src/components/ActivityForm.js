import React from 'react'

class ActivityForm extends React.Component {

  state = {
    category_id: null,
    description: '',
    title: '',
    time: null
  }

  handleCategorySelect = (event) => {
    let cat = this.props.categories.find(category => category.name === event.target.value)
    this.setState({
      category_id: cat.id
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  render () {
    console.log(this.state);
    return (
      <form onSubmit={(event) => this.props.handleActivitySubmit(event, this.state)}>
        <label>
        Category:
        <br/>
        <select name="category" onChange={this.handleCategorySelect}>
          <option value="">Choose a category</option>
          <option value="Social">Social</option>
          <option value="Nourish">Nourish</option>
          <option value="Sweat">Sweat</option>
          <option value="Nature">Nature</option>
        </select>

        </label>

        <br/><br/>

        <label>
          Title:
          <br/>
          <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
        </label>

        <br/><br/>

        <label>
          Description:
          <br/>
          <textarea name="description" onChange={this.handleChange} value={this.state.description}/>
        </label>

        <br/><br/>

        <label>
        Time (min):
        <br/>
          <select name="time" onChange={this.handleChange}>
            <option value="">Choose a time</option>
            <option value="3">3 minutes</option>
            <option value="5">5 minutes</option>
            <option value="8">8 minutes</option>
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
            <option value="30">30+ minutes</option>

          </select>
        </label>

        <br/><br/>

        <input type='submit' value="Submit" />

      </form>
    )
  }
}

export default ActivityForm
