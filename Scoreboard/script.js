// select dom elements
const addBaord = document.getElementById("addScoreBaord");
const allMatchesContainer = document.querySelector(".all-matches");
const reset = document.getElementById("reset");
const remove = document.querySelector(".lws-delete");

// actions identifiers
const ADD_MATCH = "add-match";
const INCREMENT = "increment";
const DECREMENT = "decrement";
const DELETE_MATCH = "delete-match";
const RESET_ALL = "reset";

// initial state
const initialContainer = [
  {
    id: 1,
    title: "Match 1",
    total: 0,
  },
];

// reducer
function matchReducer(state = initialContainer, action) {
  switch (action.type) {
    case ADD_MATCH:
      const newMatch = {
        id: Date.now(),
        title: `Match ${state.length + 1}`,
        total: 0,
      };
      return [...state, newMatch];

    case INCREMENT:
      return state.map((match) =>
        match.id === action.payload.id
          ? { ...match, total: match.total + action.payload.value }
          : match
      );

    case DECREMENT:
      return state.map((match) =>
        match.id === action.payload.id
          ? {
              ...match,
              total: Math.max(0, match.total - action.payload.value),
            }
          : match
      );

    case RESET_ALL:
      return state.map((match) => ({
        ...match,
        total: 0,
      }));

    case DELETE_MATCH:
      if (state.length === 1) {
        return state; // Prevent deletion if it's the last match
      }
      return state.filter((match) => match.id !== action.payload);

    default:
      return state;
  }
}

// create store
const store = Redux.createStore(matchReducer);

// template
const createMatch = (match) => {
  const { id, title, total } = match;
  return `
    <div class="match">
      <div class="wrapper">
        <button class="lws-delete" onclick="deleteMatch(${id})">
          <img src="./Img/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName">${title}</h3>
      </div>
      <div class="inc-dec">
        <form onsubmit='incrementValue(event, ${id})' class="incrementForm">
          <h4>Increment</h4>
          <input type="number" name="increment" class="lws-increment" />
        </form>
        <form onsubmit='decrementValue(event, ${id})' class="decrementForm">
          <h4>Decrement</h4>
          <input type="number" name="decrement" class="lws-decrement" />
        </form>
      </div>
      <div class="numbers">
        <h2 class="lws-singleResult" id="counter">${total}</h2>
      </div>
    </div>
  `;
};

// render function
const render = () => {
  const matches = store.getState();
  const matchEls = matches.map((match) => createMatch(match));
  allMatchesContainer.innerHTML = matchEls.join("");
};

// initial render
// render();

// subscribe to store updates
store.subscribe(render);

// button click event
addBaord.addEventListener("click", () => {
  store.dispatch({
    type: ADD_MATCH,
  });
});

// increment
function incrementValue(event, id) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const value = Number(input.value);
  if (value > 0) {
    store.dispatch({
      type: INCREMENT,
      payload: { id, value },
    });
  }
  input.value = "";
}

// decrement
function decrementValue(event, id) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const value = Number(input.value);
  if (value > 0) {
    store.dispatch({
      type: DECREMENT,
      payload: { id, value },
    });
  }
  input.value = "";
}

// reset
reset.addEventListener("click", () => {
  store.dispatch({
    type: RESET_ALL,
  });
});


// remove card
function deleteMatch(id) {
  store.dispatch({
    type: DELETE_MATCH,
    payload: id,
  });
}
