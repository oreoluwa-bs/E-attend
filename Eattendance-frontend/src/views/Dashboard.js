import React, { useContext } from 'react';
import { AuthContext } from '../store/context/auth';
import TutorMain from './TutorMain';
import StudentMain from './StudentMain';
import { Redirect } from 'react-router-dom';

const Dashbaord = () => {
    const { auth } = useContext(AuthContext);


    if (!auth) {
        return <Redirect to='/login' />
    }
    return (
        <div>
            {
                auth && auth.role === 'tutor' &&
                <TutorMain />
            }
            {
                auth && auth.role === 'student' &&
                <StudentMain />
            }
        </div>
    );
}

export default Dashbaord;