import React, { useState } from 'react'
import { register } from './Services/LoginRegService'
import { useNavigate } from 'react-router-dom'


export default function CreateAccPage() {
    const labelStyle = {
        display: "flex",
        justifyContent: "center",
        fontSize: "20px",
    }

    const navigate = useNavigate()
    const [userAndPassword, setUserAndPassword] = useState({ username: "", password: "" })

    const handleCreation = async () => {
        const par = document.getElementById('msg')
        const resp = await register(userAndPassword)
        if (resp.error) return par.innerText = resp.error
        par.innerText = resp.status
        setTimeout(() => {
            navigate('/')
        }, 1100)
    }

    return (
        <div style={{ border: "2px solid black" }}>
            <div style={{ paddingRight: "300px" }}>
                <h2 style={{ display: "flex", justifyContent: "center", fontSize: "27px" }}>Create An Account</h2>
                <label style={labelStyle}>
                    User name: <input onChange={(e) => setUserAndPassword({ ...userAndPassword, username: e.target.value })} type='text' placeholder='Username' /> <br />
                </label>
                <label style={labelStyle}>
                    Password: <input onChange={(e) => setUserAndPassword({ ...userAndPassword, password: e.target.value })} type='text' placeholder='Password' /> <br />
                </label> <br />
                <label style={labelStyle}><button type='button' onClick={() => handleCreation()}>Create</button>
                    <button onClick={() => navigate('/')}>Back</button></label>
                <label style={labelStyle}><p style={{ color: "red", fontSize: "22px" }} id="msg"></p></label>
                <br />
            </div>
        </div>
    )
}
