import { createMember, deleteMember, updateMember } from "./MemberService";
import { createMovie, deleteMovie, updateMovie } from "./MoviesService";
import { createSub, deleteSub, updateSub } from "./SubscriptionService";
import { createUser, deleteUser, updateUser } from "./UserService";

const saveToServer = async (token, store) => {
    try {
        for (const key in store) {
            if (store.hasOwnProperty(key)) {
                const array = store[key];
                for (const element of array) {
                    if (!element.status) break;

                    if (key === 'users') {
                        if (element.status === "NEW") {
                            await createUser(token, element);
                        } else if (element.status === "UPDATED") {
                            await updateUser(token, element);
                        } else {
                            await deleteUser(token, element._id);
                        }

                    } else if (key === 'movies') {
                        if (element.status === "NEW") {
                            await createMovie(token, element);
                        } else if (element.status === "UPDATED") {
                            await updateMovie(token, element);
                        } else {
                            await deleteMovie(token, element._id);
                        }

                    } else if (key === 'members') {
                        if (element.status === "NEW") {
                            await createMember(token, element);
                        } else if (element.status === "UPDATED") {
                            await updateMember(token, element);
                        } else {
                            await deleteMember(token, element._id);
                        }
                    } else if (key === 'subscriptions') {
                        if (element.status === "NEW") {
                            await createSub(token, element);
                        } else if (element.status === "UPDATED") {
                            await updateSub(token, element);
                        } else {
                            await deleteSub(token, element._id);
                        }
                    }
                }
            }
        }
        window.location.reload()
        return "saved"
    } catch (error) {
        return error;
    }
};

export { saveToServer };
