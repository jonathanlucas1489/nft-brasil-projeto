import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from '../../services/index'
import { useDispatch } from 'react-redux'
import { createUser } from '../store/Create/Create.action'
function Signup1() {
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [erroName, setErrorName] = useState(false)
    const [erroUserName, setErrorUserName] = useState(false)
    const [erroPassword, setErrorPassword] = useState(false)

    const [messageName, setMessageName] = useState('')
    const [messageUserName, setMessageUserName] = useState('')
    const [messagePassword, setMessagePassword] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const handleFirstName=async (e)=>{
        if(!/[0-9]/g.test(e)){
            setFirstName(e)
        }

    }

    const handleSecondName=async (e)=>{
        if(!/[0-9]/g.test(e)){
            setSecondName(e)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!firstName || !secondName) {
            setMessageName('Enter first name and/or second name')
            setErrorName(true)
        }
        else {
            setErrorName(false)
        }
        if (!userName) {
            setMessageUserName('Enter user name')
            setErrorUserName(true)
        }
        else {
            setErrorUserName(false)
        }
        if (!password || !confirmPassword) {
            setMessagePassword('Enter password and / or password confirmation')
            setErrorPassword(true)
        } else {
            setErrorPassword(false)
        }
        if ((password === confirmPassword) && (password !== '')) {
            if (password.length >= 6 && password.length <= 21) {
                setErrorPassword(false)
            }else{
                setMessagePassword('Enter password with 6 to 21 characters')
                setErrorPassword(true)
            }

        } else {
            setMessagePassword('Passwords do not match')
            setErrorPassword(true)
        }
        if(erroName===false && erroPassword===false && erroUserName===false){
                const user = { firstName, secondName, login:userName, password }
                console.log(user)
                const result = (await axios.get(`username/${userName}`)).data
                if (!result.login) {
                    setErrorUserName(false)
                    dispatch(createUser(user))
                    history.push('/signup/personaldetails')
                } else {
                    setMessageUserName('User Name is already in use')
                    setErrorUserName(true)
                }
        }
    }

    return (
        <>
            <div className="authincation section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center my-5">
                                <Link to={"./"}><img src={require("../../images/logo.png")} alt="" /></Link>
                            </div>
                            <div className="auth-form card">
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">Sign up your account</h4>
                                </div>
                                <div className="card-body">
                                    <form method="post" name="myform" className="signup_validate " onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label >Name</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control " placeholder="First Name" name="username" value={firstName} onChange={e => handleFirstName(e.target.value)} />
                                                <input type="text" className="form-control" placeholder="Second Name" name="username" value={secondName} onChange={e => handleSecondName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className={"text-danger " + (!erroName ? "d-none" : "")}>
                                            {messageName}
                                        </div>
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" className="form-control" placeholder="umbrellaExchange"
                                                name="username" value={userName} onChange={e => setUsername(e.target.value)} />
                                        </div>
                                        <div className={"text-danger " + (!erroUserName ? "d-none" : "")}>
                                            {messageUserName}
                                        </div>
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
                                        <div className={"text-danger " + (!erroPassword ? "d-none" : "")}>
                                            {messagePassword}
                                        </div>
                                        <div className="text-center mt-4">
                                            <button type="submit" className="btn btn-success btn-block">Next</button>
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>Already have an account? <Link className="text-primary" to={"../signin"}>Sign in</Link>
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

export default Signup1;