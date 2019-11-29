export const ADD_BUILDING = 'ADD_BUILDING';
export const UPDATE_INDICATORS = 'UPDATE_INDICATORS';
export const INIT_BUILDINGS = "INIT_BUILDINGS";
export const INIT_ACTIVITIES_TEMPLATE = "INIT_ACTIVITIES_TEMPLATE";
export const DISPLAY_CHOOSE_ACTIVITIES = "DISPLAY_CHOOSE_ACTIVITIES";
export const ADD_ACTIVITY_IN_CMC = "ADD_ACTIVITY_IN_CMC";
export const REMOVE_ACTIVITY_IN_CMC = "REMOVE_ACTIVITY_IN_CMC";
export const CAMPUS_MANAGER_ID_CALENDAR_TO_DISPLAY = "CAMPUS_MANAGER_ID_CALENDAR_TO_DISPLAY";
export const UPDATE_CAMPUS_MANAGERS_OFFICE = "UPDATE_CAMPUS_MANAGERS_OFFICE";
export const DISPLAY_HIRE_CAMPUS_MANAGER = "DISPLAY_HIRE_CAMPUS_MANAGER";
export const CAMPUS_MANAGER_CALENDAR_IS_SAVED = "CAMPUS_MANAGER_CALENDAR_IS_SAVED";
export const UPDATE_PLAYER_TOKEN = "UPDATE_PLAYER_TOKEN";
export const UPDATE_PLAYER_ID = "UPDATE_PLAYER_ID";
export const UPDATE_IS_LOGGED = "UPDATE_IS_LOGGED";

export function addBuilding(building) {
  return { type: ADD_BUILDING, building: building };
}

export function initBuildings() {
  return { type: INIT_BUILDINGS };
}

export function updateIndicators(indicators) {
  return { type: UPDATE_INDICATORS, indicators: indicators };
}

export function initActivitiesTemplate(activities) {
  return { type: INIT_ACTIVITIES_TEMPLATE, activities: activities };
}

export function displayChooseActivities(value) {
  return { type: DISPLAY_CHOOSE_ACTIVITIES, value: value };
}

export function addActivityInCMC(activity, campusManagerId) {
  return { type: ADD_ACTIVITY_IN_CMC, activity: activity, campusManagerId: campusManagerId };
}

export function removeActivityInCMC(activity, campusManagerId) {
  return { type: REMOVE_ACTIVITY_IN_CMC, activity: activity, campusManagerId: campusManagerId };
}

export function campusManagerIdCalendarToDisplay(campusManagerId) {
  return { type: CAMPUS_MANAGER_ID_CALENDAR_TO_DISPLAY, campusManagerId: campusManagerId };
}

export function updateCampusManagersOffice(campusManagers) {
  return { type: UPDATE_CAMPUS_MANAGERS_OFFICE, campusManagers: campusManagers };
}

export function displayHireCampusManager(value) {
  return { type: DISPLAY_HIRE_CAMPUS_MANAGER, value: value };
}

export function campusManagerCalendarIsSaved(campusManagerId) {
  return { type: CAMPUS_MANAGER_CALENDAR_IS_SAVED, campusManagerId: campusManagerId };
}

export function updatePlayerToken(token) {
  return { type: UPDATE_PLAYER_TOKEN, playerToken: token };
}

export function updatePlayerId(id) {
  return { type: UPDATE_PLAYER_ID, playerId: id };
}

export function updateIsLogged() {
  return { type: UPDATE_IS_LOGGED };
}