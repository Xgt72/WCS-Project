import {
  ADD_BUILDING,
  UPDATE_INDICATORS,
  INIT_BUILDINGS,
  INIT_ACTIVITIES_TEMPLATE,
  DISPLAY_CHOOSE_ACTIVITIES,
  ADD_ACTIVITY_IN_CMC,
  REMOVE_ACTIVITY_IN_CMC,
  CAMPUS_MANAGER_ID_CALENDAR
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
  campusManagerCalendar: {
    campusManagerId: 1,
    calendar: [],
  },
};

function rootReducer(state = initialState, action) {


  let updatedState = { ...state };
  let previousCalendar = [...updatedState.campusManagerCalendar.calendar];

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
      updatedState.campusManagerCalendar = { ...state.campusManagerCalendar };
      
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

      updatedState.campusManagerCalendar.calendar = updatedCalendar;
      return updatedState;

    case REMOVE_ACTIVITY_IN_CMC:
      updatedState.campusManagerCalendar = { ...state.campusManagerCalendar };

      previousCalendar = [...updatedState.campusManagerCalendar.calendar];
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

      updatedState.campusManagerCalendar.calendar = previousCalendar;
      return updatedState;


    case CAMPUS_MANAGER_ID_CALENDAR:
      updatedState.campusManagerCalendar = { ...state.campusManagerCalendar };
      updatedState.campusManagerCalendar.campusManagerId = action.campusManagerId;
      return updatedState;

    default:
      return updatedState;
  }
}

export default rootReducer;
