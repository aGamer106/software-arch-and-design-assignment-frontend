import React from "react";
import '../static/css/footer.css';

function Footer(props) {

    return (
        <footer className={'footer'}>
            <h4 className={'title'}>© ABC Limited 2025 | All Rights Reserved (Powered by the amazing Spring Boot and React)</h4>
            <ul className={'foot-list'}>
                <li className={'foot-item'}><a href={"#"}>Legal </a></li>
                <li className={'foot-item'}><a href={"#"}>Compliance </a></li>
                <li className={'foot-item'}><a href={"#"}>GDPR</a></li>
                <li className={'foot-item'}><a href={"#"}>Accessibility Statement</a></li>
                <li className={'foot-item'}><a href={"#"}>Anti Social Behaviour Statement </a></li>
            </ul>
        </footer>
    )

}

export default Footer;