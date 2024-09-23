import { createMovie, deleteMovie, updateMovie } from "./MoviesService";
import { createUser, deleteUser, updateUser } from "./UserService";

const saveToServer = async (token, store) => {
    try {
        for (const key in store) {
            if (store.hasOwnProperty(key)) {
                const array = store[key];
                for (const element of array) {
                    if (!element.status) continue;

                    if (key === 'users') {
                        if (element.status === "NEW") {
                            delete element.status
                            const resp = await createUser(token, element);
                            element._id = resp.user._id
                        } else if (element.status === "UPDATED") {
                            delete element.status
                            await updateUser(token, element);
                        } else {
                            await deleteUser(token, element._id);
                            const index = array.findIndex(user => user._id === element._id)
                            array.splice(index, 1)
                        }

                    } else if (key === 'movies') {
                        if (element.status === "NEW") {
                            delete element.status
                            const resp = await createMovie(token, element);
                            element._id = resp.movie._id
                        } else if (element.status === "UPDATED") {
                            delete element.status
                            await updateMovie(token, element);
                        } else {
                            await deleteMovie(token, element._id);
                            const index = array.findIndex(movie => movie._id === element._id)
                            array.splice(index, 1)
                        }

                    } else if (key === 'subscriptions') {

                    }
                }
            }
        }

        alert('Saved All Changes')
    } catch (error) {
        return error;
    }
};

export { saveToServer };
