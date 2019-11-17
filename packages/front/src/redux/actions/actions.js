export const ADD_BUILDING = 'ADD_BUILDING';
export const UPDATE_INDICATORS = 'UPDATE_INDICATORS';
export const INIT_BUILDINGS = "INIT_BUILDINGS";
export const INIT_ACTIVITIES_TEMPLATE = "INIT_ACTIVITIES_TEMPLATE";
export const DISPLAY_CHOOSE_ACTIVITIES = "DISPLAY_CHOOSE_ACTIVITIES";
export const ADD_ACTIVITY_IN_CMC = "ADD_ACTIVITY_IN_CMC";
export const REMOVE_ACTIVITY_IN_CMC = "REMOVE_ACTIVITY_IN_CMC";
export const CAMPUS_MANAGER_ID_CALENDAR = "CAMPUS_MANAGER_ID_CALENDAR";

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

export function addActivityInCMC(activity) {
  return { type: ADD_ACTIVITY_IN_CMC, activity: activity };
}

export function removeActivityInCMC(activity) {
  return { type: REMOVE_ACTIVITY_IN_CMC, activity: activity };
}

export function campusManagerIdCalendar(campusManagerId) {
  return { type: CAMPUS_MANAGER_ID_CALENDAR, campusManagerId: campusManagerId };
}