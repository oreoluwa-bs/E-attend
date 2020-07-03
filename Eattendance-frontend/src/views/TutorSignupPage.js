import React, { useState, useRef, useContext } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../store/context/auth';

const TutorSignupPage = (props) => {
    const { auth, handleCreateAccount } = useContext(AuthContext);

    const [validated, setValidated] = useState(false);

    const userFName = useRef();
    const userLName = useRef();
    const userID = useRef();
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
                password: userPassword.current.value,
                firstname: userFName.current.value,
                lastname: userLName.current.value,
                idNumber: userID.current.value,
                role: 'tutor'
            }
            handleCreateAccount(values);
            props.history.push('/login');
        }
        setValidated(true);
    };

    if (auth) {
        return <Redirect to='/' />
    }
    return (
        <div className='signup-body'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                        <div className='card card-signin my-5'>
                            <div className='card-body'>
                                <h5 className='card-title text-center'>Tutor Sign Up</h5>
                                <Form className='form-signin' noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="firstname">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type='firstname'
                                                    autoFocus
                                                    ref={userFName}
                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="lastname">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type='lastname'
                                                    ref={userLName}
                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group controlId="idNum">
                                        <Form.Label>Identification Number</Form.Label>
                                        <Form.Control
                                            required
                                            type='idNum'
                                            ref={userID}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            required
                                            type='email'
                                            ref={userEmail}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            required
                                            ref={userPassword}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Text><Link to='/login'>Already a member?</Link></Form.Text>
                                    </Form.Group>

                                    <Button className='btn btn-lg btn-primary btn-block text-uppercase' type="submit">Sign Up</Button>
                                </Form>
                                {/* <form class='form-signin'>
                                    <div class='form-label-group'>
                                        <input type='email' id='inputEmail' class='form-control' placeholder='Email address' required autofocus />
                                        <label for='inputEmail'>Email address</label>
                                    </div>

                                    <div class='form-label-group'>
                                        <input type='password' id='inputPassword' class='form-control' placeholder='Password' required />
                                        <label for='inputPassword'>Password</label>
                                    </div>

                                    <div class='custom-control mb-3'>
                                        <label>Already a member?</label>
                                    </div>
                                    <button class='btn btn-lg btn-primary btn-block text-uppercase' type='submit'>Sign up</button>
                                </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TutorSignupPage;