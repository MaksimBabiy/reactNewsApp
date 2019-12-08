import React,{Component} from 'react';
import Post from "./Post";
import axios from 'axios'
import {createJson} from '../../server/index'

class App extends Component{

  UNSAFE_componentWillMount(){
    const { setPosts } = this.props;
    axios.get('result.json')
    .then(({ data }) => setPosts(data))
  }
  componentDidUpdate(){
    const { setPosts,cities } = this.props;
    switch(cities.city){
      case 'Odessa':
          axios.get('result.json')
          .then(({ data }) => setPosts(data))
          break;
      case 'Kiev': 
          axios.get('result2.json')
          .then(({ data }) => setPosts(data)  )
          break;
      case 'World': 
      axios.get('result3.json')
      .then(({ data }) => setPosts(data)  )
          break;
      default:
          return false
    }  
  }
  render(){
    const { posts, changeCity } = this.props
    const { items } = posts
    
    return (
      <div>
        <h1>Города</h1>
        <h3>Выбранный город {this.props.cities.city}</h3>
        <li>
          <button onClick={changeCity.bind(this,'Odessa')}>Одесса</button>
        </li>
        <li>
          <button onClick={changeCity.bind(this,'Kiev')}>Киев</button>
        </li>
        <li>
          <button onClick={changeCity.bind(this,'World')}>Мир</button>
        </li>
        <button onClick={createJson}>Обновить новости</button>
        {items.map((post,index)=> (
          <Post {...post} key = {index}/>
        ))}
      </div>
    );
  }
}

export default App
