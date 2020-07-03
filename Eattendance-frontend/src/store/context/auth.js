import React, { Component, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    initAuth = localStorage.getItem('auth') || null;
    state = {
        auth: JSON.parse(this.initAuth),
        courses: [],
    }

    handleLogout = () => {
        localStorage.removeItem('auth');
        this.setState({
            auth: null
        });
        axios.defaults.headers.common['Authorization'] = null;
    }

    handleGetUser = () => {
        axios.get(`${this.props.apiUrl}/auth/user`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then((res) => {
            this.setState({
                auth: res.data.data
            });
            localStorage.setItem('auth', JSON.stringify(res.data.data));
        }).catch(() => {
        });
    }

    handleLogin = (credentials) => {
        axios.post(`${this.props.apiUrl}/auth/login`, {
            email: credentials.email,
            password: credentials.password
        }).then((res) => {
            this.setState({
                auth: res.data.auth
            });
            localStorage.setItem('auth', JSON.stringify(res.data.auth));
            localStorage.setItem('token', res.data.token);
        }).catch(() => {
            alert('Incorrect email or password! Try again later')
        });
    }

    handleCreateAccount = (credentials) => {
        axios.post(`${this.props.apiUrl}/auth/create-user`, {
            email: credentials.email,
            password: credentials.password,
            firstname: credentials.firstname,
            lastname: credentials.lastname,
            idNumber: credentials.idNumber,
            role: credentials.role,
        }).then(() => {
            alert('Account has been created!');
        }).catch(() => {
            alert('Unable to create account!');
        });
    }




    handleSaveAttendance = (id, values) => {
        axios.post(`${this.props.apiUrl}/course/${id}/new-attendance`, {
            date: values.date,
            attendances: values.attendance,
        }, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(() => {
            alert('Attendance has been taken!');
            this.handleGetUser();
        }).catch(() => {
            alert('Unable to take attendance!');
        });
    }

    handleEditAttendance = (id, values) => {
        axios.put(`${this.props.apiUrl}/course/${id}/edit-attendance`, {
            userAttendance: values.userAttendance,
            _id: values._id,
            status: values.status,
            value: values.value,
        }, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(() => {
            alert('Attendance has been updated!');
            this.handleGetUser();
        }).catch(() => {
            alert('Unable to update attendance!');
        });
    }

    handleGetCourses = () => {
        axios.get(`${this.props.apiUrl}/course`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then((res) => {
            this.setState({
                courses: res.data.data
            });
        }).catch(() => {
        });
    }

    handleCreateCourse = (values) => {
        axios.post(`${this.props.apiUrl}/course/create-course`, {
            title: values.title,
        }, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(() => {
            // alert('Meetup has been created!');
            this.handleGetUser();
        }).catch(() => {
            alert('Unable to create course!');
        });
    }

    handleDeleteCourse = (id) => {
        axios.delete(`${this.props.apiUrl}/course/${id}`, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(() => {
            // alert('Meetup has been created!');
            this.handleGetUser();
        }).catch(() => {
            alert('Unable to delete course!');
        });
    }

    handleEnroll = (id) => {
        axios.post(`${this.props.apiUrl}/course/enroll/${id}`, {}, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(() => {
            // alert('Meetup has been created!');
            this.handleGetUser();
        }).catch(() => {
            alert('Unable to enroll!');
        });
    }

    render() {
        return (
            <AuthContext.Provider value={{
                ...this.state,
                // Auth
                handleLogout: this.handleLogout,
                handleCreateAccount: this.handleCreateAccount,
                handleLogin: this.handleLogin,


                handleEnroll: this.handleEnroll,

                // Course
                handleGetCourses: this.handleGetCourses,
                handleSaveAttendance: this.handleSaveAttendance,
                handleEditAttendance: this.handleEditAttendance,
                handleCreateCourse: this.handleCreateCourse,
                handleDeleteCourse: this.handleDeleteCourse,

            }}>
                {this.props.children}
            </AuthContext.Provider >
        )
    }
}

export default AuthContextProvider;