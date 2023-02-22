import React from 'react'
import './Header.css'
import { useTranslation } from 'react-i18next'


function Header() {
    const { t, i18n } = useTranslation();

    return (
        <header>
            <h1 className='logo-header'>Holiday's</h1>
            <nav>
                <ul>
                    <li className='link-container'><a className='link2' href="#">{t("header-project")}</a></li>
                    <li className='link-container'><a className='link2' href="#">{t("header-countries")}</a></li>
                    <li className='link-container'><a className='link2' href="#">{t("header-weather")}</a></li>
                </ul>
            </nav>
            <div className='language'>
                <button onClick={() => i18n.changeLanguage("en")}>EN</button>
                <hr></hr>
                <button onClick={() => i18n.changeLanguage("uk")}>UA</button>
            </div>
        </header>
    );
}

export default Header;