import React from 'react'
import TimeSelect from './TimeSelect'
import CategoryButtons from './CategoryButtons'

class HomePage extends React.Component {
  state = {
    selectedCategory: '',
    selectedTime: '',
    clicked: 'home'
  }

handleCategoryClick = (event) => {
  this.setState({
    selectedCategory: event.target.value,
    clicked: 'category'
  })
}

handleTimeSelect = (event) => {
  this.setState({
    selectedTime: event.target.value,
    clicked: 'activity'
  })
}

  renderContent = () => {
    switch(this.state.clicked) {
      case 'home':
      return <CategoryButtons handleCategoryClick={this.handleCategoryClick}/>
      case 'category':
        return <TimeSelect selectedCategory={this.state.selectedCategory} handleTimeSelect={this.handleTimeSelect}/>;
      case 'activity':
        return <h2>Hello</h2>
      default:
        return null;

    }
  }

  render() {
    console.log(this.state.selectedCategory);
    console.log(this.state.clicked);
    console.log(this.state.selectedTime);

    return(
      <div>
      {this.renderContent()}
      </div>
    )
  }
}

export default HomePage
