import React, { useState, useContext, useEffect } from 'react';
import { Table, Button, } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../store/context/auth';

const CoursesPage = () => {
    const { auth, courses, handleGetCourses, handleEnroll } = useContext(AuthContext);
    // const [addMeetUpModal, setMeetUpModal] = useState(false);
    const [data, setData] = useState([]);
    // const [validated, setValidated] = useState(false);

    // const meetupName = useRef();
    // const meetupAttendees = useRef();


    useEffect(() => {
        handleGetCourses();
    }, [handleGetCourses]);

    useEffect(() => {
        setData(courses);
    }, [courses]);

    if (!auth) {
        return <Redirect to='/login' />
    }

    return (
        <div>
            <div className='container-fluid'>
                <main role='main' className='px-4'>
                    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                        <h1 className='h2'>Courses</h1>
                        <div className='btn-toolbar mb-2 mb-md-0'>
                            {/* <ButtonGroup className='mr-2' aria-label="dashboard-toolbar">
                                <Button variant="primary" onClick={() => console.log(true)}>Add Meet-up</Button>
                            </ButtonGroup> */}
                        </div>
                    </div>
                    <h4>Enrolled courses</h4>
                    <div className='table-responsive'>
                        {
                            data && data.length > 0 &&
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Course</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map((da, index) => {
                                            const courseFound = auth.enrolledCourses.findIndex((cours) => {
                                                return cours._id === da._id;
                                            });
                                            const ccourseFound = auth.createdCourses.findIndex((cours) => {
                                                return cours._id === da._id;
                                            });
                                            
                                            const isDisabled = (courseFound === -1) && (ccourseFound === -1) ? false : true;
                                            return (
                                                <tr key={da._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{da.title}</td>
                                                    <td><Button disabled={isDisabled} variant={isDisabled ? 'success' : 'primary'} size="sm" onClick={() => handleEnroll(da._id)}>{isDisabled ? 'Enrolled' : 'Enroll'}</Button></td>
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

export default CoursesPage;