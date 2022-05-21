import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SinistreService from '../../../services/AdminService/SinistreService'
import 'bootstrap/dist/css/bootstrap.min.css';
const ShowSinistre = () => {

    const [sinistres, setSinistres] = useState([])
    const username=sessionStorage.getItem("UserName");
    useEffect(() => {

        getAllSinistres();
    }, [])

    const getAllSinistres = () => {
        SinistreService.getAllSinistresByUsername(username).then((response) => {
            setSinistres(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    
    const deleteSinistre = (sinistreId) =>{
        SinistreService.deleteSinistre(sinistreId).then( res => {
            this.setState({sinistres: this.state.sinistres.filter(sinistre => sinistre.sinistreId!== sinistreId)});
        });
    }

    return (
        <div className='main__container'>
        <h2 className = "main__title"> Tous Les Sinistres </h2>
        
      
                {
                    sinistres.map(
                        sinistre=>
                        <section className="sujet">
                        <article>
                        <div key = {sinistre.idS}> 
                        <p> le sinistre est crier a {sinistre.dateDeclaration} creer par <div className="btn btn-outline-primary">{sinistre.username}</div> </p><br></br>
                        <p> {sinistre.etat} </p>
                         avec image : 
                        <img src={"data:image/jpeg;base64," + sinistre.image} />
                        <p>             
                        <Link className="btn btn-info" to={`/edit-sinistre-user/${sinistre.idS}`} >Update</Link>
                  <button className = "btn btn-danger" onClick = {() =>deleteSinistre(sinistre.idS)}
                  style = {{marginLeft:"10px"}}> Delete</button>

              </p>
                        </div>
                        </article></section>
                    )
                }
</div>
    )
}

export default ShowSinistre;