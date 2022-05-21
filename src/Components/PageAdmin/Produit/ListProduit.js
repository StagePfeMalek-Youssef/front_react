import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProduitsService from '../../../services/AdminService/ProduitsService';

import './listProduit.css';
import UploadFilesProduit from './UploadFilesProduit';

const ListProduit = () => {

    const [produits, setProduits] = useState([])

    useEffect(() => {

        getAllProduits();
    }, [])

    const getAllProduits = () => {
        ProduitsService.getAllProduits().then((response) => {
            setProduits(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    
    const deleteProduit = (produitId) =>{
        ProduitsService.deleteProduit(produitId).then( res => {
            this.setState({produits: this.state.produits.filter(produit => produit.produitId!== produitId)});
        });
    }

    return (
        <div>
            <produit >

            
             <div className='' >
              <h2 className = "main__title"> Tous Les Produits </h2>
              <UploadFilesProduit/>
              <Link to = "/add-produit" className = "btn btn-primary mb-2" > Ajouter Produit </Link>
              <table>
                <thead>
                    <th> Numéro De Produit</th>
                    <th> Nom De Produit </th>
                    <th> Categorie </th>
                    <th> Titre</th>
                    <th> Description Courte</th>
                    <th> Description Longue </th>
                    <th> Date De L'ajout</th>
                    <th> mise a jour</th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        produits.map(
                            produit =>
                            <tr key = {produit.idPrd}> 
                                <td> {produit.idPrd} </td>
                                <td>{produit.nomPrd}</td>
                                <td>{produit.categorie}</td>
                                <td>{produit.titre}</td>
                                <td>{produit.descCourte}</td>
                                <td>{produit.descLong}</td>
                                <td>{produit.createdAt}</td>
                                <td>{produit.updatedAt}</td>
                               
                                <td>
                                    <Link className="btn btn-info" to={`/edit-produit/${produit.idPrd}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteProduit(produit.idPrd)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
        </produit>
        </div>
   
    )
}

export default ListProduit;