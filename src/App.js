import React, { Children } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button.js'

const list=[
{
  title:'React',
  author:'Umair Hussain',
  url:'https://React-Autonomous-Swarm-Drones.com',
  num_comments:4,
  objectID:0
},
{
  title:'Redux',
  author:'Usman Hussain',
  url:'https://Redux-Autonomous-Swarm-Drones.com',
  num_comments:6,
  objectID:1
}
]
const DEFAUL_QUERY='redux'
const PATH_BASE='https://hn.algolia.com/api/v1'
const PATH_SEARCH='/search'
const PARAM_SEARCH='query='
const url='${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      result:null,
      list,
      searchTerm:DEFAUL_QUERY
    }
  }
  setSearchTopStories = (result)=>{
    this.setState({result})
  }
  componentDidMount(){
    
    const {searchTerm} = this.setState
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`) 
    .then(response => response.json()) 
    .then(result => this.setSearchTopStories(result)) 
    .catch(error => error)
    console.log(searchTerm)

  }
  onDismiss=(id)=>{
     
    this.setState(this.state.result.hits = this.state.result.hits.filter(item=>item.objectID !== id))
    
  }
  onSearchTerm=(event)=>{
    console.log(event.target.value)
    this.setState({searchTerm : event.target.value})
  }
  render(){
    const {searchTerm,result}=this.state
    console.log(result)
    if(!result){return null}
    return (
    
    <div className="page">
      <div className="interactions">
        <Search 
        onChange={this.onSearchTerm} 
        value={searchTerm} 
        searchTerm={searchTerm} 
        list={list}
        >
          Search
        </Search>
      </div>
      <span>
        <Table 
        list={result.hits} 
        pattern={searchTerm}
        onDismiss={this.onDismiss} />
      </span>
    </div>
  )
}
}

export default App;
const Search =({onChange,searchTerm,list,value,children})=>{

    return(
        <div>
        <span>
          <form>
            {children}
            <input onChange={onChange} value={value}/>
          </form>
        </span>
        <span>
          {list.filter(item=>item.title.toLowerCase()==searchTerm.toLowerCase()).map(item=>item.url+" "+item.author)}
        </span>
      </div>
    )
  
}
const Table = ({list,onDismiss})=>{

  return(
    <div className="table">
      {list.map(item=>
        <div className="table-row">
          <span style={{width:'40%'}}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{width:'30%'}}>
            {item.author}
          </span>
        <Button 
          className="button-inline" 
          onClick={()=>onDismiss(item.objectID)} 
          className={"hello"}
          >
            Dismiss
        </Button>
        </div>
        )}
    </div>
  )
}