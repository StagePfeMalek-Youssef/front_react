import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import SujetService from '../../../services/AdminService/SujetService';
import "./Sujet.css"

const SujetShow = () => {



    const [sujets, setSujets] = useState([])
    const username=sessionStorage.getItem("UserName");
    useEffect(() => {

        getAllSujet();
    }, [])

    const getAllSujet = () => {
        SujetService.getAllSujetsByUsername(username).then((response) => {
            setSujets(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }
   
    const deleteSujet = (sujetId) =>{
        SujetService.deleteSujet({sujets: this.state.sujet.filter(sujet => sujet.sujetId!== sujetId)});
        
    }
  

    return (
        
        
   <div>
        <div className='main__container'>
            <h2 className = "main__title"> page de discution </h2>
            Mae vous remerci de votre participation 
            <Link to = "/AjouteSujet" className = "btn btn-primary mb-2" > Ajouter Un Sujet </Link>
        </div>

       
       
       
  
       
        {
         
         sujets.map(
             sujet =>
             <section className="sujet">
             <article>
             
             <div key = {sujet.idSu}> 
                 <p> le titre de sujet {sujet.titreSujet} et crier par <div className="btn btn-outline-primary">{sujet.username} </div> a {sujet.createdAt} </p><br></br>
                 <p> {sujet.message} </p>
       

                 <p>             
                  <Link className="btn btn-info" to={`/ViewSujet/${sujet.idSu}`} >Lire la publictaion</Link>

                 </p>
             </div>
             </article>
           </section>
         )
     }
             
      


       
        

   </div>

           

        
    )
}

export default SujetShow;