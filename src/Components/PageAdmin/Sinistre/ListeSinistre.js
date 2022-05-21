import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SinistreService from '../../../services/AdminService/SinistreService'
import 'bootstrap/dist/css/bootstrap.min.css';
import './listSinistre.css'
const ListeSinistre = () => {

    const [sinistres, setSinistres] = useState([])

    useEffect(() => {

        getAllSinistres();
    }, [])

    const getAllSinistres = () => {
        SinistreService.getAllSinistres().then((response) => {
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
            <h2 className = "main__title"> Tous Les sinistres </h2>
            <Link to = "/add-sinistre" className = "btn btn-primary mb-2" > Ajouter Un Sinistre </Link>
            <table>
            <thead>
                    <th> Numéro De Sinistre</th>
                    <th> Date De Survenance </th>
                    <th>Etat</th>
                    <th>Lieu</th>
                    <th> Date De Déclaration </th>
                    <th>Type De Contrat</th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        sinistres.map(
                            sinistre =>
                            <tr key = {sinistre.idS}> 
                                <td> {sinistre.idS} </td>
                                <td>{sinistre.dateSurvenance}</td>
                                <td>{sinistre.etat}</td>
                                <td>{sinistre.lieu}</td>
                                <td>{sinistre.dateDeclaration}</td>
                                <td>{sinistre.type}</td>

                                <td>
                                    <Link className="btn btn-info" to={`/edit-sinistre/${sinistre.idS}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteSinistre(sinistre.idS)}
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

export default ListeSinistre;