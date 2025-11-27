import React from "react";
import {Button} from "@mui/material";

function HomeForm(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={'consumer-login-form'}>
            <p>Welcome to our Complaint Management System.</p>

            <p>Access our support centre by logging in<br/>
                with your work email. We work with multiple<br/>
                businesses, therefore we need to know<br/>
                you're working for so that we can provide<br/>
                best, most accurate targeted assistance<br/>
                to suit your needs.<br/>
            </p>

            <p>We'll need your work email and the password you<br/>
                used to create your account with us in order to access<br/>
                your resources</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Your Work / Former Registration Email:
                    <input placeholder="Email..." variant="filled" className={'txt-field'} type={"email"}/>
                </label>
                <label>
                    Password
                    <input placeholder="Password..." variant="filled" className={'txt-field'} type={"password"}/>
                </label>
                <div>
                    <Button variant="contained" type={'submit'} className={'button'}>Proceed to MyArea →</Button>
                    <p></p>
                </div>
            </form>

        </div>
    )
}

export default HomeForm;