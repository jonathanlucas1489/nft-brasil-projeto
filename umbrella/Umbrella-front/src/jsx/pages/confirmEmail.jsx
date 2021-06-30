import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import axios from '../../services/index'
import {User} from '../store/User/User.action'
import { useHistory } from "react-router-dom";


function ConfirmEmail() {
    const [token,setToken] = useState('')
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(async () => {
        try{
            await axios.post('/validateEmail',{email:user.email})
        }catch(err){
            console.log(err)
        }
      },[]);
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const result = (await axios.post('/confirmEmail',{IdDocument:user.IdDocument,token})).data
            if(result.sucess){
                dispatch(User(result.user))
                history.push('/sucess')
            }
        }catch(err){
            history.push('/failed')
        }
    }
    return (
        <>
            <div class="authincation section-padding">
                <div class="container h-100">
                    <div class="row justify-content-center h-100 align-items-center">
                        <div class="col-xl-5 col-md-6">
                            <div class="auth-form card">
                                <div class="card-header justify-content-center">
                                    <h4 class="card-title">Confirm Email</h4>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label>Enter the code sent to the email: {user.email}</label>
                                            <input type="text" class="form-control"  placeholder="Codigo de confirmação"value={token} onChange={e => setToken(e.target.value)}/>
                                        </div>
                                        <div class="text-center">
                                        <button type="submit" className="btn btn-success btn-block">Confirm </button>
                                        </div>
                                    </form>
                                    <div class="new-account mt-3">
                                        <p class="mb-1">Don't Received? </p>
                                        <Link class="text-primary" to={"./confirmEmail"}>Resend </Link>
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

export default ConfirmEmail;