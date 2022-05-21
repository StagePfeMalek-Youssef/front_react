import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import AdminUserService from '../../services/AdminService/AdminUserService';


const ChangeInfo = () => {

    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [datenaissance, setDatenaissance] = useState('')
    const [codepostal, setCodepostal] = useState('')
    const [telephone, setTelephone] = useState('')
    const [ville, setVille] = useState('')
    const [cin, setCin] = useState('')
    const [email, setEmail] = useState('')
    const username=sessionStorage.getItem("UserName")
    const userid=sessionStorage.getItem("UserId")
    const history = useHistory();
    const { id } = useParams();

    const ChangeInfo = (e) => {
        e.preventDefault();

        const user = { prenom, nom,datenaissance, codepostal, telephone, ville,cin,email}

       
            AdminUserService.changeInfo(username,user).then((response) => {
                history.push('/parametre')
            }).catch(error => {
                console.log(error)
            })

            
    }
    useEffect(() => {

        AdminUserService.getuserById(userid).then((response) => {
            setPrenom(response.data.prenom)
            setNom(response.data.nom)
            setDatenaissance(response.data.datenaissance)
            setCodepostal(response.data.codepostal)
            setTelephone(response.data.telephone)
            setVille(response.data.ville)
            setCin(response.data.cin)
            setEmail(response.data.email)

        }).catch(error => {
            console.log(error)
        })
    }, [])
   

   

    return (
       
            <div className="wrapper">
                <div className="title">
                              change Information
                        <div className="form">
                            
                                <div className="inputfield">
                                    <label> prenom</label>
                                    <input
                                        className='input'
                                        type="text"
                                        name="prenom"
                                        
                                        value={prenom}
                                        onChange={(e) => setPrenom(e.target.value)}
                                    >
                                    </input>
                                </div>

                                  
                                <div className="inputfield">
                                    <label> Nom</label>
                                    <input
                                        className='input'
                                        type="text"
                                        name="nom"
                                        
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                    >
                                    </input>
                                </div>

                               


                                <div className="inputfield">
                                    <label> datenaissance</label>
                                    <input
                                        className='input'
                                        type="datetime"
                                        name="datenaissance"
                                        
                                        value={datenaissance}
                                        onChange={(e) => setDatenaissance(e.target.value)}
                                    >
                                    </input>
                                </div>



                                <div className="inputfield">
                                    <label> code postal</label>
                                    <input
                                        className='input'
                                        type="number"
                                        name="codepostal"
                                        
                                        value={codepostal}
                                        onChange={(e) => setCodepostal(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="inputfield">
                                    <label> telephone </label>
                                    <input
                                        type="number"
                                        className='input'
                                        name="telephone"
                                        
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="inputfield">
                                    <label> Ville </label>
                                    <input
                                        type="text"
                                        className='input'
                                        name="ville"
                                        
                                        value={ville}
                                        onChange={(e) => setVille(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="inputfield">
                                    <label> Cin </label>
                                    <input
                                        type="number"
                                        className='input'
                                        name="cin"
                                        
                                        value={cin}
                                        onChange={(e) => setCin(e.target.value)}
                                    >
                                    </input>
                                </div>

                                
                                <div className="inputfield">
                                    <label> email </label>
                                    <input
                                        type="Email"
                                        className='input'
                                        name="email"
                                        
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>
                                
                                
                            <div className='inputfield'>
                                <button className="btn btn-success" onClick={(e) => ChangeInfo(e)} >Envoyer </button>
                                <Link to="/parametre" className="btn btn-secondary" style = {{marginLeft:"10px", color:"grren"}}> Annuler </Link>
                                </div>
                            </div>

                        </div></div>
    )
}

export default ChangeInfo;