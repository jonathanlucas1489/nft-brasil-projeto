import React, {} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap'
import ScrollspyNav from "react-scrollspy-nav";
import idsuexlogo from '../../images/brand/umbrellalogo.png'
import { useTranslation } from "react-i18next";
import LanguageSelect from '../element/languageSelect'


function Header1() {
    const { t } = useTranslation()
    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col">
  
                            <div className="navigation">
 
                                <Navbar bg="light" expand="lg">
                                <img src={idsuexlogo}
                            style={
                                {
                                    width: 100,
                                    maxHeight: '70px'
                                }
                        }></img>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                                    <Navbar.Collapse>
                                        <ScrollspyNav scrollTargetIds={
                                                [
                                                    "home",
                                                    "price",
                                                    "portfolio",
                                                    "testimonial",
                                                    "app",
                                                    "blog",
                                                ]
                                            }
                                            offset={100}
                                            activeNavClass="active"
                                            scrollDuration="1000"
                                            headerBackground="true">
                                            <Nav className="ml-auto">
                                                <Nav.Item>
                                                    <Nav.Link className="nav-Nav.link" href="#home">{t("Home")}</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="nav-Nav.link" href="#price">{t("Assets")}</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="nav-Nav.link" href="#portfolio">{t("Guide")}  </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="nav-Nav.link" href="#testimonial">IDSUEX</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="nav-Nav.link" href="#app">
                                                        {t("Language")}</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="nav-Nav.link" href="#blog">{t("News")}</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </ScrollspyNav>
                                    </Navbar.Collapse>
                                        <div className="signin-btn">
                                        <Link className="btn btn-primary ml-3 mt-2"
                                                to={'/signup/createuser'}>{t("Sign up")}</Link>
                                            <Link className="btn btn-primary ml-3  mt-2"
                                                to={'/signin'}>Login</Link>
                                        </div>
                                </Navbar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header1;
