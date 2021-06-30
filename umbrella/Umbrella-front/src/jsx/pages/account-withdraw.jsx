import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Row, Col, Card } from 'react-bootstrap';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import Footer2 from '../layout/footer2';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import axios from '../../services/index'
import {useSelector, useDispatch} from 'react-redux'
import Moment from 'react-moment';
import PerfectScrollbar from 'react-perfect-scrollbar'
import CurrencyFormat from 'react-currency-format';
import {Tab, Nav, Form, Row, Col} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function AccountWithdraw() {
const currencies = []
currencies[0] = 'BRL'
currencies[1] = 'BTC'
currencies[2] = 'LTC'
currencies[825] = 'USD'
currencies[1027] = 'ETH'
currencies[12345] = 'IDSUEX'
    const {t} = useTranslation()
    const [history, setHistory] = useState([])
    const [quantity, setQuantity] = useState()
    const [type, SetType] = useState()
    const user = useSelector(state => state.user)
    const hist = useHistory()

    const getHistory = async () => {
        try {
            const history = (await axios.get(`/payment/${
                user.id
            }`))
            setHistory(history.data.reverse())
            return history
        } catch (err) {
            return err.response
        }
    }

    const handleDeposit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                id: user.id,
                value: quantity,
                type: type
            }
            const payment = (await axios.post(`/payment`, data))
            console.log(payment)
            if(payment.Error) {
                console.log("Deu erro")
            } else {
                hist.push('./account-deposit')
            }
            return payment
        } catch (err) {
            return err.response
        }
    }
    useEffect(async () => {
        await getHistory()
    }, [])

    return (
        <>
            <Header2 />
            <Sidebar />
            <div class="content-body">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">{t('Deposit')}</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row justify-content-center">
                                        <div class="col-xl-8">
                                            <form action="#" class="py-5">
                                                <div class="form-group row align-items-center">
                                                    <div class="col-sm-4">
                                                        <label for="inputEmail3" class="col-form-label">{t('Value')}
                                                        <br />
                                                            <small>{t('Please check double to make sure')}</small>
                                                        </label>
                                                    </div>
                                                    <div class="col-sm-8">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <label class="input-group-text bg-primary" style={{color:'white'}}>
                                                                    R$ </label>
                                                            </div>
                                                            <input type="text" 
                                                                name="currency_amount"
                                                                value={quantity}
                                                                class="form-control text-right"
                                                                placeholder="0"
                                                                autocomplete="off"
                                                                onChange={
                                                                    (text) => {
                                                                        setQuantity(text.target.value)
                                                                    }
                                                             }/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row align-items-center">
                                                        <div class="form-check" style={{margin: 20}}>
                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onClick={() => {    
                                                        SetType('pix')
                                                        }}/>
                                                            <label class="form-check-label" for="exampleRadios1">
                                                                {t('Pix')}
                                                            </label>
                                                        </div>
                                                        <div class="form-check" style={{margin: 20}}>
                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onClick={() => {    
                                                        SetType('boleto_express')
                                                        }}
                                                         />
                                                            <label class="form-check-label" for="exampleRadios2">
                                                              {t('Bank Deposit')}
                                                            </label>
                                                        </div>
                                                        <div class="form-check" style={{margin: 20}}>
                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"  onClick={() => {    
                                                        SetType('boleto_express')
                                                        }}/>
                                                            <label class="form-check-label" for="exampleRadios2">
                                                             {t('PicPay')}
                                                            </label>
                                                        </div>
                                                        <div class="form-check" style={{margin: 20}}>
                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"  onClick={() => {    
                                                        SetType('boleto_express')
                                                        }}/>
                                                            <label class="form-check-label" for="exampleRadios2">
                                                            {t('Credit Card')}
                                                            </label>
                                                        </div>
                                                        <div class="form-check" style={{margin: 20}}>
                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"  onClick={() => {    
                                                        SetType('boleto_express')
                                                        }}/>
                                                            <label class="form-check-label" for="exampleRadios2">
                                                            {t('BankSlip')}
                                                            </label>
                                                        </div>
                                                </div>
                                                <div class="text-right">
                                                <div className="signin-btn">
                                                    <button className="btn btn-success btn-block" onClick={handleDeposit}>
                                                        {t('Deposit now')}
                                                    </button>
                                                </div>                                    
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-xxl-12">
                        <Tab.Container defaultActiveKey="open-position">
                            <div class="card">
                                <div class="card-header">
                                    <Nav variant="pills">
                                        <Nav.Link eventKey="open-position">
                                            {
                                            t('Deposit History')
                                        }</Nav.Link>
                                    </Nav>
                                </div>
                                <PerfectScrollbar>
                                    <div class="card-body open-position-table">
                                        <div class="market-history market-order">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="open-position">
                                                    <div class="table-responsive">
                                                        <table class="table table-striped" id="tbUser">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">
                                                                        {t('ID')}
                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Size')}
                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Average price')}
                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Final Value')}
                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Description')}
                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Time')}
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {history.map(order => (
                                                                <tr>
                                                                    <th scope="row">
                                                                        {order.id}
                                                                    </th>
                                                                    <td>{order.quantity} {currencies[order.outputType]}</td>
                                                                    <td><CurrencyFormat value={order.priceMedia} decimalScale={2} displayType={'text'} thousandSeparator={true} /> {currencies[order.inputType]}</td>
                                                                    <td><CurrencyFormat value={order.finalValue} decimalScale={2} displayType={'text'} thousandSeparator={true} /> {currencies[order.inputType]}</td>
                                                                    <td>{order.description} </td>
                                                                    <td><Moment format="DD/MM/YY - HH:mm">
                                                                    {order.createdAt}
                                                                     </Moment></td>
                                                                </tr>
                                                                ))}
                                                             </tbody>
                                                        </table>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </div>
                                    </div>
                                </PerfectScrollbar>
                            </div>
                        </Tab.Container>
                    </div>
                    </div>
                </div>
            </div>
            <Footer2 />
        </>
    )
}
export default AccountWithdraw;