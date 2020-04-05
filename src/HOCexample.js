import React from 'react'

class HOC extends React.Component{
    constructor(props){
        super(props)
        this.state={
            todos:null
        }
    }
    render(){
        return(
            <div>
                <TodoListWithNull todos={this.state.todos}/>
            </div>
        )
    }
}
export default HOC
const TodoList=({todos})=>{

    return(
        <div>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
        </div>
    )
}

const TodoListWithNull=withTodosNull(TodoList)
const withTodosNull=(Component)=>(props)=>{
     !props.todos?null:<Component {...props}/>
    
}