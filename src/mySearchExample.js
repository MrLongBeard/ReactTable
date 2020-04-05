import React,{Component} from 'react'

    const DEFAULT_QUERY='redux'
    const PATH_BASE='https://hn.algolia.com/api/v1'
    const PATH_SEARCH='/search'
    const PARAM_SEARCH='query='
    const url='${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}'
class SearchExample extends Component{
constructor(props){
    super(props)
    this.state={
        list:null,
        searchTerm:null,
        loading:false

    }
}
componentDidMount(){
    console.log("component did mount")
    // this.fetchSearchTopStories(this.state.searchTerm)
}
fetchSearchTopStories=(searchTerm)=>{
    this.setState({loading:false})
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`) 
        .then(response => response.json()) 
        .then(result => this.setState(this.state.list=result.hits)) 
        .catch(error => error) 
}
inputChange=(event)=>{
    this.setState(
        {searchTerm:event.target.value}
    )
    console.log(this.state.searchTerm)
}
onSubmit=(event)=>{
    this.fetchSearchTopStories(this.state.searchTerm)
    console.log("onSubmit  ")
    console.log(this.state.list)
    event.preventDefault()
    
}
    render(){
        console.log("render function  "+ this.state.searchTerm)
    return(
        <div>
            <form  onSubmit={this.onSubmit}>
                <input onChange={this.inputChange}/>
                <button type={"submit"}>Click me</button>
                
            </form>
            <ul>{this.state.list?this.state.list.map(item=><li>{item.author}</li>):"retreiving"}</ul>
        </div>
    )
}
}
export default SearchExample
const Loading = () => {
    return(
        <div>Loading...</div>
    )
}