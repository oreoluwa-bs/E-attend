import React, { useState, useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { AuthContext } from '../store/context/auth';

const StudentMain = () => {
    const { auth, courses } = useContext(AuthContext);
    // const [addMeetUpModal, setMeetUpModal] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (auth && auth.enrolledCourses) {
            setData(auth.enrolledCourses);
        }
    }, [auth, courses]);


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
                                        <th>Attendance (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map((da, index) => {
                                            let num = 0;
                                            const userAttendance = da.attendances.find((userAttend) => {
                                                return userAttend.idNumber === auth.idNumber;
                                            });
                                            let percentage = 0;
                                            if (userAttendance && userAttendance.attendance) {
                                                userAttendance.attendance.forEach(element => {
                                                    num += element.value;
                                                });

                                                percentage = (num / userAttendance.attendance.length) * 100;
                                            } else {
                                                percentage = 0;
                                            }
                                            return (
                                                <tr key={da._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{da.title}</td>
                                                    {
                                                        userAttendance.attendance &&
                                                            userAttendance.attendance.length <= 0 ? <td>{0}%</td> : <td>{percentage}%</td>
                                                    }
                                                    {/* <td>{percentage}%</td> */}
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        }
                        {
                            data && data.length <= 0 &&
                            <div>
                                <p>No enrolled courses available</p>
                                <p>
                                    <Link className="btn btn-primary" to='/courses'>
                                        Enroll here
                                    </Link>
                                </p>
                            </div>
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}

export default StudentMain;