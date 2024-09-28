const initialState = {
    users: [],
    movies: [],
    members: [],
    subscriptions: []
};

// פונקציה כללית להעברת אובייקט להתחלת המערך עם שינוי סטטוס
const moveItemToStartWithStatus = (array, updatedItem, status) => {
    const filteredArray = array.filter(item => item._id !== updatedItem._id);
    return [{ ...updatedItem, status }, ...filteredArray];
};

export default function appReducer(store = initialState, action) {
    switch (action.type) {  
        case "LOAD_DATA":
            return {
                ...store,
                users: action.payload.users || [],
                movies: action.payload.movies || [],
                members: action.payload.members || [],
                subscriptions: action.payload.subscriptions || []
            };

        case "ADD_USER":
            return {
                ...store,
                users: [{ ...action.payload, status: 'NEW' }, ...store.users]
            };

        case "UPDATE_USER":
            return {
                ...store,
                users: moveItemToStartWithStatus(store.users, action.payload, action.payload.status === "NEW" ? "NEW" : "UPDATED")
            };

        case "DELETE_USER":
            if (action.payload.status === "NEW") {
                return {
                    ...store,
                    users: store.users.filter(user => user._id !== action.payload._id)
                };
            }
            return {
                ...store,
                users: moveItemToStartWithStatus(store.users, action.payload, "DELETED")
            };

        case "ADD_MOVIE":
            return {
                ...store,
                movies: [{ ...action.payload, status: 'NEW' }, ...store.movies]
            };

        case "UPDATE_MOVIE":
            return {
                ...store,
                movies: moveItemToStartWithStatus(store.movies, action.payload, action.payload.status === "NEW" ? "NEW" : "UPDATED")
            };

        case "DELETE_MOVIE":
            if (action.payload.status === "NEW") {
                return {
                    ...store,
                    movies: store.movies.filter(movie => movie._id !== action.payload._id)
                };
            }
            return {
                ...store,
                movies: moveItemToStartWithStatus(store.movies, action.payload, "DELETED")
            };

        case "ADD_MEMBER":
            return {
                ...store,
                members: [{ ...action.payload, status: 'NEW' }, ...store.members]
            };

        case "UPDATE_MEMBER":
            return {
                ...store,
                members: moveItemToStartWithStatus(store.members, action.payload, action.payload.status === "NEW" ? "NEW" : "UPDATED")
            };

        case "DELETE_MEMBER":
            if (action.payload.status === "NEW") {
                return {
                    ...store,
                    members: store.members.filter(member => member._id !== action.payload._id)
                };
            }
            return {
                ...store,
                members: moveItemToStartWithStatus(store.members, action.payload, "DELETED")
            };

        case "ADD_SUB":
            return {
                ...store,
                subscriptions: [{ ...action.payload, status: 'NEW' }, ...store.subscriptions]
            };

        case "UPDATE_SUB":
            return {
                ...store,
                subscriptions: moveItemToStartWithStatus(store.subscriptions, action.payload, action.payload.status === "NEW" ? "NEW" : "UPDATED")
            };

        default:
            return store;
    }
}
