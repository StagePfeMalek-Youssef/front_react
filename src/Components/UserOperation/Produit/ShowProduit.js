import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProduitsService from '../../../services/AdminService/ProduitsService';


const ShowProduit = () => {

    const [produits, setProduits] = useState([])
    const  username=sessionStorage.getItem("UserName");
    useEffect(() => {

        getAllProduits();
    }, [])

    const getAllProduits = () => {
        ProduitsService.getAllProduitsByUsername(username).then((response) => {
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
           

            
             <div className='main__container' >
              <h2 className = "main__title"> Tous Les Produits </h2>

              {
                    produits.map(
                        produit=>
                        <section className="sujet">
                        <article>
                        <div key = {produit.idPrd}> 
                        <p>le tittre de produittd {produit.titre}
                            le numereau de produit {produit.idPrd}  et le nom de produit {produit.nomPrd} crier a {produit.createdAt}
                            {produit.descLong}
                            <div className="btn btn-outline-primary">{produit.username}</div>
                            <br></br>
                        <Link className="btn btn-info" to={`/edit-produit-user/${produit.idPrd}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteProduit(produit.idPrd)}
                                    style = {{marginLeft:"10px"}}> Delete</button>

              </p>
                        </div>
                        </article></section>
                    )
                }
              
        </div>
        </div>
   
    )
}

export default ShowProduit;