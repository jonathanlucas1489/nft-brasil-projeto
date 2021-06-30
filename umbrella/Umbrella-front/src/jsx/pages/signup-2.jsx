import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import axios from '../../services/index'
import { useHistory } from "react-router-dom";
import {User} from '../store/User/User.action'

function Signup2() {
    const user = useSelector(state => state.create)
    const [IdDocument, setIdDocument] = useState('')
    const [telephone, setTelephone] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')

    const [erroIdDocument, setErroIdDocument] = useState(false)
    const [erroTelephone, setErroTelephone] = useState(false)
    const [erroMobile, setErrorMobile] = useState(false)
    const [erroEmail, setErrorEmail] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()

    const number = new RegExp('^[0-9]+$')

    const handleIdDocument = async(e)=>{
        if(number.test(e)){
            setIdDocument(e)
        }
        if(e===''){
            setIdDocument(e)
        }
    }
    const handleTelephone = async(e)=>{
        if(number.test(e)){
            setTelephone(e)
        }
        if(e===''){
            setTelephone(e)
        }

    }
    const handleMobile = async(e)=>{
        if(number.test(e)){
            setMobile(e)
        }
        if(e===''){
            setMobile(e)
        }
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!IdDocument){
            setErroIdDocument(true)
        }else{
            setErroIdDocument(false)
        }

        if(!telephone){
            setErroTelephone(true)
        }else{
            setErroTelephone(false)
        }

        if(!mobile){
            setErrorMobile(true)
        }else{
            setErrorMobile(false)
        }
        if(!email){
            setErrorEmail(true)
        }else{
            setErrorEmail(false)
        }
        if(erroEmail===false && erroIdDocument===false && erroMobile===false && erroTelephone===false){
            user.email = email
            user.mobile=mobile
            user.telephone = telephone
            user.IdDocument = IdDocument
            try{
                const cadastro = (await axios.post('/user/register',user)).data
                console.log(cadastro)
                dispatch(User(cadastro.member))
                history.push('/confirmEmail')
            }catch(err){
                console.log(err.response.data)
            }
            
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
                                    <h4 class="card-title">Sign up your account</h4>
                                </div>
                                <div class="card-body">
                                    <form method="post" name="myform" class="signup_validate" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label>IDDocument</label>
                                            <input type="text" class="form-control" placeholder="29382938"
                                                name="iddocument"
                                                value={IdDocument} onChange={e => handleIdDocument(e.target.value)}
                                                 />
                                        </div>
                                        <div className={"text-danger "+(!erroIdDocument?"d-none":"")}>
                                       insert  IDDocument
                                        </div>
                                        <div class="form-group">
                                            <label>Telephone</label>
                                            <input type="text" class="form-control" placeholder="32323-23232"
                                                name="telephone" 
                                                value={telephone} onChange={e => handleTelephone(e.target.value)}
                                                />
                                        </div>
                                        <div className={"text-danger "+(!erroTelephone?"d-none":"")}>
                                       insert  phone
                                        </div>
                                        <div class="form-group">
                                            <label>Mobile</label>
                                            <input type="text" class="form-control" placeholder="(83) 9 98232-9382"
                                                name="mobile"
                                                value={mobile} onChange={e => handleMobile(e.target.value)}
                                                 />
                                        </div>
                                        <div className={"text-danger "+(!erroMobile?"d-none":"")}>
                                       insert mobile phone
                                        </div>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="text" class="form-control" placeholder="exempl@gmail.com"
                                                name="email" 
                                                value={email} onChange={e => setEmail(e.target.value)}
                                                />
                                        </div>
                                        <div className={"text-danger "+(!erroEmail?"d-none":"")}>
                                       insert Email
                                        </div>
                                        <div class="text-center mt-4">
                                        <button type="submit" className="btn btn-success btn-block">Sign up</button>
                                        </div>
                                    </form>
                                    <div class="new-account mt-3">
                                        <p>Already have an account? <Link class="text-primary" to={"/signin"}>Sign in</Link>
                                        </p>
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

export default Signup2;