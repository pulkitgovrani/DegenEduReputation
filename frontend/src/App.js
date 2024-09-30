import React, { useState, useEffect } from 'react';
import { UserSession, AppConfig } from '@blockstack/connect';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GaiaStorage from './components/GaiaStorage';
import TeacherDashboard from './components/TeacherDashboard';
import VoteTeacher from './components/VoteTeacher';
import "App.css";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userSession.isUserSignedIn()) {
            setUser(userSession.loadUserData());
        } else if (userSession.isSignInPending()) {
            userSession.handlePendingSignIn().then(() => {
                setUser(userSession.loadUserData());
            });
        }
    }, []);

    const handleSignIn = () => {
        userSession.redirectToSignIn();
    };

    const handleSignOut = () => {
        userSession.signUserOut(window.location.origin);
        setUser(null);
    };

    return (
        <Router>
            <div>
                <h1>Decentralized Reputation System for Educators</h1>
                {user ? (
                    <div>
                        <button onClick={handleSignOut}>Sign Out</button>
                        <p>Welcome, {user.username}!</p>
                    </div>
                ) : (
                    <button onClick={handleSignIn}>Sign In with Blockstack</button>
                )}
                <Routes>
                    <Route path="/" element={<GaiaStorage />} />
                    <Route path="/dashboard" element={<TeacherDashboard />} />
                    <Route path="/vote" element={<VoteTeacher />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
