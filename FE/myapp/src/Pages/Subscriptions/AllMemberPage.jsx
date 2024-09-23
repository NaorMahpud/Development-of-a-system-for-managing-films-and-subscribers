import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 30px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    margin: 20px 10px;
    &:hover {
        background-color: #45a049;
    }
`;

const MemberCard = styled.div`
    width: 350px;
    border: 3px solid black;
    margin: 20px ;
    padding: 1rem;
    background-color: #f9f9f9;
    margin-left: 10px;
    font-size: 23px;
    padding: 10px;
    list-style-type: none;
`;

const WatchedMoviesSection = styled.div`
    border: 1px solid black;
    padding: 10px;
    font-size: 25px
`;

const MembersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

export default function AllMembersPage() {
    const [selectedMember, setSelectedMember] = useState("");
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const [showSubscribeForm, setShowSubscribeForm] = useState(false);
    const [watchDate, setWatchDate] = useState('');

    const store = useSelector((store) => store);
    const members = store.members;
    const movies = store.movies;
    const subscriptions = store.subscriptions;

    const dispatch = useDispatch();

    const filteredMembers = members.filter(member => !member.status || member.status !== "DELETED");

    const handleDeleteMember = (member) => {
        dispatch({ type: "DELETE_MEMBER", payload: member });
        alert("Successfully Deleted");
    };

    const handleSubscribeClick = (member) => {
        if (selectedMember) {
            if (selectedMember._id === member._id) {
                setShowSubscribeForm(false);
                setSelectedMember("");
            }
        } else {
            setSelectedMember(member);
            setShowSubscribeForm(true);

            const memberSubscription = subscriptions.find(sub => sub.memberId === member._id);
            const memberMovies = memberSubscription ? memberSubscription.movies : [];

            const unwatched = movies.filter(movie => !memberMovies.some(m => m.movieId === movie._id));
            setUnwatchedMovies(unwatched);
        }
    };

    return (
        <div>
            <MembersContainer>
                {filteredMembers.map(member => (
                    <MemberCard key={member._id}>
                        <h1 style={{ fontSize: "35px" }}>{member.name}</h1>
                        <p><strong>Email:</strong> {member.email}</p>
                        <p><strong>City:</strong> {member.city}</p>

                        <Link to={`/menu/subscriptions/editmember/${member._id}`}>
                            <Button>Edit</Button>
                        </Link>
                        <Button onClick={() => handleDeleteMember(member)}>Delete</Button>

                        <WatchedMoviesSection>
                            <h4>Movies Watched</h4>
                            <Button onClick={() => handleSubscribeClick(member)}>Subscribe to new movie</Button>

                            {selectedMember && selectedMember._id === member._id && showSubscribeForm && (
                                <div style={{ border: "2px solid red", margin: "10px", padding: "10px" }}>
                                    <h5>Add a new movie</h5>
                                    <select value={unwatchedMovies} onChange={(e) => setUnwatchedMovies(e.target.value)}>
                                        <option value="">Select movie</option>
                                        {unwatchedMovies.map(movie => (
                                            <option key={movie._id} value={movie._id}>{movie.name}</option>
                                        ))}
                                    </select>
                                    <input type="date" value={watchDate} onChange={(e) => setWatchDate(e.target.value)} />
                                    <Button onClick={handleSubscribeClick}>Subscribe</Button>
                                </div>
                            )}


                        </WatchedMoviesSection>
                    </MemberCard>
                ))}
            </MembersContainer>
        </div>
    );
}
