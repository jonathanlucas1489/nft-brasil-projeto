import React, { } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, } from "react-bootstrap";
import {useTranslation} from "react-i18next";


function Sidebar() {
    const {t} = useTranslation()
    
const home = (
    <Tooltip id="home">
        {t('Home')}
    </Tooltip>
);
const exchange = (
    <Tooltip id="exchange">
        {t('Deposit')}
    </Tooltip>
);
const accounts = (
    <Tooltip id="accounts">
        {t('Account')}
    </Tooltip>
);
    return (
        <>
            <div class="sidebar">
                <div class="menu">
                    <ul>
                        <li>
                            <Link to={"./dashboard"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={home}>
                                    <span><i class="mdi mdi-view-dashboard"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                        <li>
                            <Link to={"./account-withdraw"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={exchange}>
                                    <span><i class="mdi mdi-tumblr-reblog"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                        <li>
                            <Link to={"./account-overview"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={accounts}>
                                    <span><i class="mdi mdi-face-profile"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar;