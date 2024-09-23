const initialState = {
    users: [],
    movies: [],
    subscriptions: []
};

export default function appReducer(store = initialState, action) {

    switch (action.type) {
        case "LOAD_DATA":
            return {
                ...store,
                users: action.payload.users || [],
                movies: action.payload.movies || [],
                subscriptions: action.payload.subscriptions || []
            }
        case "ADD_USER":
            return {
                ...store,
                users: [...store.users, { ...action.payload, status: 'NEW' }]
            }
        case "UPDATE_USER":
            const users = store.users.map(user => {
                if (user._id === action.payload._id) {
                    return (user.status === "NEW" ? { ...action.payload, status: "NEW" } : { ...action.payload, status: "UPDATED" })
                }
                return user
            })
            return {
                ...store,
                users
            }
        case "DELETE_USER":
            if (action.payload.status === "NEW") {
                return {
                    ...store,
                    users: store.users.filter(user => user._id !== action.payload._id)
                }
            }
            return {
                ...store,
                users: store.users.map(user => user._id === action.payload._id ? { ...action.payload, status: "DELETED" } : user)
            }
        case "ADD_MOVIE":
            return {
                ...store,
                movies: [...store.movies, { ...action.payload, status: 'NEW' }]
            }
        case "UPDATE_MOVIE":
            const movies = store.movies.map(movie => {
                if (movie._id === action.payload._id) {
                    return (movie.status === "NEW" ? { ...action.payload, status: "NEW" } : { ...action.payload, status: "UPDATED" })
                }
                return movie
            })
            return {
                ...store,
                movies
            }
        case "DELETE_MOVIE":
            if (action.payload.status === "NEW") {
                return {
                    ...store,
                    movies: store.movies.filter(movie => movie._id !== action.payload._id)
                }
            }
            return {
                ...store,
                movies: store.movies.map(movie => movie._id === action.payload._id ? { ...action.payload, status: "DELETED" } : movie)
            }

        default:
            return store
    }
}       
