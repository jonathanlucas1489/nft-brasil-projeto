import React, {useEffect, useState, componentDidMount, render} from 'react';
import {Link} from 'react-router-dom';
import {Tab, Nav} from 'react-bootstrap';
import axios from '../../services/index'
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import Footer2 from '../layout/footer2';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import TradingViewWidget, {Themes} from 'react-tradingview-widget';
/*import RangeSlider from '../element/range-slider';
import 'react-rangeslider/lib/index.css'*/
import {useSelector, useDispatch} from 'react-redux'
import {useTranslation} from "react-i18next";
import CurrencyFormat from 'react-currency-format';
import OrderModal from '../element/Ordermodal'
import Moment from 'react-moment';

function Dashboard() {
    const {t} = useTranslation()
    const user = useSelector(state => state.user)
    const currencies = []
    currencies[0] = 'BRL'
    currencies[1] = 'BTC'
    currencies[2] = 'LTC'
    currencies[825] = 'USD'
    currencies[1027] = 'ETH'
    currencies[12345] = 'IDX'
    const [currencyTrade, setCurrencyTrade] = useState('BTCBRL')
    const [currency, setCurrency] = useState(12345)
    const [secondary, setsecondary] = useState(0)
    const [value, setValue] = useState()
    const [variation, setVaraiation] = useState()
    const [marketcap, setMarketCap] = useState()
    const [hourVariation, setHourVariation] = useState()
    const [thourVariation, setTHourVariation] = useState()
    const [balance, setBalance] = useState()
    const [lastModify, setLastModify] = useState()
    const [quantity, setQuantity] = useState(0)
    const [history, setHistory] = useState([])
    const [currentHistory, setCurrentHistory] = useState([])
    const [balanceBRL, setBalanceBRL] = useState()
    const [lastModifyBRL, setLastModifyBRL] = useState()
    const [show, setShow] = useState(false);
    const [operationProps] = useState({});

    const getHistory = async () => {
        try {
            const history = (await axios.get(`/order/${
                user.id
            }`))
            setHistory(history.data.reverse())
            return history
        } catch (err) {
            return err.response
        }
    }
    const getCurrentHistory = async (currency) => {
        try {
            const history = (await axios.get(`/order/${
                user.id
            }/${currency}`))
            setCurrentHistory(history.data.output)
        return history
        } catch (err) {
            return err.response
        }
    }
    const getBalances = async (currency) => {
        try {
            const balance = (await axios.get(`/wallet/${currency}/${
                user.id
            }`)).data
            setBalance(balance.wallet.balance)
            setBalanceBRL(balance.walletBRL.balance)
            setLastModify(balance.wallet.updatedAt)
            setLastModifyBRL(balance.walletBRL.updatedAt)
            return balance
        } catch (err) {
            return err.response
        }
    }
    const getPrices = async (currency) => {
        try {
            const prices = (await axios.get(`/price`)).data
            const currentPrice = prices.filter(e => {
                return e.coin === currency
            })
            setValue(currentPrice[0].price)
            setVaraiation(currentPrice[0].daily_volume)
            setMarketCap(currentPrice[0].market_cap)
            setHourVariation(currentPrice[0].percent_change)
            setTHourVariation(currentPrice[0].daily_percent_change) 
            return prices
        } catch (err) {
            return err.message
        }
    }
    const handleBuy = async (e) => {
        e.preventDefault()
        try {
            if(quantity > 0) {
                const data = {
                    description: `${
                        e.target.value
                    } ${
                        currencies[currency]
                    }`,
                    uid: user.id,
                    type: `${
                        e.target.value
                    }`,
                    status: 1,
                    priceMedia: value,
                    finalValue: value * quantity,
                    quantity: parseFloat(quantity),
                    tax: null,
                    dispare: null,
                    inputType: secondary,
                    outputType: currency
                }
                const order = (await axios.post(`/order`, data))
                operationProps.operationStatus = true
                operationProps.header = t('Order placed')
                operationProps.body = e.target.value === 'buy' ? 
                    `${t('You bought')} ${quantity} ${currencies[currency]}`
                    : 
                    `${t('You sold')} ${quantity} ${currencies[currency]}`
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 6000)
                await getBalances(currency)
                await getHistory()
                return order
            } else {
                operationProps.operationStatus = false
                operationProps.header = t('Order not placed')
                operationProps.body = t('Order value must be greater than 0')
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 6000)
                return true
            }
        } catch (err) {
            operationProps.operationStatus = false
            operationProps.header = t('Order not placed')
            operationProps.body = t('Insufficient funds')
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 6000)
            return err        
        }
    }
    useEffect(async () => {
        await getPrices(currency)
    }, [getPrices, currency])

    useEffect(async () => {
        await getBalances(currency)
    }, [currency])
    
    useEffect(async () => {
        await getHistory()
    }, [])

    useEffect(async () => {
        await getCurrentHistory(currency)
    }, [currency])
    return (
        <>
            <Header2/>
            <OrderModal show={show}  operationProps={operationProps} /> 
            <Sidebar/>
            <div class="content-body" id="dashboard">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-6 col-xxl-12 col-lg-12 col-xxl-6">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">
                                        {currencyTrade}</h4>
                                    <span>{
                                        t('24h Change')
                                    }: <strong class="text-success">
                                            {thourVariation} %</strong>
                                    </span>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                t('Index Price')
                                            }</p>
                                            <h6>
                                               <CurrencyFormat value={value} decimalScale={2} displayType={'text'} thousandSeparator={true} /> {currencies[secondary]}
                                           </h6>
                                        </div>
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                t('24h Change')
                                            }</p>
                                            <h6>{thourVariation} %</h6>
                                        </div>
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                t('1h Change')
                                            }</p>
                                            <h6>{hourVariation} %</h6>
                                        </div>
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                t('Market Cap')
                                            }</p>
                                            <h6><CurrencyFormat value={marketcap} decimalScale={2} displayType={'text'} thousandSeparator={true} /> </h6>
                                        </div>
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                t('24h Volume')
                                            }</p>
                                            <h6><CurrencyFormat value={variation} decimalScale={2} displayType={'text'} thousandSeparator={true} /> </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-xxl-6 col-lg-6 col-xxl-3">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">
                                        {
                                        t('Your wallet')
                                    }: {
                                        currencies[secondary]
                                    }</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                t('Balance')
                                            }</p>
                                            <h6>
                                            <CurrencyFormat value={balanceBRL} decimalScale={2} displayType={'text'} thousandSeparator={true} />  {currencies[secondary]}
                                            </h6>
                                        </div>
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                t('Last Modify')
                                            }</p>
                                            <h6><Moment format="DD/MM/YY - HH:mm">
                                            {lastModifyBRL}
                                            </Moment></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-xxl-6 col-lg-6 col-xxl-3">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">
                                        {
                                        t('Your wallet')
                                    }: {
                                        currencies[currency]
                                    }</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                t('Balance')
                                            }</p>
                                            <h6>
                                                {balance} {currencies[currency]}
                                                </h6>
                                        </div>
                                        <div class="col-xl col-lg col-md col-sm-auto col-6">
                                            <p class="mb-0">
                                                {
                                                t('Last Modify')
                                            }</p>
                                            <h6><Moment format="DD/MM/YY - HH:mm">
                                            {lastModify}
                                            </Moment></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-xs-4">
                            <Tab.Container defaultActiveKey="market">
                                <div class="card">
                                    <div class="card-header">
                                        <Nav variant="pills">
                                            <Nav.Link eventKey="market">
                                                {
                                                t('Market')
                                            }</Nav.Link>
                                        </Nav>
                                    </div>
                                    <div class="card-body market-limit">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="market">
                                                <form method="post" name="myform" class="currency_limit">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">
                                                                    {currencies[currency]}</span>
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
                                                <ul class="list-group market-nested">
                                                    <li class="list-group-item border-0 px-0 py-1 d-flex justify-content-between align-items-center">
                                                        {t('Size in')}  {currencies[secondary]}
                                                        <span class="strong">
                                                        <CurrencyFormat value={quantity * value} decimalScale={2} displayType={'text'} thousandSeparator={true} />  {currencies[secondary]}</span>
                                                    </li>
                                                    <li class="list-group-item border-0 px-0 py-1 d-flex justify-content-between align-items-center">
                                                        {t('Average price')}
                                                        <span class="strong">
                                                        <CurrencyFormat value={value} decimalScale={2} displayType={'text'} thousandSeparator={true} />  {currencies[secondary]}
                                                        </span>
                                                    </li>
                                                    <li class="list-group-item border-0 px-0 py-1 d-flex justify-content-between align-items-center">
                                                        {
                                                        t('Balance')
                                                    }
                                                        <span class="strong">
                                                        <CurrencyFormat value={balanceBRL} decimalScale={2} displayType={'text'} thousandSeparator={true} />  {currencies[secondary]}
                                                        </span>
                                                    </li>
                                                </ul>
                                                <div class="btn-group btn-block mt-3">
                                                    <button type="submit" name="submit" class="btn btn-success" value="buy"
                                                        onClick={handleBuy}>
                                                        {
                                                        t('Buy Now')
                                                    }</button>
                                                    <button type="submit" name="submit" class="btn btn-danger" value="sell"
                                                        onClick={handleBuy}>
                                                        {
                                                        t('Sell Now')
                                                    }</button>
                                                </div>
                                            </form>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </div>
                            </div>
                        </Tab.Container>
                    </div>
                    <div class="col-lg-5 col-md-4 col-xs-5">
                        <div class="tradingview-widget-container card"
                            style={
                                {"height": "460px"}
                        }>
                            {
                            < TradingViewWidget
                            symbol = {
                                currencyTrade
                            }
                            theme = {
                                Themes.DARK
                            }
                            locale = "pt"
                            autosize
                            />
                        } </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-3">
                        <Tab.Container defaultActiveKey="IDSUEX">
                            <div class="card">
                                <div class="card-header">
                                    <Nav variant="pills">
                                    <Nav.Link eventKey="IDSUEX" 
                                                onClick={
                                                    async() => {
                                                        setCurrencyTrade("USDBRL")
                                                        setCurrency(12345)
                                                        await getPrices(currency, secondary, currencies)
                                                        }}>IDSUEX</Nav.Link>
                                        <Nav.Link eventKey="BTC"
                                            onClick={
                                                async () => {  
                                                    setCurrencyTrade("BTCBRL")
                                                    setCurrency(1)
                                                    await getPrices(currency, secondary, currencies)
                                                }
                                        }>BTC</Nav.Link>
                                        <Nav.Link eventKey="ETH"
                                            onClick={
                                                async () => {
                                                    setCurrencyTrade("ETHBRL")
                                                    setCurrency(1027)
                                                    await getPrices(currency, secondary, currencies)
                                                }
                                        }>ETH</Nav.Link>
                                        <Nav.Link eventKey="LTC"
                                            onClick={
                                                async () => {
                                                    setCurrencyTrade("LTCBRL")
                                                    setCurrency(2)
                                                    await getPrices(currency, secondary, currencies)
                                                }
                                        }>LTC</Nav.Link>
                                        <Nav.Link eventKey="USD"
                                            onClick={
                                                async () => {
                                                    setCurrencyTrade("USDBRL")
                                                    setCurrency(825)
                                                    await getPrices(currency, secondary, currencies)
                                                }
                                        }>USD</Nav.Link>
                                    </Nav>
                                </div>
                                <PerfectScrollbar>
                                    <div class="card-body  price-pair">
                                        <Tab.Content>
                                        <Tab.Pane eventKey="IDSUEX">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>{
                                                                t('Pairs')
                                                            }</th>
                                                            <th>{
                                                                t('Last Price')
                                                            }</th>
                                                            <th>{
                                                                t('Change')
                                                            }</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>IDX/BRL</td>
                                                            <td><CurrencyFormat value={value} decimalScale={2} displayType={'text'} thousandSeparator={true} />  {currencies[secondary]}</td>
                                                            <td class="red">
                                                                {thourVariation}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="BTC">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>{
                                                                t('Pairs')
                                                            }</th>
                                                            <th>{
                                                                t('Last Price')
                                                            }</th>
                                                            <th>{
                                                                t('Change')
                                                            }</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{currencies[currency]}/{currencies[secondary]}</td>
                                                            <td><CurrencyFormat value={value} decimalScale={2} displayType={'text'} thousandSeparator={true} />  {currencies[secondary]}</td>
                                                            <td class="red">
                                                                {thourVariation}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="ETH">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>{
                                                                t('Pairs')
                                                            }</th>
                                                            <th>{
                                                                t('Last Price')
                                                            }</th>
                                                            <th>{
                                                                t('Change')
                                                            }</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{currencies[currency]}/{currencies[secondary]}</td>
                                                            <td><CurrencyFormat value={value} decimalScale={2} displayType={'text'} thousandSeparator={true} />  {currencies[secondary]}</td>
                                                            <td class="red">
                                                                {thourVariation}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="LTC">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>{
                                                                t('Pairs')
                                                            }</th>
                                                            <th>{
                                                                t('Last Price')
                                                            }</th>
                                                            <th>{
                                                                t('Change')
                                                            }</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{currencies[currency]}/{currencies[secondary]}</td>
                                                            <td><CurrencyFormat value={value} decimalScale={2} displayType={'text'} thousandSeparator={true} />  {currencies[secondary]}</td>
                                                            <td class="red">
                                                                {thourVariation}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="USD">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>{
                                                                t('Pairs')
                                                            }</th>
                                                            <th>{
                                                                t('Last Price')
                                                            }</th>
                                                            <th>{
                                                                t('Change')
                                                            }</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{currencies[currency]}/{currencies[secondary]}</td>
                                                            <td><CurrencyFormat value={value} decimalScale={2} displayType={'text'} thousandSeparator={true} />  {currencies[secondary]}</td>
                                                            <td class="red">
                                                                {thourVariation}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </PerfectScrollbar>
                            </div>
                        </Tab.Container>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-xxl-4">
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">
                                            {
                                            t('Trade History')
                                        }</h4>
                                    </div>
                                    <PerfectScrollbar>
                                        <div class="card-body trade-history">
                                            <div class="table-responsive">
                                                <table class="table table-borderless">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">
                                                                {
                                                                t('Preço')
                                                            }</th>
                                                            <th scope="col">
                                                                {
                                                                t('Size')
                                                            }</th>
                                                            <th scope="col">
                                                                {
                                                                t('Time')
                                                            }</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                    currentHistory.map(order => (
                                                                <tr>
                                                                    <td><CurrencyFormat value={order.priceMedia} decimalScale={2} displayType={'text'} thousandSeparator={true} /> {currencies[order.inputType]}</td>
                                                                    <td>{order.quantity} {currencies[order.outputType]}</td>
                                                                    <td><Moment format="DD/MM/YY - HH:mm">
                                                                    {order.createdAt}
                                                                     </Moment></td>
                                                                </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </PerfectScrollbar>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8 col-lg-12 col-xxl-12">
                        <Tab.Container defaultActiveKey="open-position">
                            <div class="card">
                                <div class="card-header">
                                    <Nav variant="pills">
                                        <Nav.Link eventKey="open-position">
                                            {
                                            t('Order History')
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
        <Footer2/>
    </>
    )
}
export default Dashboard;
