import React, { useContext, useState, useRef } from 'react';
import '../styles/form.css'
import { AuthContext } from '../store/context/auth';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const LoginPage = () => {
    const { auth, handleLogin } = useContext(AuthContext);

    const [validated, setValidated] = useState(false);

    const userEmail = useRef();
    const userPassword = useRef();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const values = {
                email: userEmail.current.value,
                password: userPassword.current.value
            }
            handleLogin(values);
        }
        setValidated(true);
    };

    if (auth) {
        return <Redirect to='/' />
    }
    return (
        <div className='login-body'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                        <div className='card card-signin my-5'>
                            <div className='card-body'>
                                <h5 className='card-title text-center'>Sign In</h5>
                                <Form className='form-signin' noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            required
                                            type='email'
                                            autoFocus
                                            ref={userEmail}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            required
                                            ref={userPassword}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Text>Not a member? <Link to='/signup/student'>Student</Link> or <Link to='/signup/tutor'>Tutor</Link></Form.Text>
                                    </Form.Group>

                                    <Button className='btn btn-lg btn-primary btn-block text-uppercase' type="submit">Sign in</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;