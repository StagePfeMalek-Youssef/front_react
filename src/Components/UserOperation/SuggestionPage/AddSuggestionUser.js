import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import SuggestionService from '../../../services/AdminService/SuggestionService';


import './ListSuggestion.css';
const AddSuggestionUser = () => {

    const [message, setMessage] = useState('')
    const [objet, setObjet] = useState('')
    const history = useHistory();
    const { id } = useParams();


    const saveOrUpdateSuggestion = (e) => {
        e.preventDefault();  
        
        const suggestion = { message, objet }
        const username=sessionStorage.getItem("UserName");
      
            SuggestionService.createSuggestion(username,suggestion).then((response) => {
            
                console.log(response.data.type)
                console.log(response.data)

                history.push('/show-suggestion-user');

            }).catch(error => {
                console.log(error)
            })
        }

    
    useEffect(() => {

        SuggestionService.getSuggestionById(id).then((response) => {
            setMessage(response.data.message)
            setObjet(response.data.objet)
          

        }).catch(error => {
            console.log(error)
        })
    }, [])

 

    return (
        
            <div className="wrapper">
                <div className="title">
                   
                          Ajouter Suggestion
                        <div className="form">
                

                                <div className="inputfield">
                                    <label> Ecrire Message </label>
                                    <input
                                        type="text"
                                        name="message"
                                        className="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    >
                                    </input>
                                </div>

                                
                                <div className="inputfield">
                                    <label> Objet </label>
                                    <div className='custom-selec'>
                                    <select value={objet} onChange={(e) => setObjet(e.target.value)}>
                                        <option value="-----------">---------------</option>
                                        <option value="Panne Technique">Panne Technique</option>
                                        <option value="Agence">Agence</option>
                                        <option value="Service">Service</option>                            
                                    </select>
                                    </div>
</div>
                                    
                                

                                </div>
                                
                              <div className='inputfield'>
                                <button className="btn btn-success" onClick={(e) => saveOrUpdateSuggestion(e)} >Envoyer </button>
                                <Link to="/show-suggestion-user" className="btn btn-secondary" style = {{marginLeft:"10px"}}> Annuler </Link>
                                </div>

                        </div>
               </div>

    )
}

export default AddSuggestionUser