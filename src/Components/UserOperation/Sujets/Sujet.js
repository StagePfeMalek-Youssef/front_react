import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SujetService from '../../../services/AdminService/SujetService'
import AjouteCommentaire from './AjouteCommentaire'
import ShowComment from './ShowComment '
import "./Sujet.css"

class Sujet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            sujet: {}
        }
        this.deleteSujet = this.deleteSujet.bind(this);
    }

    componentDidMount(){
        SujetService.getSujetById(this.state.id).then( res => {
            this.setState({sujet: res.data});
        })
    }
     deleteSujet = (sujetId) =>{
        SujetService.deleteSujet(sujetId).then( res => {
            this.setState({sujets: this.state.sujet.filter(sujet => sujet.sujetId!== sujetId)});
        });
    }
    

    render() {
        const titresujet=sessionStorage.getItem("titresujet")
        const prenom =sessionStorage.getItem("prenom")
        const nom =sessionStorage.getItem("nom")
       const titre =sessionStorage.getItem("titre")
        return (
            
            <div>

             <section class="articles">
            <article>
            <label> le titre de sujet: </label>
             <div> { this.state.sujet.titreSujet }</div> 
            
             <div className = "row">
                            <label> le message: </label>
                            <div> { this.state.sujet.message } </div>
             </div>
             <Link className="btn btn-info" to={`/edit-sujetuser/${this.state.sujet.idSu}`} >Update</Link>
                     <button className = "btn btn-danger" onClick = {() => this.deleteSujet(this.state.sujet.idSu)}
                     style = {{marginLeft:"10px"}}> Delete</button>
             <AjouteCommentaire/>
            </article>
            </section>
                   <ShowComment/>
            
         
                
            </div>
        )
    }
}

export default Sujet