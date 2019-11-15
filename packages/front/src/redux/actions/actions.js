export const ADD_BUILDING = 'ADD_BUILDING';
export const UPDATE_INDICATORS = 'UPDATE_INDICATORS';
export const INIT_BUILDINGS = "INIT_BUILDINGS";
export const INIT_ACTIVITIES_TEMPLATE = "INIT_ACTIVITIES_TEMPLATE";
export const UPDATE_ACTIVITY_SELECTED = "UPDATE_ACTIVITY_SELECTED";
export const DISPLAY_CHOOSE_ACTIVITIES = "DISPLAY_CHOOSE_ACTIVITIES";
export const ADD_ACTIVITIES_FOR_A_DAY_IN_CMC = "ADD_ACTIVITIES_FOR_A_DAY_IN_CMC";

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

export function updateActivitySelected(activityId) {
  return { type: UPDATE_ACTIVITY_SELECTED, activityId: activityId };
}

export function displayChooseActivities(value) {
  return { type: DISPLAY_CHOOSE_ACTIVITIES, value: value };
}

export function addActivitiesForADayInCMC(activities) {
  return { type: ADD_ACTIVITIES_FOR_A_DAY_IN_CMC, activities: activities };
}