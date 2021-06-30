import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/index'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Document } from '../store/Reset/Reset.action'

function Reset() {
    const [ code,setCode] = useState('')
    const [IdDocument,setIdDocument] =useState('')

    const[ erroCode,setErroCode] = useState(false)
    const [erroIdDocument,setErroIdDocument]= useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const number = new RegExp('^[0-9]+$')

    const handleIdDocument = async(e)=>{
        if(number.test(e)){
            setIdDocument(e)
        }
        if(e===''){
            setIdDocument(e)
        }
    }

    const  handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            if(!erroCode){
                setErroCode(true)
            }else{
                setErroCode(false)
            }

            if(!erroIdDocument){
                setErroIdDocument(true)
            }else{
                setErroIdDocument(false)
            }

            if(erroCode===false && erroIdDocument===false){
                const request = await axios.post('/resetConfirmData',{token:code,IdDocument})
                dispatch(Document(IdDocument))
                history.push('/reset')
            }
        }catch(err){
            console.log(err.response.data)
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
                                    <h4 class="card-title">Reset password</h4>
                                </div>
                                <div class="card-body">
                                    <form  onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label>ID Document</label>
                                            <input type="text" class="form-control"  value={IdDocument} onChange={e => handleIdDocument(e.target.value)}/>
                                        </div>
                                        <div class="form-group">
                                            <div className={"text-danger " + (!erroIdDocument ? "d-none" : "")}>
                                                Insert ID Document
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Code</label>
                                            <input type="text" class="form-control"  value={code} onChange={e => setCode(e.target.value)}/>
                                        </div>
                                        <div class="form-group">
                                            <div className={"text-danger " + (!erroCode ? "d-none" : "")}>
                                                Insert Code
                                            </div>
                                        </div>
                                        <div class="text-center">
                                        <button type="submit" className="btn btn-success btn-block">Next</button>
                                        </div>
                                    </form>
                                    <div class="new-account mt-3">
                                        <p class="mb-1">Don't Received? </p>
                                        <Link class="text-primary" to={"./forgot"}>Resend </Link>
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

export default Reset;