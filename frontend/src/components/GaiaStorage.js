import React, { useState } from 'react';
import { UserSession, AppConfig } from '@blockstack/gaia';

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

const GaiaStorage = () => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [credentials, setCredentials] = useState('');
    const [status, setStatus] = useState('');

    const saveDataToGaia = async () => {
        const teacherData = { name, subject, credentials };
        const storageFile = 'teacherData.json';

        if (userSession.isUserSignedIn()) {
            await userSession.putFile(storageFile, JSON.stringify(teacherData), { encrypt: false });
            setStatus('Data saved successfully!');
        } else {
            setStatus('Please sign in first');
        }
    };

    return (
        <div>
            <h3>Register Teacher</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <textarea placeholder="Credentials" value={credentials} onChange={(e) => setCredentials(e.target.value)} />
            <button onClick={saveDataToGaia}>Save to Gaia</button>
            <p>{status}</p>
        </div>
    );
};

export default GaiaStorage;
