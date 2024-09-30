import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TeacherReputation from '../TeacherReputation.json'; // ABI of the smart contract

const web3 = new Web3(Web3.givenProvider);
const contractAddress = 'YOUR_SMART_CONTRACT_ADDRESS';
const teacherContract = new web3.eth.Contract(TeacherReputation.abi, contractAddress);

const TeacherDashboard = () => {
    const [teacherAddress, setTeacherAddress] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [credentials, setCredentials] = useState('');
    const [reputationScore, setReputationScore] = useState(0);

    useEffect(() => {
        async function loadTeacherData() {
            if (teacherAddress) {
                const teacherData = await teacherContract.methods.getTeacherInfo(teacherAddress).call();
                setName(teacherData[0]);
                setSubject(teacherData[1]);
                setCredentials(teacherData[2]);
                setReputationScore(teacherData[3]);
            }
        }
        loadTeacherData();
    }, [teacherAddress]);

    const registerTeacher = async () => {
        const accounts = await web3.eth.getAccounts();
        await teacherContract.methods.registerTeacher(name, subject, credentials).send({ from: accounts[0] });
    };

    const updateReputation = async (newScore) => {
        const accounts = await web3.eth.getAccounts();
        await teacherContract.methods.updateReputation(teacherAddress, newScore).send({ from: accounts[0] });
    };

    return (
        <div>
            <h3>Teacher Dashboard</h3>
            <input
                type="text"
                placeholder="Teacher Address"
                value={teacherAddress}
                onChange={(e) => setTeacherAddress(e.target.value)}
            />
            <button onClick={registerTeacher}>Register Teacher</button>
            <h4>{name} - {subject}</h4>
            <p>Credentials: {credentials}</p>
            <p>Reputation: {reputationScore}</p>
            <button onClick={() => updateReputation(reputationScore + 1)}>Increase Reputation</button>
        </div>
    );
};

export default TeacherDashboard;
