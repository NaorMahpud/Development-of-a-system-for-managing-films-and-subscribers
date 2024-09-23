import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
background-color: #C0C0C10; 
color: black;
padding: 8px 20px;
font-size: 18px;
cursor: pointer;
border-radius: 5px;
margin: 10px;
&:hover {
  background-color: #C0C0C9;
}   
`;

const Div = styled.div`
        width: 450px;
        border: 3px solid green;
        padding: 1rem;
    `;

export default function EditUser() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.users).find((user) => user._id === id);

    const [formData, setFormData] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        username: '',
        sessionTimeOut: 0,
        createdDate: '',
        permissions: [],
    });

    useEffect(() => {
        if (user) {
            setFormData({
                _id: id || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                username: user.username || '',
                sessionTimeOut: user.sessionTimeOut || 0,
                createdDate: user.createdDate || '',
                permissions: user.permissions || [],
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setFormData((prevData) => {
            let updatedPermissions = [...prevData.permissions];

            if (checked) {
                if (value === "Create Subscriptions" || value === "Update Subscriptions" || value === "Delete Subscriptions") {
                    if (!updatedPermissions.includes("View Subscriptions")) {
                        updatedPermissions.push("View Subscriptions");
                    }
                }

                if (value === "Create Movies" || value === "Update Movies" || value === "Delete Movies") {
                    if (!updatedPermissions.includes("View Movies")) {
                        updatedPermissions.push("View Movies");
                    }
                }

                updatedPermissions.push(value);
            } else {
                updatedPermissions = updatedPermissions.filter((perm) => perm !== value);


                if (value === "Create Subscriptions" || value === "Update Subscriptions" || value === "Delete Subscriptions") {
                    if (!updatedPermissions.includes("Create Subscriptions") &&
                        !updatedPermissions.includes("Update Subscriptions") &&
                        !updatedPermissions.includes("Delete Subscriptions")
                    ) {
                        updatedPermissions = updatedPermissions.filter((perm) => perm !== "View Subscriptions");
                    }
                }

                if (value === "Create Movies" || value === "Update Movies" || value === "Delete Movies") {
                    if (
                        !updatedPermissions.includes("Create Movies") &&
                        !updatedPermissions.includes("Update Movies") &&
                        !updatedPermissions.includes("Delete Movies")
                    ) {
                        updatedPermissions = updatedPermissions.filter((perm) => perm !== "View Movies");
                    }
                }
            }

            return { ...prevData, permissions: updatedPermissions };
        });
    };


    const handleUpdate = () => {
        if (formData.firstName === '' || formData.lastName === '' || formData.username === '') {
            return alert('Missing Details');
        }
        if (
            formData.firstName === user.firstName &&
            formData.lastName === user.lastName &&
            formData.username === user.username &&
            formData.sessionTimeOut === user.sessionTimeOut &&
            formData.createdDate === user.createdDate &&
            formData.permissions === user.permissions
        ) {
            return alert('No Change Was Made');
        }
        dispatch({ type: 'UPDATE_USER', payload: { _id: id, ...formData } });
        alert('Successfully Updated')

        navigate('/menu/users/allusers')

    };

    return (
        <div>
            <h2>Edit User: {formData.firstName} {formData.lastName}</h2>
            <Div style={{ border: '2px solid green', width: '30%', fontSize: '24px' }}>
                <label>
                    <strong>First Name:</strong>
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
                    <strong>Last Name:</strong>
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
                    <strong>Username:</strong>
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
                    <strong>Session Time Out(Min):</strong>
                    <input
                        style={{ fontSize: '20px' }}
                        type="number"
                        name="sessionTimeOut"
                        value={formData.sessionTimeOut}
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
                <Button onClick={handleUpdate} type="button">
                    Update
                </Button>
                <Button type="button" onClick={() => navigate('/menu/users/allusers')}>
                    Back
                </Button>
            </Div>


            <Outlet />
        </div>
    );
}
