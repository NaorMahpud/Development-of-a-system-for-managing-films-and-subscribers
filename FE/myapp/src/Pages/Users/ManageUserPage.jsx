import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    background-color: #C0C0C0; 
    color: black;
    padding: 8px 20px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: orange;
    }
  `;

export default function ManageUserPage() {
    const [activeButton, setActiveButton] = useState(1);

    const handleClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    const getButtonStyle = (buttonIndex) => {
        return { backgroundColor: activeButton === buttonIndex ? 'yellow' : 'white', margin: '7px' };
    };

    return (
        <div>
            <h1>Users</h1>
            <div style={{ padding: '10px', margin: '20px' }}>
                <Link to={'/menu/users/allusers'}>
                    <Button style={getButtonStyle(1)} onClick={() => handleClick(1)}>All Users</Button>
                </Link>
                <Link to={'/menu/users/adduser'}>
                    <Button style={getButtonStyle(2)} onClick={() => handleClick(2)}>Add User</Button>
                </Link>
                <Outlet />
            </div>
        </div>
    );
}
