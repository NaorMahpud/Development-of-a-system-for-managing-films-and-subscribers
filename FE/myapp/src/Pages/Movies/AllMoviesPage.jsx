import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 10px 40px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 5px;
        margin: 20px 32px;
        &:hover {
            background-color: #45a049;
        }
        &:disabled {
            background-color: grey;
            cursor: not-allowed;
        }
    `;

const MovieCard = styled.div`
        height: auto;
        display: flex;
        width: 550px;
        border: 3px solid black;
        margin: 20px 0;
        padding: 1rem;
        background-color: #f9f9f9;
    `;

const MovieDetails = styled.div`
        margin-left: 20px;
        font-size: 23px;
        flex-grow: 1;
    `;

const SubscriptionsContainer = styled.div`
        border: 1px solid black;
        margin-top: 10px;
        padding: 10px;
    `;

const SubscriptionsList = styled.ul`
        padding: 0;
        margin: 0;
        list-style-type: none;
    `;

const UsersContainer = styled.div`
        display: flex;
        flex-wrap: wrap; 
        justify-content: space-evenly;
    `;

const MovieImage = styled.img`
        width: 150px;
        height: 200px;
    `;

export default function AllMovies() {
    const movies = useSelector((store) => store.movies);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const permissions = (sessionStorage.getItem('permission')).split(',') || [];
    const role = sessionStorage.getItem('role')
    const canUpdateMovie = role === "Admin" || permissions.includes('Update Movies');
    const canDeleteMovie = role === "Admin" || permissions.includes('Delete Movies');

    const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchTerm.toLowerCase()) && movie.status !== "DELETED");

    const handleDeleteButton = (movie) => {
        dispatch({ type: "DELETE_MOVIE", payload: movie });
        alert("Successfully Deleted");
    };

    return (
        <div>
            <label style={{ fontSize: "25px", margin: "1px 8px" }}>
                <strong>Find Movie: </strong>
                <input onChange={(e) => setSearchTerm(e.target.value)} style={{ fontSize: "20px", width: "18%" }} type='text' placeholder=" Search by movie's name" />
            </label>
            <UsersContainer>
                {filteredMovies.map(movie => (
                    <MovieCard key={movie._id}>
                        <MovieImage src={movie.image} alt={`${movie.name} poster`} />

                        <MovieDetails>
                            <strong><label>{movie.name} - {movie.premiered.split('-')[0]}</label></strong>
                            <div>
                                Genres: {movie.genres.map((genre, index) => {
                                    return <label key={index}>{genre}, </label>;
                                })}
                            </div>

                            <SubscriptionsContainer>
                                <strong>Subscriptions watched</strong>
                                <SubscriptionsList>

                                </SubscriptionsList>
                            </SubscriptionsContainer>

                            <div>
                                <Link to={`/menu/movies/editmovie/${movie._id}`}>
                                    <Button disabled={!canUpdateMovie}>Edit</Button>

                                </Link>
                                <Button disabled={!canDeleteMovie} onClick={() => handleDeleteButton(movie)}>Delete</Button>

                            </div>
                        </MovieDetails>
                    </MovieCard>
                ))}
            </UsersContainer>
            <Outlet />
        </div>
    );
}
