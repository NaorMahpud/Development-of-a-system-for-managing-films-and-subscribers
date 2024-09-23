import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from './Services/UserService'
import { getAllMovies } from './Services/MoviesService'
import { saveToServer } from './Services/SaveToServer'
import { checkToken } from './Services/CheckToken'
import { getAllMembers } from './Services/MemberService'
import { getAllSub } from './Services/SubscriptionService'

const Button = styled.button`
    background-color: #45a049; 
    color: black;
    padding: 10px 20px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: orange;
    }
  `;

export default function MenuPage() {
    const [activeButton, setActiveButton] = useState(null)
    const store = useSelector((store) => store)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = sessionStorage.getItem('token')

    const fetchData = async () => {
        const validation = await checkToken(token)
        if (validation !== "valid") {
            alert('invalid token')
            navigate('/')
        }
        try {
            const users = await getAllUsers(token)
            const movies = await getAllMovies(token)
            const members = await getAllMembers(token)
            const subscriptions = await getAllSub(token)
            dispatch({ type: "LOAD_DATA", payload: { users, movies, members, subscriptions } })
        } catch (error) {
            return console.log(error)
        }

    }
    const save = () => {
        console.log(store)
    }
    useEffect(() => {
        fetchData()
        //navigate('/menu')
    }, [])

    const logOut = async () => {
        await saveToServer(token, store)
        sessionStorage.clear()
        navigate('/')
    }
    const handleNavigation = async (path, buttonIndex) => {
        setActiveButton(buttonIndex)
        navigate(path)
    }

    const getButtonStyle = (buttonIndex) => {
        return { backgroundColor: activeButton == buttonIndex ? 'yellow' : 'white' }
    }

    return (
        <div>
            <h1 style={{ paddingRight: "160px", fontFamily: "Ariel", justifyContent: "center", display: "flex", color: "blue" }}>Hello {sessionStorage.getItem('fullName')}</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>

                <Link to={'./movies/allmovies'}><Button style={getButtonStyle(1)} onClick={() => handleNavigation('./movies/allmovies', 1)}>Movies</Button></Link>
                <Link to={'./subscriptions'}><Button style={getButtonStyle(2)} onClick={() => handleNavigation('./subscriptions', 2)}>Subscriptions</Button></Link>
                <Link to={'./users/allusers'}><Button style={getButtonStyle(3)} onClick={() => handleNavigation('./users/allusers', 3)}>Users Management</Button></Link>
                <Button onClick={() => saveToServer(token, store)}>Save All Changes</Button>
                <Button onClick={save}>Print</Button>
                <Button onClick={logOut}>Log Out</Button>
            </div> <br />

            <div style={{ border: "2px solid red" }}><Outlet /></div>
        </div>
    )
}
