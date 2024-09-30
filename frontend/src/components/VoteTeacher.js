import React, { useState } from 'react';
import Web3 from 'web3';
import TeacherReputation from '../TeacherReputation.json'; // ABI of the smart contract

const web3 = new Web3(Web3.givenProvider);
const contractAddress = 'YOUR_SMART_CONTRACT_ADDRESS';
const teacherContract = new web3.eth.Contract(TeacherReputation.abi, contractAddress);

const VoteTeacher = () => {
    const [teacherAddress, setTeacherAddress] = useState('');
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState('');

    const voteForTeacher = async () => {
        const accounts = await web3.eth.getAccounts();
        try {
            await teacherContract.methods.voteForTeacher(teacherAddress, score).send({ from: accounts[0] });
            setStatus('Vote successful!');
        } catch (error) {
            setStatus('Error submitting vote: ' + error.message);
        }
    };

    return (
        <div>
            <h3>Vote for a Teacher</h3>
            <input
                type="text"
                placeholder="Teacher Address"
                value={teacherAddress}
                onChange={(e) => setTeacherAddress(e.target.value)}
            />
            <input
                type="number"
                placeholder="Score (1-10)"
                value={score}
                onChange={(e) => setScore(e.target.value)}
            />
            <button onClick={voteForTeacher}>Submit Vote</button>
            <p>{status}</p>
        </div>
    );
};

export default VoteTeacher;
