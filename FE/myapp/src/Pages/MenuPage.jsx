import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { getAllUsers } from './Services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from './Services/MoviesService'

const Button = styled.button`
    background-color: #45a049; 
    color: black;
    padding: 10px 20px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;

  `;

export default function MenuPage() {
    const [activeButton, setActiveButton] = useState(null)
    const dispatch = useDispatch()
    const users = useSelector((store) => store.users)
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        const handleBeforeNavigate = () => {
            saveToServer(users)
        }
        window.addEventListener('beforeunload', handleBeforeNavigate);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeNavigate);
        };
    }, [users])

    const saveToServer = async (users) => {
        try {
            for (const user of users) {
                if (user.status === "NEW") {
                    delete user.status
                    const createResp = await createUser(token, user)
                    if (createResp.error) return console.error(createResp.error)
                    continue

                } else if (user.status === "UPDATED") {
                    delete user.status
                    const updateResp = await updateUser(token, user._id, user)
                    if (updateResp.error) return console.error(updateResp.error)
                    continue

                } else if (user.status === "DELETED") {
                    delete user.status
                    const deleteResp = await deleteUser(token, user._id)
                    if (deleteResp.error) return console.error(deleteResp.error)
                    continue
                }
            }
            dispatch({ type: "LOAD_DATA", payload: store })
            alert("Successfully Saved All Changes!!")
        } catch (error) {
            return console.error(error)
        }
    }

    const fetchData = async () => {
        const users = await getAllUsers(token)
        const movies = await getAllMovies(token)
        if (movies.error) return alert(movies.error)
        if (users.error) return alert(users.error)
        dispatch({ type: "LOAD_DATA", payload: { users, movies } })

    }
    const logOut = () => {
        sessionStorage.clear()
    }

    useEffect(() => {
        fetchData()
    }, [])


    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex)
    }
    const getButtonStyle = (buttonIndex) => {
        return { backgroundColor: activeButton == buttonIndex ? 'yellow' : 'white' }
    }

    return (
        <div>
            <h1 style={{ paddingRight: "160px", fontFamily: "Ariel", justifyContent: "center", display: "flex", color: "blue" }}>Hello {sessionStorage.getItem('fullName')}</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>

                <Link to={'./movies/allmovies'}><Button style={getButtonStyle(1)} onClick={() => handleButtonClick(1)}>Movies</Button></Link>
                <Link to={'./subscriptions'}><Button style={getButtonStyle(2)} onClick={() => handleButtonClick(2)}>Subscriptions</Button></Link>
                <Link to={'./users/allusers'}><Button style={getButtonStyle(3)} onClick={() => handleButtonClick(3)}>Users Management</Button></Link>
                <Link to={'/'}><Button onClick={logOut}>Log Out</Button></Link>
            </div> <br />

            <div style={{ border: "2px solid red" }}><Outlet /></div>
        </div>
    )
}
