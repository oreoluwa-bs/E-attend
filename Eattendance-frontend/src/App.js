import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import Dashbaord from './views/Dashboard';
import MeetUpAttendace from './views/MeetUpAttendance';
import RootContext from './store/context';
import Navbar from './components/Navbar';
import TutorSignupPage from './views/TutorSignupPage';
import CoursesPage from './views/Courses';

function App() {
  return (
    <BrowserRouter>
      <RootContext>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashbaord} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup/student' component={SignupPage} />
          <Route path='/signup/tutor' component={TutorSignupPage} />
          <Route path='/courses' component={CoursesPage} />
          <Route path='/attendance/:courseId' component={MeetUpAttendace} />
          <Route component={() => <div>Error</div>} />
        </Switch>
      </RootContext>
    </BrowserRouter>
  );
}

export default App;
