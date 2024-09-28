import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { checkToken } from '../Services/CheckToken';

const Button = styled.button`
        background-color: #C0C0C10; 
        color: black;
        padding: 8px 20px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 5px;
        margin: 20px;
        margin-bottom: -10px;
        &:hover {
            background-color: #C0C0C9;
        }   
    `;
const Div = styled.div`
        width: 450px;
        border: 3px solid green;
        padding: 1rem;
    `;

export default function AddUserPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = sessionStorage.getItem('token')

    const checkToken1 = async () => {
        const validation = await checkToken(token)
        if (validation.status !== "valid") {
            sessionStorage.clear()
            sessionStorage.setItem('msg', "Invalid token")
            return navigate('/')
        }
    }
    useEffect(() => {
        checkToken1()
    })

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        sessionTimeOut: 0,
        createdDate: new Date().toISOString().split('T')[0],
        permissions: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setFormData((prevData) => {
            let updatedPermissions = [...prevData.permissions];

            if (checked) {
                if (value === 'Create Subscriptions' || value === 'Update Subscriptions' || value === 'Delete Subscriptions') {
                    if (!updatedPermissions.includes('View Subscriptions')) {
                        updatedPermissions.push('View Subscriptions');
                    }
                }

                if (value === 'Create Movies' || value === 'Update Movies' || value === 'Delete Movies') {
                    if (!updatedPermissions.includes('View Movies')) {
                        updatedPermissions.push('View Movies');
                    }
                }
                updatedPermissions.push(value);
            } else {
                if (value === "View Subscriptions" &&
                    (updatedPermissions.includes('Create Subscriptions') ||
                        updatedPermissions.includes('Update Subscriptions') ||
                        updatedPermissions.includes('Delete Subscriptions'))) {
                } else if (value === "View Movies" &&
                    (updatedPermissions.includes('Create Movies') ||
                        updatedPermissions.includes('Update Movies') ||
                        updatedPermissions.includes('Delete Movies'))) {
                } else {
                    updatedPermissions = updatedPermissions.filter((perm) => perm !== value);
                }

            }

            return { ...prevData, permissions: updatedPermissions };
        });
    };

    const handleCreation = () => {
        if (formData.firstName === '' || formData.lastName === '' || formData.username === '') {
            setTimeout(() => {
                document.getElementById('msg').innerText = 'First Name, Last Name and Username are required';
                setTimeout(() => { document.getElementById('msg').innerText = "" }, 3000)
            }, 1500)
            return document.getElementById('msg').innerText = 'Details is missing';
        }
        const id = v4();
        dispatch({ type: 'ADD_USER', payload: { _id: id, ...formData } });
        alert("Successfully Created!!")
        navigate('/menu/users/allusers');
    };

    return (
        <div>
            <p id='msg' style={{ fontSize: "27px", color: "blue" }}></p>
            <Div style={{ border: '2px solid green', width: '30%' }}>
                <form style={{ padding: '1rem', fontSize: '24px' }}>
                    <label>
                        <strong>First Name: </strong>
                        <input
                            style={{ fontSize: '20px' }}
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        <strong>Last Name: </strong>
                        <input
                            style={{ fontSize: '20px' }}
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        <strong>Username: </strong>
                        <input
                            style={{ fontSize: '20px' }}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        <strong>Session Time Out(Min): </strong>
                        <input
                            style={{ fontSize: '20px' }}
                            type="number"
                            name="sessionTimeOut"
                            value={+formData.sessionTimeOut}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <strong>Permissions:</strong> <br />
                    <input
                        type="checkbox"
                        value="View Subscriptions"
                        checked={formData.permissions.includes('View Subscriptions')}
                        onChange={handleCheckboxChange}
                    /> View Subscriptions
                    <br />
                    <input
                        type="checkbox"
                        value="Create Subscriptions"
                        checked={formData.permissions.includes('Create Subscriptions')}
                        onChange={handleCheckboxChange}
                    /> Create Subscriptions
                    <br />
                    <input
                        type="checkbox"
                        value="Update Subscriptions"
                        checked={formData.permissions.includes('Update Subscriptions')}
                        onChange={handleCheckboxChange}
                    /> Update Subscriptions
                    <br />
                    <input
                        type="checkbox"
                        value="Delete Subscriptions"
                        checked={formData.permissions.includes('Delete Subscriptions')}
                        onChange={handleCheckboxChange}
                    /> Delete Subscriptions
                    <br />
                    <input
                        type="checkbox"
                        value="View Movies"
                        checked={formData.permissions.includes('View Movies')}
                        onChange={handleCheckboxChange}
                    /> View Movies
                    <br />
                    <input
                        type="checkbox"
                        value="Create Movies"
                        checked={formData.permissions.includes('Create Movies')}
                        onChange={handleCheckboxChange}
                    /> Create Movies
                    <br />
                    <input
                        type="checkbox"
                        value="Update Movies"
                        checked={formData.permissions.includes('Update Movies')}
                        onChange={handleCheckboxChange}
                    /> Update Movies
                    <br />
                    <input
                        type="checkbox"
                        value="Delete Movies"
                        checked={formData.permissions.includes('Delete Movies')}
                        onChange={handleCheckboxChange}
                    /> Delete Movies
                    <br />
                    <Button type="button" onClick={handleCreation}>
                        Create
                    </Button>
                </form>

            </Div>
        </div>
    );
}
