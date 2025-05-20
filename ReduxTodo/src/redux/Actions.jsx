export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const FILTER_TASK = "FILTER_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const updateTask = (id, updateTask) => ({
    type: UPDATE_TASK,
    payload: {
        id, 
        updateTask,
    }
});

export const removeTask = (id) => ({
    type: REMOVE_TASK,
    payload: {
        id,
    }
});


// export const filterTask = (filter) => ({
//     type: FILTER_TASK,
//     payload: filter,
// })

// export const toggleTask = (id) => ({
//     type: TOGGLE_TASK,
//     payload: id,
// });