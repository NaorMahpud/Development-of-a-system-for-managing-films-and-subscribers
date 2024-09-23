import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { login } from './Services/LoginRegService'

export default function LoginPage() {

    const labelStyle = {
        display: "flex",
        justifyContent: "center",
        fontSize: "20px",
    }

    const [UnameAndPassword, setUnameAndPassword] = useState({ username: "", password: "" })
    const navigate = useNavigate()

    const handleLogin = async () => {
        const token = localStorage.getItem('token')
        const par = document.getElementById('msg')
        const resp = await login(token, UnameAndPassword)
        if (resp.error) return par.innerText = resp.error
        sessionStorage.setItem('token', resp.token)
        sessionStorage.setItem('fullName', resp.fullName)
        par.innerText = resp.status


        setTimeout(() => {
            navigate('/menu')
        }, 1100)
    }


    return (
        <div style={{ border: "2px solid black", paddingRight: "300px" }}>

            <form style={{ marginButtom: "200px" }}>
                <h2 style={{ fontSize: '34px', display: "flex", justifyContent: "center" }}>Log in Page</h2>
                <label style={labelStyle}>
                    User name: <input onChange={(e) => setUnameAndPassword({ ...UnameAndPassword, username: e.target.value })} type="text" placeholder="Username" /> <br />
                </label>
                <label style={labelStyle}>
                    Password : <input onChange={(e) => setUnameAndPassword({ ...UnameAndPassword, password: e.target.value })} type="text" placeholder="Password" /> <br />
                </label> <br />
                <label style={labelStyle}>
                    <br></br>
                    <button style={{ padding: "10px" }} type='button' onClick={() => handleLogin()}>Login</button> <br />
                </label><br />
                <label style={labelStyle}>
                    New User ? : <Link to={'/createAccount'}>Create Account</Link>
                </label>
                <label style={labelStyle}><p style={{ color: "red", fontSize: "24px" }} id="msg"></p></label>
            </form>

        </div>
    )
}
