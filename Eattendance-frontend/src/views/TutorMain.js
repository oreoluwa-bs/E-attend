import React, { useState, useContext, useEffect, useRef } from 'react';
import { Table, Button, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../store/context/auth';

const TutorMain = () => {
    const { auth, courses, handleCreateCourse, handleDeleteCourse } = useContext(AuthContext);
    const [addMeetUpModal, setMeetUpModal] = useState(false);
    const [data, setData] = useState([]);
    const [validated, setValidated] = useState(false);

    const courseName = useRef();
    // const meetupAttendees = useRef();

    useEffect(() => {
        if (auth && auth.createdCourses) {
            setData(auth.createdCourses);
        }
    }, [auth, courses]);


    const handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const values = {
                title: courseName.current.value,
                // attendees: meetupAttendees.current.value
                // password: userPassword.current.value
            }
            handleCreateCourse(values);
            setMeetUpModal(false);
        }
        setValidated(true);
    };

    if (!auth) {
        return <Redirect to='/login' />
    }

    return (
        <div>
            <div className='container-fluid'>
                <main role='main' className='px-4'>
                    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                        <h1 className='h2'>Dashboard</h1>
                        <div className='btn-toolbar mb-2 mb-md-0'>
                            <ButtonGroup className='mr-2' aria-label="dashboard-toolbar">
                                <Button variant="primary" onClick={() => setMeetUpModal(true)}>Add Course</Button>
                            </ButtonGroup>
                            <Modal show={addMeetUpModal} onHide={() => setMeetUpModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create Course</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form className='form-signin' noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Form.Group controlId='courseName'>
                                            <Form.Label>Title:</Form.Label>
                                            <Form.Control
                                                required
                                                autoFocus
                                                ref={courseName}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <div className='float-right mt-3'>
                                                <Button className='btn btn-sm btn-primary text-uppercase' type="submit">Create course</Button>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                    <h4>Created courses</h4>
                    <div className='table-responsive'>
                        {
                            data && data.length > 0 &&
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Course</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map((da, index) => {
                                            return (
                                                <tr key={da._id}>
                                                    <td>{index + 1}</td>
                                                    <td><Link to={`/attendance/${da._id}`}>{da.title}</Link></td>
                                                    <td><Button variant="outline-danger" size="sm" onClick={() => handleDeleteCourse(da._id)}>Delete</Button></td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        }
                        {
                            data && data.length <= 0 &&
                            <div>NO DATA</div>
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TutorMain;