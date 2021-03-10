import React from 'react'
import axios from 'axios'

// set the api link
const baseURL="https://3001-orange-mite-em2ubva2.ws-us03.gitpod.io"

export default class App extends React.Component {
    state ={
        players : [
            // {
            //     first_name : "Ryan",
            //     last_name : "Giggs",
            //     position : "Winger"
            // },
            // {
            //     first_name : "Eric",
            //     last_name : "Cantona",
            //     position : "Forward"
            // },
        ],
        _id  : "",
        first_name : "",
        last_name : "",
        position : "",
    }

    // load in data
  async componentDidMount() {
    let response = await axios.get(baseURL + "/players");
    console.log(response.data)
    this.setState({
      players: response.data
    });
  }

    renderList =()=> {
        return this.state.players.map( item =>  <tr>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.position}</td>
            <td><button onClick={ 
                ()=>{this.updatePlayer(item)}
            }>Update</button></td>
             <td><button onClick={ 
                ()=>{this.deletePlayer(item)}
            }>Delete</button></td>
            </tr>
            )
    }
    addList =()=>{
        return <div>
            <input type="text" name="first_name" value ={this.state.first_name} onChange={this.eventHandler}/><br/>
            <input type="text" name="last_name" value ={this.state.last_name} onChange={this.eventHandler}/><br/>
            <input type="text" name="position" value ={this.state.position} onChange={this.eventHandler}/>
            <button onClick={this.addPlayer}>Add player</button>
        </div>
    }
    eventHandler =(e)=> {
        this.setState ({
            [e.target.name]:e.target.value
        })
    }
    // Create route to send to api
    addPlayer = async event=> {
        let newPlayer = {
            first_name : this.state.first_name,
            last_name : this.state.last_name,
            position : this.state.position,
        }
   
        let response = await axios.post(baseURL+"/players",newPlayer)
        newPlayer._id = response.data._id;

        this.setState ({
            players : [
                ...this.state.players,
                newPlayer
            ]
        })
    }
    // Delete route to send to api
    deletePlayer = async item => {
        let index = this.state.players.findIndex (t => t._id === item._id);

        await axios.delete(baseURL+"/players/"+item._id)

        this.setState ({
            players : [
                ...this.state.players.slice(0,index),
                ...this.state.players.slice(index+1)
            ]
        })
        
    }
    // Update route to send to api
    updatePlayer = async item => {
        axios.put (baseURL, "/players", {
            ...item
        })

    }

    render (){
        return(
            <React.Fragment>
                <h1>Hello World</h1>
                <table>
                    {this.renderList()}
                    {this.addList()}
                </table>
            </React.Fragment>
        )
    }
 
}

