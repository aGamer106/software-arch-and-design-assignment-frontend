import React from "react";
import {useState} from "react";
import '../static/css/navbar.css'
import {Link} from "react-router-dom";

function Navbar(props) {

    const [active, setActive] = useState('nav-menu');
    const [toggleIcon, setToggleIcon] = useState('nav-toggler');

    const navToggle = () => {
        active === 'nav-menu' ? setActive('nav-menu nav-active') : setActive('nav-menu');
        toggleIcon === 'nav-toggler' ? setToggleIcon('nav-toggler toggle') : setToggleIcon('nav-toggler');
    }

    return (
        <nav className={'nav'}>
            <a href={'/'} className={'nav-brand'}>ABC Limited</a>
            <ul className={active}>
                {/*<li className={'nav-item'}><a href={'#'} className={'nav-link'}>Home</a></li>*/}
                {/*<li className={'nav-item'}><Link to={'/admin-login'} className={'nav-link'}>Admin/Help Desk Login</Link></li>*/}
                <li className={'nav-item'}><a href={'/admin-login'} className={'nav-link'}>Admin/Help Desk Login</a></li>
                {/*<li className={'nav-item'}><Link to={'#'} className={'nav-link'}>Call us: +44 1234 567890</Link></li>*/}
                <li className={'nav-item'}><a href={'#'} className={'nav-link'}>Call us: +44 1234 567890</a></li>
            </ul>
            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    )
}

export default Navbar;