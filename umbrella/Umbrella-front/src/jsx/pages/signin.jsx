import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/index'
import {useDispatch} from 'react-redux'
import {User} from '../store/User/User.action'
import { useHistory } from "react-router-dom";

function Signin() {

    const[login,setLogin] = useState('')
    const[password,setPassword] = useState('')
    const[validation,setValidation] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const user = (await axios.post('/login',{login,password})).data
            if(user.Error) {
                setValidation(user.Error)
            } else {
                dispatch(User(user))
                if(user.emailValidate){ 
                    history.push('/dashboard')
                }else{
                    history.push('/confirmEmail')
                }  
            }
        } catch(err){

        }
    }
    return (
        <>
            <div class="authincation section-padding">
                <div class="container h-100">
                    <div class="row justify-content-center h-100 align-items-center">
                        <div class="col-xl-5 col-md-6">
                            <div class="mini-logo text-center my-5">
                                <Link to={"./"}><img src={require("../../images/logo.png")} alt="" /></Link>
                            </div>
                            <div class="auth-form card">
                                <div class="card-header justify-content-center">
                                    <h4 class="card-title">Sign in</h4>   
                                </div>  
                                <div class="card-header justify-content-center">
                                    <h4 class="card-title">{validation}</h4>
                                </div>
                                <div class="card-body">
                                    <form method="post" name="myform" class="signin_validate" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="text" class="form-control" placeholder="barack@obama.com"
                                                name="login" 
                                                value={login} onChange={e => setLogin(e.target.value)}
                                                />
                                        </div>
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input type="password" class="form-control" placeholder="Password"
                                                name="password" 
                                                value={password} onChange = {e => setPassword(e.target.value)}
                                                />
                                        </div>
                                        <div class="form-row d-flex justify-content-between mt-4 mb-2">
                                            <div class="form-group mb-0">
                                                <label class="toggle">
                                                    <input class="toggle-checkbox" type="checkbox" />
                                                    <span class="toggle-switch"></span>
                                                    <span class="toggle-label">Remember me</span>
                                                </label>
                                            </div>
                                            <div class="form-group mb-0">
                                                <Link to={"./forgot"}>Forgot Password?</Link>
                                            </div>
                                        </div>
                                        <div class="text-center">
                                        <button type="submit" className="btn btn-success btn-block">Sign in </button>
                                        </div>
                                    </form>
                                    <div class="new-account mt-3">
                                        <p>Don't have an account? <Link class="text-primary" to={"./signup/createUser"}>Sign
                                        up</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;