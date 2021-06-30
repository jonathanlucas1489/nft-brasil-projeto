import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, } from 'react-bootstrap'
import LanguageSelect from '../element/languageSelect'
import { useSelector,useDispatch } from 'react-redux'
import {User} from '../store/User/User.action'
import {useTranslation} from "react-i18next";
import axios from '../../services/index'
import CurrencyFormat from 'react-currency-format';

const ProfileToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
    {children}
        <div className="profile_log">
            <div class="user">
                <span class="thumb"><i class="mdi mdi-account"></i></span>
                <span class="arrow"><i class="la la-angle-down"></i></span>
            </div>
        </div>
    </div>
));

function Header2() {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [balance, setBalance] = useState()
    const [balanceBRL, setBalanceBRL] = useState()
    const [lastModifyBRL, setLastModifyBRL] = useState()
    const [lastModify, setLastModify] = useState()

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
    
    useEffect(async () => {
        await getBalances(12345)
    }, [])
    return (
        <>
            <div class="header dashboard">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-12">
                            <nav class="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
                                <Link class="navbar-brand" to={"./dashboard"}><img src={require('./../../images/logo.png')} alt="" /></Link>

                                <div class="header-right d-flex my-2 align-items-center">
                                    <div class="language">
                                         <LanguageSelect />
                                    </div>
                                    <div class="dashboard_log">
                                        <Dropdown className="profile_log">
                                            <Dropdown.Toggle as={ProfileToggle} />
                                            <Dropdown.Menu size="sm" title="">
                                                <div class="user-email">
                                                    <div class="user">
                                                        <span class="thumb"><i class="mdi mdi-account"></i></span>
                                                        <div class="user-info">
                                                            <h6>{user.firstName} {user.secondName}</h6>
                                                            <span>{user.email}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="user-balance">
                                                    <div class="available">
                                                        <p>{t('Balance available')}</p>
                                                        <span>
                                                            IDX <CurrencyFormat value={balance} decimalScale={2} displayType={'text'} thousandSeparator={true} /> 
                                                        </span>
                                                    </div>
                                                    <div class="total">
                                                        <p>{t('Balance')}</p>
                                                        <span>
                                                        R$ <CurrencyFormat value={balanceBRL} decimalScale={2} displayType={'text'} thousandSeparator={true} />
                                                        </span>
                                                    </div>
                                                </div>
                                            <Link to={"./account-overview"} class="dropdown-item">
                                                    <i class="mdi mdi-account"></i> {t('Account')}
                                            </Link>
                                                <Link to={"./account-withdraw"} class="dropdown-item">
                                                    <i class="mdi mdi-history"></i> {t('Deposit')}
                                            </Link>
                                            <Link to={"./signin"} onClick={() => {
                                                    dispatch(User({}))
                                                }}class="dropdown-item logout">
                                            <i class="mdi mdi-logout"></i> {t('Logout')}
                                            </Link>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header2;