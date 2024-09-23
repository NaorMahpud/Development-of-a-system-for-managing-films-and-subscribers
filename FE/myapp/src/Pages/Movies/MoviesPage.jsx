import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
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

export default function MoviesPage() {
    const [activeButton, setActiveButton] = useState(1)
    const navigate = useNavigate()

    const handleClick = (buttonIndex) => {
        setActiveButton(buttonIndex)
    }

    const getButtonStyle = (buttonIndex) => {
        return { backgroundColor: activeButton == buttonIndex ? 'yellow' : 'white', margin: "7px" }
    }

    useEffect(() => {
        navigate('/menu/movies/allmovies')
    }, [])


    return (
        <div>
            <h1>Movies</h1>
            <div style={{ padding: "0px", margin: "20px" }}>
                <Link to={'/menu/movies/allmovies'}><Button style={getButtonStyle(1)} onClick={() => handleClick(1)}>All Movies</Button></Link>
                <Link to={'/menu/movies/addmovie'}><Button style={getButtonStyle(2)} onClick={() => handleClick(2)}>Add Movie</Button></Link>
                <Button style={{ margin: "10px 300px" }}>Save All Changes</Button>

                <Outlet />
            </div>
        </div>
    )
}
