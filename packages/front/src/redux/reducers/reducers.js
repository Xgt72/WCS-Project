import {
  ADD_BUILDING,
  UPDATE_INDICATORS,
  INIT_BUILDINGS,
  INIT_ACTIVITIES_TEMPLATE,
  DISPLAY_CHOOSE_ACTIVITIES,
  ADD_ACTIVITY_IN_CMC,
  REMOVE_ACTIVITY_IN_CMC,
  CAMPUS_MANAGER_ID_CALENDAR_TO_DISPLAY,
  UPDATE_CAMPUS_MANAGERS_OFFICE,
  DISPLAY_HIRE_CAMPUS_MANAGER,
  CAMPUS_MANAGER_CALENDAR_IS_SAVED,
  UPDATE_PLAYER_TOKEN,
  UPDATE_PLAYER_ID,
  UPDATE_IS_LOGGED
} from '../actions/actions';

const initialState = {
  playerId: 1,
  playerToken: null,
  isLogged: false,
  playerIndicators: [],
  playerBuildings: [],
  chooseActivitiesIsDisplay: false,
  activitiesTemplate: [],
  activitySelected: -1,
  campusManagerOneCalendar: {
    campusManagerId: 0,
    calendar: [],
    isSaved: false
  },
  campusManagerTwoCalendar: {
    campusManagerId: 0,
    calendar: [],
    isSaved: false
  },
  campusManagersOffice: [],
  campusManagerIdToDisplaySchedule: 0,
  hireCampusManagerIsDisplay: false,
};

function rootReducer(state = initialState, action) {

  let previousCalendar = [];
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

    case DISPLAY_CHOOSE_ACTIVITIES:
      updatedState.chooseActivitiesIsDisplay = action.value;
      return updatedState;

    case ADD_ACTIVITY_IN_CMC:
      if (action.campusManagerId === updatedState.campusManagerOneCalendar.campusManagerId) {
        previousCalendar = [...updatedState.campusManagerOneCalendar.calendar];
        updatedState.campusManagerOneCalendar = { ...state.campusManagerOneCalendar };
        updatedState.campusManagerOneCalendar.calendar = addActivity(previousCalendar, action);
      } else if (action.campusManagerId === updatedState.campusManagerTwoCalendar.campusManagerId) {
        previousCalendar = [...updatedState.campusManagerTwoCalendar.calendar];
        updatedState.campusManagerTwoCalendar = { ...state.campusManagerTwoCalendar };
        updatedState.campusManagerTwoCalendar.calendar = addActivity(previousCalendar, action);
      }
      return updatedState;

    case REMOVE_ACTIVITY_IN_CMC:
      if (action.campusManagerId === updatedState.campusManagerOneCalendar.campusManagerId) {
        previousCalendar = [...updatedState.campusManagerOneCalendar.calendar];
        updatedState.campusManagerOneCalendar = { ...state.campusManagerOneCalendar };
        updatedState.campusManagerOneCalendar.calendar = removeActivity(previousCalendar, action);
      } else {
        previousCalendar = [...updatedState.campusManagerTwoCalendar.calendar];
        updatedState.campusManagerTwoCalendar = { ...state.campusManagerTwoCalendar };
        updatedState.campusManagerTwoCalendar.calendar = removeActivity(previousCalendar, action);
      }
      return updatedState;


    case CAMPUS_MANAGER_ID_CALENDAR_TO_DISPLAY:
      updatedState.campusManagerIdToDisplaySchedule = action.campusManagerId;
      return updatedState;

    case UPDATE_CAMPUS_MANAGERS_OFFICE:
      updatedState.campusManagersOffice = [...action.campusManagers];
      if (updatedState.campusManagersOffice.length === 1) {
        updatedState.campusManagerOneCalendar = { ...state.campusManagerOneCalendar };
        updatedState.campusManagerOneCalendar.campusManagerId = updatedState.campusManagersOffice[0].id;
      } else if (updatedState.campusManagersOffice.length === 2) {
        updatedState.campusManagerOneCalendar = { ...state.campusManagerOneCalendar };
        updatedState.campusManagerOneCalendar.campusManagerId = updatedState.campusManagersOffice[0].id;
        updatedState.campusManagerTwoCalendar = { ...state.campusManagerTwoCalendar };
        updatedState.campusManagerTwoCalendar.campusManagerId = updatedState.campusManagersOffice[1].id;
      }
      return updatedState;

    case DISPLAY_HIRE_CAMPUS_MANAGER:
      updatedState.hireCampusManagerIsDisplay = action.value;
      return updatedState;

    case CAMPUS_MANAGER_CALENDAR_IS_SAVED:
      if (action.campusManagerId === updatedState.campusManagersOffice[0].id) {
        updatedState.campusManagerOneCalendar = { ...state.campusManagerOneCalendar };
        updatedState.campusManagerOneCalendar.isSaved = !updatedState.campusManagerOneCalendar.isSaved;
      } else if (action.campusManagerId === updatedState.campusManagersOffice[1].id) {
        updatedState.campusManagerTwoCalendar = { ...state.campusManagerTwoCalendar };
        updatedState.campusManagerTwoCalendar.isSaved = !updatedState.campusManagerTwoCalendar.isSaved;
      }
      return updatedState;

    case UPDATE_PLAYER_TOKEN:
      updatedState.playerToken = action.playerToken;
      return updatedState;
    
    case UPDATE_PLAYER_ID:
      updatedState.playerId = action.playerId;
      return updatedState;

    case UPDATE_IS_LOGGED:
      updatedState.isLogged = !updatedState.isLogged;
      return updatedState;

    default:
      return updatedState;
  }
}

function addActivity(previousCalendar, action) {
  let updatedCalendar = [];
  let toAdd = true;

  if (previousCalendar.length > 0) {
    updatedCalendar = previousCalendar.map(activity => {
      if (activity.day === action.activity.day && activity.morning === action.activity.morning) {
        activity = action.activity;
        toAdd = false;
      }
      return activity;
    });
  }

  if (toAdd) {
    updatedCalendar = [...previousCalendar, action.activity];
  }
  return updatedCalendar;
}

function removeActivity(previousCalendar, action) {
  let indexToRemove = null;

  previousCalendar.map((activity, index) => {
    if (activity.day === action.activity.day && activity.morning === action.activity.morning) {
      indexToRemove = index;
    }
    return activity;
  });

  if (indexToRemove != null) {
    previousCalendar.splice(indexToRemove, 1);
  }
  return previousCalendar;
}

export default rootReducer;
