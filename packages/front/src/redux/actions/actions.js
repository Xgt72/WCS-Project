export const ADD_BUILDING = 'ADD_BUILDING';
export const UPDATE_INDICATORS = 'UPDATE_INDICATORS';

export function addBuilding(building) {
  return { type: ADD_BUILDING, building };
}

export function updateIndicators(indicators) {
  return { type: UPDATE_INDICATORS, indicators };
}
