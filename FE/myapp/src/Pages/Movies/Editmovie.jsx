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
        width: 80%;
        font-size: 25px;
        border: 3px solid green;
        padding: 1rem;
    `;

export default function Editmovie() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movie = useSelector((store) => store.movies).find(movie => movie._id === id);

    const [formData, setFormData] = useState({ _id: "", name: '', genres: [], image: '', premiered: '' });
    const [toUpdate, setToUpdate] = useState(false)

    useEffect(() => {
        if (movie) {
            setFormData({
                _id: id || '',
                name: movie.name || '',
                genres: movie.genres || [],
                image: movie.image || '',
                premiered: movie.premiered || ''
            });
        }
    }, [movie]);

    useEffect(() => {
        if (toUpdate) {
            dispatch({ type: "UPDATE_MOVIE", payload: formData })
            alert("Successfully Updated!")
            navigate('/menu/movies/allmovies')
        }
    }, [toUpdate])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = () => {
        if (formData.name === "" || formData.image === "" || formData.premiered === "" || formData.genres === '') {
            return document.getElementById("msg").innerText = "Details is missing"
        }
        const genresArr = []
        genresArr.push(formData.genres)
        setFormData({ ...formData, genres: genresArr })
        setToUpdate(true)
    }

    return (
        <div>
            <h2>Edit Movies: {formData.name}</h2>
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
                    <strong>Genres: </strong>
                    <input
                        style={{ fontSize: "20px", width: "80%" }}
                        type='text'
                        name='genres'
                        defaultValue={formData.genres}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    <strong>Image: </strong>
                    <input
                        style={{ fontSize: '20px', width: "80%" }}
                        type="text"
                        name="image"
                        defaultValue={formData.image}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    <strong>Premiered: </strong>
                    <input
                        style={{ fontSize: '20px', width: "23%" }}
                        type="date"
                        name="premiered"
                        defaultValue={formData.premiered}
                        onChange={handleInputChange}
                    />
                </label>
                <Button onClick={handleUpdate}>Update</Button>
                <Button onClick={() => navigate('/menu/movies/allmovies')}>Back</Button>
            </Div>
        </div>
    )
}
