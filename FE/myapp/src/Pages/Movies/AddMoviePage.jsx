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
        font-size: 25px;
        width: 70%;
        border: 3px solid green;
        padding: 1rem;
    `;

export default function AddMoviePage() {
    const [formData, setFormData] = useState({ name: "", genres: [], image: "", premiered: "" })
    const [toUpdate, setToUpdate] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (toUpdate) {
            const id = v4()
            dispatch({ type: "ADD_MOVIE", payload: { ...formData, _id: id } })
            alert("Successfully Created!")
            navigate('/menu/movies/allmovies')
        }

    }, [toUpdate, dispatch])

    const handleCreation = () => {
        if (formData.name === '' || formData.image === '' || formData.premiered === '') {
            setTimeout(() => {
                document.getElementById('msg').innerText = 'All fields required!'
                setTimeout(() => { document.getElementById('msg').innerText = '' }, 2000)
            }, 1500)
            return document.getElementById('msg').innerText = 'Details is missing'
        }
        const genresArr = []
        genresArr.push(formData.genres)
        setFormData({ ...formData, genres: genresArr })
        setToUpdate(true)
    }

    return (
        <div style={{ paddingBottom: "10px" }}>
            <p id='msg' style={{ fontSize: "27px", color: "blue" }}></p>
            <Div>
                <label>
                    Name: <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ fontSize: "20px", width: "70%" }} type='text' /> <br />
                    Genres: <input onChange={(e) => setFormData({ ...formData, genre: e.target.value })} style={{ fontSize: "20px", width: "70%" }} type='text' /> <br />
                    image URL: <input onChange={(e) => setFormData({ ...formData, image: e.target.value })} style={{ fontSize: "20px", width: "70%" }} type='text' /> <br />
                    Premiered: <input onChange={(e) => setFormData({ ...formData, premiered: e.target.value })} style={{ fontSize: "20px", width: "23%" }} type='date' /> <br />
                </label>
                <Button onClick={handleCreation}>Create</Button>
            </Div>
        </div>
    )
}
