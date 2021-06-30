import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from '../../services/index'
import { useSelector } from 'react-redux'

function Reset2() {
    const IdDocument = useSelector(state => state.reset)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [erroPassword, setErrorPassword] = useState(false)
    const [messagePassword, setMessagePassword] = useState('')

    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if (!password || !confirmPassword) {
                setMessagePassword('Enter password and / or password confirmation')
                setErrorPassword(true)
            } else {
                setErrorPassword(false)
            }
            if ((password === confirmPassword)) {
                if (password !== '') {
                    if (password.length >= 6 && password.length <= 21) {
                        setErrorPassword(false)
                    } else {
                        setMessagePassword('Enter password with 6 to 21 characters')
                        setErrorPassword(true)
                    }
                }
            } else {
                setMessagePassword('Passwords do not match')
                setErrorPassword(true)
            }
            if (erroPassword === false) {
                console.log(IdDocument)
                const request = await axios.put('/reset',{IdDocument,password,confirmPassword})
                history.push('/sucess')
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder="Password"
                                                name="password" value={password} onChange={e => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Password Confirmation</label>
                                            <input type="password" className="form-control" placeholder="Password"
                                                name="passwordConfirmation" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <div className={"text-danger " + (!erroPassword ? "d-none" : "")}>
                                                {messagePassword}
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" className="btn btn-success btn-block">Reset</button>
                                        </div>
                                    </form>
                                    <div class="new-account mt-3">
                                        <p class="mb-1">Don't Received? </p>
                                        <Link class="text-primary" to={"./reset"}>Resend </Link>
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

export default Reset2;