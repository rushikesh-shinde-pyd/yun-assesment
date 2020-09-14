import './App.css';
import axios from 'axios';
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        item: 'default',
        data: []
    }
  }
  
  selectOption = e => {
    this.setState({
      item: e.target.value
    },
    () => {
      return (
        this.state.item === 'default' ? 
        null :
        axios.get(`http://127.0.0.1:8000/api/item-list/${this.state.item}/`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err.message);
        }
        )
      )}
    )
  }


  componentDidMount = () => {
    axios.get('http://127.0.0.1:8000/api/item-list/')
    .then(res => {
      const items = res.data.map(item => item)
      this.setState({
        data: items
      })
    })
    .catch(err => {
      const error = err.message
      console.log(error);
    })
  }

  render() {
    const {item, data} = this.state
    return (
      <div>
        <select value={item} onChange={this.selectOption}>
          <option value="default">Select Item</option>
          {
            data.map(i => <option key={i.id} value={i.name}>{i.name}</option>)
          }
        </select>
        <h1>{item === 'default' ? null : item}</h1>
      </div>
    )
  }
}
