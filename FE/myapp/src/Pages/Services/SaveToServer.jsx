import { createMember, deleteMember, updateMember } from "./MemberService";
import { createMovie, deleteMovie, updateMovie } from "./MoviesService";
import { createSub, deleteSub, updateSub } from "./SubscriptionService";
import { createUser, deleteUser, updateUser } from "./UserService";

const saveToServer = async (token, store) => {
    try {
        const actions = {
            users: {
                NEW: createUser,
                UPDATED: updateUser,
                DELETED: deleteUser
            },
            movies: {
                NEW: createMovie,
                UPDATED: updateMovie,
                DELETED: deleteMovie
            },
            members: {
                NEW: createMember,
                UPDATED: updateMember,
                DELETED: deleteMember
            },
            subscriptions: {
                NEW: createSub,
                UPDATED: updateSub,
                DELETED: deleteSub
            }
        };

        const promises = [];

        for (const key in store) {
            if (store.hasOwnProperty(key) && actions[key]) {
                const array = store[key];

                for (const element of array) {
                    if (!element.status) {
                        break;
                    }

                    const actionType = element.status
                    const actionFunc = actions[key][actionType];

                    if (actionFunc) {
                        const actionPromise = actionType === "DELETED" ? actionFunc(token, element._id) : actionFunc(token, element);
                        promises.push(actionPromise);
                    }
                }
            }
        }
        const resp = await Promise.all(promises);
        console.log(await resp)
        //window.location.reload();
        return "saved";
    } catch (error) {
        return error;
    }
};


export { saveToServer };
