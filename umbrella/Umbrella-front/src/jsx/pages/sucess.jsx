import React from 'react';
import {Link} from 'react-router-dom';
function Sucess() {
    return (
        <>
            <div class="authincation section-padding">
                <div class="container h-100">
                    <div class="row justify-content-center h-100 align-items-center">
                        <div class="col-xl-5 col-md-6">
                            <div class="auth-form card">
                                <div class="card-header justify-content-center">
                                    <h4 class="card-title">Autenticação concluída com sucesso</h4>
                                </div>
                                <button type="submit" className="btn btn-success btn-block">
                                    <Link to={"./dashboard"}>Entrar na dashboard</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sucess;
