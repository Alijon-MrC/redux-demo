const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREM = "BUY_ICECREM";

function buyCake(data) {
  return {
    type: BUY_CAKE,
    data,
    info: "First redux action",
  };
}

function buyIceCream(data) {
  return {
    type: BUY_ICECREM,
    info: "First redux action",
  };
}

// const initialState = {
//   numOfCake: 10,
// };

const initialCake = {
  numOfCake: 10,
};

const initialIceCream = {
  numOfIceCream: 20,
};

const cakeReduser = (state = initialCake, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      };

    default:
      return state;
  }
};

const iceCreamReduser = (state = initialIceCream, action) => {
  switch (action.type) {
    case BUY_ICECREM:
      return {
        numOfIceCream: state.numOfIceCream - 1,
      };
    default:
      return state;
  }
};

const rootReduser = combineReducers({
  cake: cakeReduser,
  iceCream: iceCreamReduser,
});

const store = createStore(rootReduser, applyMiddleware(logger));
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake(1));
store.dispatch(buyCake(3));
store.dispatch(buyCake(3));
store.dispatch(buyIceCream(1));
store.dispatch(buyIceCream(1));
store.dispatch(buyIceCream(1));

store.dispatch(buyCake(2));
unsubscribe();
