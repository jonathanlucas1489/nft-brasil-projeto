import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/index'
import { useHistory } from "react-router-dom";


function Forgot() {
    const [email, setEmail] = useState('')
    const [erroEmail, setErroEmail] = useState(false)

    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!email) {
                setErroEmail(true)
            } else {
                setErroEmail(false)
            }
            if (erroEmail === false) {
                const request = await axios.post('/forgot',{email})
                console.log(request)
                history.push('/confirmDataReset')
            }
        } catch {

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
                                    <h4 class="card-title">Redefinir senha</h4>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)} />

                                        </div>
                                        <div class="form-group">
                                            <div className={"text-danger " + (!erroEmail ? "d-none" : "")}>
                                                Inserir Email
                                            </div>
                                        </div>
                                        <div class="text-center">

                                            <button type="submit" className="btn btn-success btn-block">Solicitar redefinição</button>
                                        </div>
                                    </form>
                                    <div class="new-account mt-3">
                                        <Link class="text-primary" to={"./signin"}>Voltar para login </Link>
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

export default Forgot;