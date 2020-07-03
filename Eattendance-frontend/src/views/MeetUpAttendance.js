import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../store/context/auth';
import { Redirect } from 'react-router-dom';

const MeetUpAttendace = (props) => {
    const { auth, handleSaveAttendance, handleEditAttendance } = useContext(AuthContext);
    const [newAttend, setNewAttend] = useState([]);
    const [addMeetUpModal, setMeetUpModal] = useState(false);
    const [currAtt, setCurrAttend] = useState({
        userAttendance: null,
        _id: null,
        status: null,
        value: null,
        date: null,
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        if (auth && auth.createdCourses) {
            const tempMeetup = auth.createdCourses.find((meetup) => {
                return meetup._id === props.match.params.courseId
            });
            if (tempMeetup) {
                // const attendances = ;
                setData(tempMeetup.attendances);
            }
        }
    }, [auth, props.match.params.courseId]);

    const todayDate = new Date().toISOString().split('T')[0];

    if (!auth) {
        return <Redirect to='/' />
    }
    return (
        <div className='container-fluid'>
            <div className='container-fluid'>
                <br />
                <h3>Attendance</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Id Number</th>
                            <th>Name</th>
                            {
                                data && data.length > 0 && data[0].attendance.length > 0 && data[0].attendance.map((attendace) => {
                                    return (
                                        <th key={attendace._id}>{attendace.date.split('T')[0]}</th>
                                    );
                                })
                            }
                            <th>{todayDate}</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 && data.map((da, index) => {
                                let num = 0;
                                da.attendance.forEach(element => {
                                    num += element.value;
                                });
                                const percentage = (num / da.attendance.length) * 100;
                                return (
                                    <tr key={da._id}>
                                        <td>{index + 1}</td>
                                        <td>{da.idNumber}</td>
                                        <td>{da.name}</td>
                                        {
                                            da.attendance.map((attendace) => {
                                                return (
                                                    <td key={attendace._id} className={`attendace-${attendace.status}`}>
                                                        <div style={{ width: '100%', height: '47px' }} onClick={() => {
                                                            setMeetUpModal(true)
                                                            const sds = da.attendance.find((ad) => {
                                                                return ad._id === attendace._id
                                                            });
                                                            sds.userAttendance = da._id;
                                                            console.log(sds)
                                                            setCurrAttend(sds);
                                                        }}></div>
                                                    </td>
                                                );
                                            })
                                        }
                                        <td>
                                            <Form.Control id={'select-' + da._id} as="select" onChange={(e) => {
                                                const nww = newAttend;
                                                const newValue = {
                                                    attendeeId: da._id,
                                                    status: e.target.value !== 'null' ? e.target.value : 'absent',
                                                    value: e.target.value === 'present' ? 1 : 0,
                                                }
                                                nww[index] = newValue;
                                                setNewAttend(nww);
                                            }}>
                                                <option value='null'>...</option>
                                                <option value='present'>present</option>
                                                <option value='absent'>absent</option>
                                            </Form.Control>
                                        </td>
                                        {
                                            da.attendance && da.attendance.length > 0 &&
                                            <td>{percentage}%</td>
                                        }
                                        {
                                            da.attendance && da.attendance.length <= 0 &&
                                            <td>{0}%</td>
                                        }
                                    </tr>
                                );
                            })
                        }
                        {
                            data.length < 0 &&
                            <td>No Attendance</td>
                        }
                    </tbody>
                </Table>
                <div>
                    <Modal show={addMeetUpModal} onHide={() => setMeetUpModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Attendance</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Control defaultValue={currAtt.status} id={'select-' + currAtt._id} as="select" onChange={(e) => {
                                const newValue = {
                                    userAttendance: currAtt.userAttendance,
                                    _id: currAtt._id,
                                    status: e.target.value !== 'null' ? e.target.value : 'absent',
                                    value: e.target.value === 'present' ? 1 : 0,
                                }
                                // const index = 1;
                                // nww[index] = newValue;
                                // console.log(currAtt)
                                setCurrAttend(newValue);
                            }}>
                                <option value='null'>...</option>
                                <option value='present'>present</option>
                                <option value='absent'>absent</option>
                            </Form.Control>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className='btn btn-sm btn-primary text-uppercase' onClick={() => {
                                handleEditAttendance(props.match.params.courseId, currAtt);
                            }} type="submit">Update</Button>
                        </Modal.Footer>
                    </Modal>
                    <div style={{ float: 'right' }}>
                        <Button onClick={() => {
                            if (newAttend.length !== data.length) {
                                alert('Attendance not complete');
                            } else {
                                const values = {
                                    date: todayDate,
                                    attendance: newAttend
                                };
                                // console.log(values);
                                handleSaveAttendance(props.match.params.courseId, values);
                            }
                        }}>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MeetUpAttendace;