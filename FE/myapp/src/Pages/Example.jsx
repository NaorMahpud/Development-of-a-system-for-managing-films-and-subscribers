import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



export default function ExamplePage() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const [newMovie, setNewMovie] = useState('');
    const [watchDate, setWatchDate] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const members = useSelector((store) => store.members);
    const movies = useSelector((store) => store.movies);

    // useEffect(() => {
    //     dispatch(fetchMembers());
    //     dispatch(fetchMovies());
    // }, [dispatch]);

    const handleDelete = (memberId) => {
        dispatch(deleteMember(memberId));
    };

    const handleSubscribeClick = (member) => {
        setSelectedMember(member);
        const memberMoviesIds = member.movies.map(m => m.movieId);
        const unwatched = movies.filter(movie => !memberMoviesIds.includes(movie._id));
        setUnwatchedMovies(unwatched);
    };

    const handleSubscribeToMovie = () => {
        if (newMovie && watchDate) {
            const subscription = { movieId: newMovie, watchDate };
            dispatch(subscribeToMovie(selectedMember._id, subscription));
            setSelectedMember(null); // Reset selection after subscription
        }
    };

    return (
        <div>
            {members.map((member) => (
                <div key={member._id} style={{ border: "2px solid black", margin: "10px", padding: "10px" }}>
                    <h3>{member.name}</h3>
                    <p>Email: {member.email}</p>
                    <p>City: {member.city}</p>

                    <Link to={`/menu/members/edit/${member._id}`}><button>Edit</button></Link>
                    <button onClick={() => handleDelete(member._id)}>Delete</button>

                    <div style={{ border: "2px solid black", padding: "10px", marginTop: "10px" }}>
                        <h4>Movies Watched</h4>
                        <button onClick={() => handleSubscribeClick(member)}>Subscribe to new movie</button>

                        {selectedMember && selectedMember._id === member._id && (
                            <div style={{ border: "2px solid red", margin: "10px", padding: "10px" }}>
                                <h5>Add a new movie</h5>
                                <select value={newMovie} onChange={(e) => setNewMovie(e.target.value)}>
                                    <option value="">Select movie</option>
                                    {unwatchedMovies.map(movie => (
                                        <option key={movie._id} value={movie._id}>{movie.name}</option>
                                    ))}
                                </select>
                                <input type="date" value={watchDate} onChange={(e) => setWatchDate(e.target.value)} />
                                <button onClick={handleSubscribeToMovie}>Subscribe</button>
                            </div>
                        )}

                        {/* <ul>
                            {member.movies.map((movie) => (
                                <li key={movie.movieId}>
                                    <Link to={`/menu/movies/${movie.movieId}`}>{movie.name}</Link>, {new Date(movie.watchDate).toLocaleDateString()}
                                </li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            ))}
        </div>
    );
}
