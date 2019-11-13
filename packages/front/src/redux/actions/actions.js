export const ADD_BUILDING = 'ADD_BUILDING';
export const UPDATE_INDICATORS = 'UPDATE_INDICATORS';
export const INIT_BUILDINGS = "INIT_BUILDINGS";

export function addBuilding(building) {
  return { type: ADD_BUILDING, building };
}

export function initBuildings() {
  return { type: INIT_BUILDINGS };
}

export function updateIndicators(indicators) {
  return { type: UPDATE_INDICATORS, indicators };
}
