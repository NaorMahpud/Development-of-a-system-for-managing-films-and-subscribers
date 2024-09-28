import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 } from 'uuid'

const Button = styled.button`
    background-color: #C0C0C10; 
    color: black;
    padding: 8px 20px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    margin: 10px 40px;
    &:hover {
      background-color: #C0C0C9;
    }   
  `;
const Div = styled.div`
        width: 30%;
        border: 3px solid green;
        padding: 1rem;
    `;

export default function AddMemberPage() {
  const [formData, setFormData] = useState({ name: "", email: '', city: "" })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCreation = () => {
    if (formData.name === '' || formData.email === '' || formData.city === '') {
      setTimeout(() => {
        document.getElementById('msg').innerText = 'All fields required!'
        setTimeout(() => { document.getElementById('msg').innerText = '' }, 2000)
      }, 1500)
      document.getElementById('msg').innerText = 'Details is missing'
    } else {
      const _id = v4()
      dispatch({ type: "ADD_MEMBER", payload: { ...formData, _id } })
      alert("Successfully Created!")
      navigate('/menu/subscriptions/allmembers')
    }
  }

  return (
    <div style={{ paddingBottom: "10px" }}>
      <p id='msg' style={{ fontSize: "27px", color: "blue" }}></p>
      <Div>
        <label style={{ fontSize: "24px" }}>
          Name: <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ fontSize: "20px", width: "50%" }} type='text' /> <br />
          Email: <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ fontSize: "20px", width: "50%" }} type='email' /> <br />
          City: <input onChange={(e) => setFormData({ ...formData, city: e.target.value })} style={{ fontSize: "20px", width: "50%" }} type='text' /> <br />
        </label>
        <Button onClick={handleCreation}>Create</Button>
      </Div>
    </div>
  )
}
