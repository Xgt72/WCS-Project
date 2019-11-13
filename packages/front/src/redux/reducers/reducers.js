import { ADD_BUILDING, UPDATE_INDICATORS, INIT_BUILDINGS } from '../actions/actions';

const initialState = {
  playerId: 1,
  playerIndicators: [],
  playerBuildings: [],
  playerCampusManagers: [],
  playerTeachers: [],
};

function rootReducer(state = initialState, action) {
  const updatedState = { ...state };
  switch (action.type) {
    case ADD_BUILDING:
      updatedState.playerBuildings = [...updatedState.playerBuildings, action.building];
      return updatedState;

    case INIT_BUILDINGS:
      console.log("Init buildings");
      updatedState.playerBuildings = [];
      return updatedState;

    case UPDATE_INDICATORS:
      updatedState.playerIndicators = action.indicators;
      return updatedState;

    default:
      return updatedState;
  }
}

export default rootReducer;
