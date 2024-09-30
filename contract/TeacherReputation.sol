// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TeacherReputation {
    struct Teacher {
        string name;
        string subject;
        string credentials;
        uint reputationScore;
        uint totalVotes;
        uint totalScore;
        address teacherAddress;
    }

    mapping(address => Teacher) public teachers;
    mapping(address => bool) public registeredTeachers;
    mapping(address => mapping(address => bool)) public voted; // Track if a user has voted

    event TeacherRegistered(address teacherAddress, string name, string subject);
    event ReputationUpdated(address teacherAddress, uint newScore);

    function registerTeacher(string memory _name, string memory _subject, string memory _credentials) public {
        require(!registeredTeachers[msg.sender], "Teacher already registered");

        teachers[msg.sender] = Teacher({
            name: _name,
            subject: _subject,
            credentials: _credentials,
            reputationScore: 0,
            totalVotes: 0,
            totalScore: 0,
            teacherAddress: msg.sender
        });

        registeredTeachers[msg.sender] = true;
        emit TeacherRegistered(msg.sender, _name, _subject);
    }

    function voteForTeacher(address _teacherAddress, uint _score) public {
        require(registeredTeachers[_teacherAddress], "Teacher not registered");
        require(!voted[_teacherAddress][msg.sender], "You have already voted for this teacher");

        // Update teacher's total score and total votes
        teachers[_teacherAddress].totalScore += _score;
        teachers[_teacherAddress].totalVotes += 1;

        // Recalculate reputation score
        teachers[_teacherAddress].reputationScore = teachers[_teacherAddress].totalScore / teachers[_teacherAddress].totalVotes;

        // Mark user as voted
        voted[_teacherAddress][msg.sender] = true;

        emit ReputationUpdated(_teacherAddress, teachers[_teacherAddress].reputationScore);
    }

    function getTeacherInfo(address _teacherAddress) public view returns (string memory, string memory, string memory, uint, uint) {
        Teacher memory teacher = teachers[_teacherAddress];
        return (teacher.name, teacher.subject, teacher.credentials, teacher.reputationScore, teacher.totalVotes);
    }
}
