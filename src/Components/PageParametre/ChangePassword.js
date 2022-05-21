import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import AdminUserService from '../../services/AdminService/AdminUserService';


const ChangePassword = () => {


    const username=sessionStorage.getItem("UserName")
  
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const history = useHistory();
    const { id } = useParams();

   const UpdatePassword= (e) =>{
        e.preventDefault();
        const user = { newPassword, oldPassword }
        AdminUserService.changePassword(username,user).then((response) => {
          history.push('/parametre')
        }).catch(error => {
            console.log(error)
        })  
    }

    

    return (
       
            <div className="wrapper">
                <div className="title">
                             Change mot de passe
                        <div className="form"> 
                            
                                <div className="inputfield">
                                    <label> ancien mot de passe </label>
                                    <input
                                        type="password"
                                        className='input'
                                        name="password"
                                        
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="inputfield">
                                    <label> Nouveau mot de passe </label>
                                    <input
                                        type="password"
                                        className='input'
                                        name="password"
                                        
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    >
                                    </input>
                                </div>

                                
                            <div className='inputfield'>
                                <button className="btn btn-success" onClick={(e) => UpdatePassword(e)} >Envoyer </button>
                                <Link to="/parametre" className="btn btn-secondary" style = {{marginLeft:"10px", color:"grren"}}> Annuler </Link>
                                </div>
                            </div>

                        </div></div>
    )
}

export default ChangePassword;