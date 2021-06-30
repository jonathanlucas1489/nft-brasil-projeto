import React, {useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function SelectLanguage() {
    const { t } = useTranslation()
    const [label, setLabel] = useState('Select Language')
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {t(label)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                    i18next.changeLanguage('pt')
                    setLabel("Portuguese")
                }}>{t("Portuguese")}</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    i18next.changeLanguage('en')
                    setLabel("English")
                }}>{t("English")}</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    i18next.changeLanguage('es')
                    setLabel("Spanish")
                }}>{t("Spanish")}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default SelectLanguage;
