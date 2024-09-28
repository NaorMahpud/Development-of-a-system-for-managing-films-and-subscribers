import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v4 } from 'uuid';

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 6px 12px; 
    font-size: 14px; 
    cursor: pointer;
    border-radius: 5px;
    margin: 4px 2px; 
    &:hover {
        background-color: #45a049;
    }
    &:disabled {
        background-color: grey;
        cursor: not-allowed;
    }    
`;

const MemberCard = styled.div`
    width: 300px;
    border: 2px solid black;
    padding: 0.5rem; 
    background-color: #f9f9f9;
    font-size: 16px; 
    list-style-type: none;
    position: relative; /* חשוב שהקופסה תישאר relative כדי שנוכל למקם את הטופס */
    margin-bottom: 8px; 
`;

const WatchedMoviesSection = styled.div`
    border: 1px solid black;
    padding: 5px; 
    font-size: 16px;
    margin-top: 4px; 
`;

const MembersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px; 
`;

const SubscribeForm = styled.div`
    border: 2px solid red;
    margin: 5px 0;
    padding: 6px; 
    position: sticky; 
    background-color: #fff;
`;

const MovieList = styled.ul`
    padding: 0;
    margin: 0;
    list-style-type: none;
`;

const MovieItem = styled.li`
    margin: 5px 0;
`;

export default function AllMembersPage() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const [subcribedMovieData, setSubcribedMovieData] = useState({ movieId: "", date: "" });

    const permissions = (sessionStorage.getItem('permission')).split(',') || []
    const role = sessionStorage.getItem('role')
    const canUpdateSub = role === "Admin" || permissions.includes('Update Subscriptions')
    const canDeleteSub = role === "Admin" || permissions.includes('Delete Subscriptions')

    const store = useSelector((store) => store);
    const members = store.members;
    const movies = store.movies;
    const subscriptions = store.subscriptions;
    const dispatch = useDispatch();

    const filteredMembers = members.filter(member => !member.status || member.status !== "DELETED");

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (`0${today.getMonth() + 1}`).slice(-2); // מוסיף 0 אם החודש הוא חד ספרתי
        const day = (`0${today.getDate()}`).slice(-2); // מוסיף 0 אם היום הוא חד ספרתי
        return `${year}-${month}-${day}`;
    };

    const handleDeleteMember = (member) => {
        dispatch({ type: "DELETE_MEMBER", payload: member });
        alert("Successfully Deleted");
    };

    const handleSubscribeClick = (member) => {
        if (selectedMember && selectedMember._id === member._id) {
            setSelectedMember(null);
        } else {
            setSelectedMember(member);
            if (member) {
                const memberSubscription = subscriptions.find(sub => sub.memberId === member._id);
                if (memberSubscription) {
                    const memberWatchMovies = memberSubscription.movies;
                    const unwatched = movies.filter(movie => !memberWatchMovies.some(m => m.movieId === movie._id));
                    setUnwatchedMovies(unwatched);
                } else setUnwatchedMovies(movies);

            } else {
                if (subcribedMovieData.movieId === '' || subcribedMovieData.date === '') {
                    alert("Movie and date are required");
                } else {
                    const memberSubscription = subscriptions.find(sub => sub.memberId === selectedMember._id);
                    if (memberSubscription) {
                        memberSubscription.movies.push(subcribedMovieData);
                        console.log(memberSubscription)
                        dispatch({ type: "UPDATE_SUB", payload: memberSubscription });
                        alert("Succesfully Subscribed")
                        setSubcribedMovieData({ movieId: "", date: "" });
                    } else {
                        const _id = v4();
                        const subObj = {
                            _id,
                            memberId: selectedMember._id,
                            movies: [subcribedMovieData]
                        };
                        dispatch({ type: "ADD_SUB", payload: subObj });
                        alert("Succesfully Subscribed")
                        setSubcribedMovieData({ movieId: "", date: "" });
                    }
                }
            }
        }
    };

    return (
        <div>
            <MembersContainer>
                {filteredMembers.map(member => {
                    const memberSubscription = subscriptions.find(sub => sub.memberId === member._id);
                    const watchedMovies = memberSubscription ? memberSubscription.movies : [];

                    return (
                        <MemberCard key={member._id}>
                            <h1 style={{ fontSize: "20px", margin: "0 0 5px 0" }}>{member.name}</h1>
                            <p style={{ margin: "0 0 5px 0" }}><strong>Email:</strong> {member.email}</p>
                            <p style={{ margin: "0 0 5px 0" }}><strong>City:</strong> {member.city}</p>

                            <Link to={`/menu/subscriptions/editmember/${member._id}`}>
                                <Button disabled={!canUpdateSub}>Edit</Button>
                            </Link>
                            <Button disabled={!canDeleteSub} onClick={() => handleDeleteMember(member)}>Delete</Button><br />

                            <WatchedMoviesSection>
                                <h4 style={{ margin: "0 0 5px 0" }}>Movies Watched:  {watchedMovies.length}</h4>
                                <Button onClick={() => handleSubscribeClick(member)}>Subscribe to new movie</Button>

                                {selectedMember && selectedMember._id === member._id && (
                                    <SubscribeForm>
                                        <h5 style={{ margin: "0 0 5px 0" }}>Add a new movie</h5>
                                        <select onChange={(e) => setSubcribedMovieData({ ...subcribedMovieData, movieId: e.target.value })}>
                                            <option value="">Select movie</option>
                                            {unwatchedMovies.map(movie => (
                                                <option key={movie._id} value={movie._id}>{movie.name}</option>
                                            ))}
                                        </select>
                                        <input min={getCurrentDate()} type="date" value={subcribedMovieData.date} onChange={(e) => setSubcribedMovieData({ ...subcribedMovieData, date: e.target.value })} />
                                        <Button onClick={() => handleSubscribeClick(false)}>Subscribe</Button>
                                    </SubscribeForm>
                                )}

                                <MovieList>
                                    {watchedMovies.map(movie => {
                                        const movieDetails = movies.find(m => m._id === movie.movieId);
                                        
                                        return (
                                            <MovieItem key={movie.movieId}>
                                                <Link><strong>{movieDetails ? movieDetails.name : 'Unknown Movie'}</strong></Link> , {movie.date}
                                            </MovieItem>
                                        );
                                    })}
                                </MovieList>

                            </WatchedMoviesSection>
                        </MemberCard>
                    );
                })}
            </MembersContainer>
        </div>
    );
}
