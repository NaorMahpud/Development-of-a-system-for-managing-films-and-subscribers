import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
background-color: #C0C0C10; 
color: black;
padding: 8px 20px;
font-size: 18px;
cursor: pointer;
border-radius: 5px;
margin: 10px 30px;
&:hover {
  background-color: #C0C0C9;
}   
`;

const Div = styled.div`
        width: 40%;
        border: 3px solid green;
        padding: 1rem;
        font-size: 24px;
    `;

export default function EditMember() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector((store) => store.members).find(member => member._id === id);

  const [formData, setFormData] = useState({ _id: "", name: '', email: "", city: "" });

  useEffect(() => {
    if (member) {
      setFormData({
        _id: id || '',
        name: member.name || '',
        email: member.email || '',
        city: member.city || ''
      });
    }
  }, [member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    if (formData.name === "" || formData.email === "" || formData.city === "" || formData._id === "") {
      document.getElementById("msg").innerText = "Details is missing"
    } else {
      dispatch({ type: "UPDATE_MEMBER", payload: formData })
      alert("Successfully Updated!")
      navigate('/menu/subscriptions/allmembers')
    }
  }

  return (
    <div>
      <h2>Edit Member: {formData.name}</h2>
      <p id='msg' style={{ fontSize: "27px" }}></p>
      <Div>
        <label>
          <strong>Name: </strong>
          <input
            style={{ fontSize: '20px', width: "80%" }}
            type="text"
            name="name"
            defaultValue={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <strong>Email: </strong>
          <input
            style={{ fontSize: "20px", width: "80%" }}
            type='text'
            name='email'
            defaultValue={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <strong>City: </strong>
          <input
            style={{ fontSize: '20px', width: "80%" }}
            type="text"
            name="city"
            defaultValue={formData.city}
            onChange={handleInputChange}
          />
        </label>

        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={() => navigate('/menu/subscriptions/allmembers')}>Back</Button>
      </Div>
    </div>
  )
}

