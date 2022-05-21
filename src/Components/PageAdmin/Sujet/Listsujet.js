import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SinistreService from '../../../services/AdminService/SinistreService'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Listsujet.css'
import SujetService from '../../../services/AdminService/SujetService';
const Listsujet = () => {

    const [sujets, setSujets] = useState([])

    useEffect(() => {

        getAllSujet();
    }, [])

    const getAllSujet = () => {
        SujetService.getAllSujets().then((response) => {
            setSujets(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }
    const deleteSujet = (sujetId) =>{
        SujetService.deleteSujet(sujetId).then( res => {
            this.setState({sujets: this.state.sujets.filter(sujet => sujet.sujetId!== sujetId)});
        });
    }
    
    const activeSujet = (sujetId) =>{
        SujetService.active(sujetId).then( res => {
        })
    }

    return (
        <div className='main__container'>
            <h2 className = "main__title"> Tous Les sinistres </h2>
            <Link to = "/add-sujet" className = "btn btn-primary mb-2" > Ajouter Un Sujet </Link>
            <table>
            <thead>
                    <th className='th1'> Sujet Id </th>
                    <th className='th2'> Titre de Sujet</th>
                    <th className='th3'> Message </th>
                    <th colspan="3"> Actions </th>
                </thead>
                <tbody>
                    {
                        sujets.map(
                            sujet =>
                            <tr key = {sujet.idSu}> 
                                <td> {sujet.idSu} </td>
                                <td> {sujet.titreSujet} </td>
                                <td> {sujet.message} </td>
                      

                                <td>
                                    <Link className="btn btn-info" to={`/edit-sujet/${sujet.idSu}`} >Update</Link>
                                </td>
                                <td>
                                  <button className={sujet.active===false ? "btn btn-warning" : "btn btn-success"} onClick = {() => activeSujet(sujet.idSu)}
                                  style = {{marginLeft:"10px"}}> Accept</button>
                                </td>
                                <td>
                                    <button className = "btn btn-danger" onClick = {() => deleteSujet(sujet.idSu)}
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

export default Listsujet;