import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListCommentaire.css';
import CommentaireService from '../../../services/AdminService/CommentaireService';

const ListCommentaire = () => {

    const [commentaires, setCommentaire] = useState([])

    useEffect(() => {

        getAllCommentaires();
    }, [])

    const getAllCommentaires = () => {
        CommentaireService.getCommentaires().then((response) => {
            setCommentaire(response.data);
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    
    const deleteCommentaire = (commentaireId) =>{
        CommentaireService.deleteCommentaire(commentaireId).then( res => {
            this.setState({commentaires: this.state.commentaire.filter(commentaire => commentaire.commentaireId!== commentaireId)});
        });
    }

    const activeCommentaire = (commentaireId) =>{
        CommentaireService.active(commentaireId).then( res => {
        })
    }

    return (
        <div className='main__container'>
            <h2 className = "main__title"> Tous Les Reclamation </h2>
            <Link to = "/add-commantaire" className = "btn btn-primary mb-2" > Ajouter Reclamation </Link>
            <table>
            <thead>
                    <th className='th1'> Commentaire Id </th>
                    <th className='th1'> Message </th>
                    <th className='th1'> titreSujet </th>
                    <th colspan="3"> Actions </th>
                </thead>
                <tbody>
                    {
                        commentaires.map(
                            commentaire =>
                            <tr key = {commentaire.id}> 
                                <td> {commentaire.id} </td>
                                <td> {commentaire.message} </td>
                                <td>{commentaire.titresujet}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-reclamation/${commentaire.id}`} >Update</Link>
                                </td>
                                <td>
                                  <button className={commentaire.active===false ? "btn btn-warning" : "btn btn-success"} onClick = {() => activeCommentaire(commentaire.id)}
                                  style = {{marginLeft:"10px"}}> Accept</button>
                                </td>
                                <td>
                                    <button className = "btn btn-danger" onClick = {() => deleteCommentaire(commentaire.id)}
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

export default ListCommentaire;