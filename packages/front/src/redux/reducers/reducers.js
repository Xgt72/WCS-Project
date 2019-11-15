import {
  ADD_BUILDING,
  UPDATE_INDICATORS,
  INIT_BUILDINGS,
  INIT_ACTIVITIES_TEMPLATE,
  UPDATE_ACTIVITY_SELECTED,
  DISPLAY_CHOOSE_ACTIVITIES,
  ADD_ACTIVITIES_FOR_A_DAY_IN_CMC
} from '../actions/actions';

const initialState = {
  playerId: 1,
  playerIndicators: [],
  playerBuildings: [],
  playerCampusManagers: [],
  playerTeachers: [],
  chooseActivitiesIsDisplay: false,
  activitiesTemplate: [],
  activitySelected: -1,
  campusManagerCalendar: [],
};

function rootReducer(state = initialState, action) {


  let updatedState = { ...state };
  switch (action.type) {
    case ADD_BUILDING:
      updatedState.playerBuildings = [...updatedState.playerBuildings, action.building];
      return updatedState;

    case INIT_BUILDINGS:
      updatedState.playerBuildings = [];
      return updatedState;

    case UPDATE_INDICATORS:
      updatedState.playerIndicators = action.indicators;
      return updatedState;

    case INIT_ACTIVITIES_TEMPLATE:
      updatedState.activitiesTemplate = action.activities;
      return updatedState;

    case UPDATE_ACTIVITY_SELECTED:
      updatedState.activitySelected = action.activityId;
      return updatedState;

    case DISPLAY_CHOOSE_ACTIVITIES:
      updatedState.chooseActivitiesIsDisplay = action.value;
      return updatedState;

    case ADD_ACTIVITIES_FOR_A_DAY_IN_CMC:
      let activitiesDay = action.activities.morning.day;
      updatedState.campusManagerCalendar = [...updatedState.campusManagerCalendar];
      updatedState.campusManagerCalendar[activitiesDay - 1] = action.activities;
      return updatedState;

    default:
      return updatedState;
  }
}

export default rootReducer;
