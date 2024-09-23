import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin: 10px;
    &:hover {
      background-color: #45a049;
    }
  `;
const UserCard = styled.div`
    width: 300px; 
    height: auto; 
    border: 3px solid green;
    margin: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #f9f9f9;
    font-size: 22px;
  `;
const PermissionsList = styled.ul`
    padding: 0;
    margin: 2px 20px;
  `;
const UsersContainer = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: evenly; 
  `;

export default function AllUserPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const allUsers = useSelector((store) => store.users).filter((user) => !user.status || (user.status !== "DELETED"))
    const filteredUsers = allUsers.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const dispacth = useDispatch()

    const handleDeleteButton = (user) => {
        dispacth({ type: "DELETE_USER", payload: user })
        alert('Successfully Deleted!!')
    }

    return (
        <div>
            <label style={{ fontSize: "25px", margin: "1px 8px" }}>
                <strong>Find User: </strong>
                <input onChange={(e) => setSearchTerm(e.target.value)} style={{ fontSize: "20px", width: "12%" }} type='text' placeholder=" Search user's by name" />
            </label>

            <UsersContainer>
                {filteredUsers.map(user => (
                    <UserCard key={user._id}>
                        <label><strong>Name:</strong> {user.firstName} - {user.lastName}</label>
                        <label><strong>Username:</strong> {user.username} </label>
                        <label><strong>Session Time Out(Minutes):</strong> {user.sessionTimeOut}</label>
                        <label><strong>Created date:</strong> {user.createdDate}</label>
                        <label><strong>Permissions:</strong></label>
                        <PermissionsList>
                            {user.permissions?.map((per, index) => (
                                <li key={index} className='user'>{per}</li>
                            ))}
                        </PermissionsList>
                        <div>
                            <Link to={`/menu/users/edituser/${user._id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button onClick={() => handleDeleteButton(user)}>Delete</Button>
                        </div>
                    </UserCard>
                ))}
            </UsersContainer>
        </div>
    );
}
