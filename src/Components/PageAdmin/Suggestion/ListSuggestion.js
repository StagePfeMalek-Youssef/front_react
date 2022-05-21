import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import SuggestionService from '../../../services/AdminService/SuggestionService';
import './ListSuggestion.css';

const ListSuggestion = () => {
    
    const [suggestions, setSuggestion] = useState([])

    useEffect(() => {

        getAllSuggestions();
    }, [])

    const getAllSuggestions = () => {
        SuggestionService.getAllSuggestion().then((response) => {
            setSuggestion(response.data);
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    
    const deleteSuggestion = (suggestionId) =>{
        SuggestionService.deleteSuggestion(suggestionId).then( res => {
            this.setState({suggestions: this.state.suggestions.filter(suggestion => suggestion.suggestionId!== suggestionId)});
        });
    }
    const activeSuggestion = (suggestionId) =>{
        SuggestionService.active(suggestionId).then( res => {
        })
    }


   
    return (
        <div className='main__container'>
            <h2 className = "main__title"> Tous Les Suggestion </h2>
            <Link to = "/add-suggestion" className = "btn btn-primary mb-2" > Ajouter Suggestion </Link>
            <table>
            <thead>
                    <th> Le Numereau de Suggestion </th>
                    <th> Objet </th>
                    <th> Message </th>
                    <th colspan="3"> Actions </th>
                </thead>
                <tbody>
                    {
                        suggestions.map(
                            suggestion =>
                            <tr key = {suggestion.id}> 
                                <td> {suggestion.id} </td>
                                <td>{suggestion.objet}</td>
                                <td > {suggestion.message} </td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-suggestion/${suggestion.id}`} >Update</Link>
                                </td>
                            
                               

                                <td>
                                  <button className={suggestion.active===false ? "btn btn-warning" : "btn btn-success"} onClick = {() => activeSuggestion(suggestion.id)}
                                  style = {{marginLeft:"10px"}}> Accept</button>
                                </td>
                               
                                <td>
                                    <button className = "btn btn-danger" onClick = {() => deleteSuggestion(suggestion.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </td>     
                               
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListSuggestion;