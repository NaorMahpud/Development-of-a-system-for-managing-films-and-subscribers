import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

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

export default function SubscriptionsPage() {

    const [activeButton, setActiveButton] = useState(1)
    const navigate = useNavigate()

    const handleClick = (buttonIndex) => {
        setActiveButton(buttonIndex)
    }

    const getButtonStyle = (buttonIndex) => {
        return { backgroundColor: activeButton == buttonIndex ? 'yellow' : 'white', margin: "7px" }
    }

    useEffect(() => {
        navigate('/menu/subscriptions/allmembers')
    }, [])

    return (
        <div>
            <h1>Subscriptions</h1>
            <div style={{ padding: "0px", margin: "20px" }}>
                <Link to={'/menu/subscriptions/allmembers'}><Button style={getButtonStyle(1)} onClick={() => handleClick(1)}>All Members</Button></Link>
                <Link to={'/menu/subscriptions/addmember'}><Button style={getButtonStyle(2)} onClick={() => handleClick(2)}>Add Member</Button></Link>

                <Outlet />
            </div>
        </div>
    )
}
