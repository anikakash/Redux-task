// reducer.jsx
import {
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
} from './Actions';

const initialState = [];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];

    case UPDATE_TASK:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updateTask }
          : task
      );

    case REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload.id);

    case TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              status: task.status === 'todo' ? 'completed' : 'todo',
            }
          : task
      );

    default:
      return state;
  }
};

export default taskReducer;
