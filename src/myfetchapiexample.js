import React,{Component} from 'react'

    const DEFAULT_QUERY='redux'
    const PATH_BASE='https://hn.algolia.com/api/v1'
    const PATH_SEARCH='/search'
    const PARAM_SEARCH='query='
    const url='${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}'
class MyFetchApiExample extends Component{
    constructor(props){
        super(props)
        this.state={
            list:null,
            searchTerm:DEFAULT_QUERY
        }
    }
    onDismiss=(id)=>{
        this.setState(this.state.list=this.state.list.filter(item=>item.objectID !== id))
    }
    onSearchTerm=(event)=>{
        this.setState({searchTerm:event.target.value})
        console.log(event.target.value)
    }
    onSearchSubmit=(event)=>{
         console.log("inonsearchsubmit")
         const {searchTerm}=this.state
         this.fetchSearchTopStories(searchTerm)
         event.preventDefault()
         console.log("outonsearchsubmit")
    }
    resultFetched=(result)=>{
        this.state.list?
        this.setState(
            this.state.list=[
                {
                    [this.state.searchTerm]:{hits:result}
                }
            ]
        ):
        this.setState(
            this.state.list=[
                ...this.state.list,
                {
                    [this.state.searchTerm]:{hits:result}
                }
            ]
        )
        
        }
    fetchSearchTopStories=(searchTerm)=>{
        console.log("infetchSearchStories")
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`) 
        .then(response => response.json()) 
        .then(result => this.resultFetched(result)) 
        .catch(error => error) 
        console.log("outfetchSearchStories")
        
    }
    componentDidMount(){
        const {searchTerm} = this.state
        console.log("component did mount")
        this.fetchSearchTopStories(searchTerm)
        console.log(this.state.list)
    }
    render(){
        if(!this.state.list){return null}
        return(
            <div>
                <Search 
                list={this.state.list} 
                searchTerm={this.state.searchTerm} 
                onSearchTerm={this.onSearchTerm}
                onSubmit={this.onSearchSubmit}
                />
                <ul>
                    <Table 
                    list={this.state.list} 
                    onDismiss={this.onDismiss}
                    />
                </ul>
            </div>
        )
    }

}
export default MyFetchApiExample


const Search=({list,onSearchTerm,searchTerm,onSubmit})=>{
    return(
    <div>    
        <form onSubmit={onSubmit}>
            <input onChange={onSearchTerm} />
            <button type={"submit"} >
                Search
            </button>
        </form>
        
    </div>
    )
}
const Table=({list,onDismiss})=>{
    
    console.log(list)
    return(
        <div>{list.map(item=>
            <li>
                {item.author+' '+item.title+' '+item.url}
            <li>
                <button 
                onClick={()=>onDismiss(item.objectID)}
                >
                    Dismiss
                </button>
            </li>
            </li>
            )}</div>
    )
}