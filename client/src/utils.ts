export function changeValueReducer(state: any, action: any) {
  return {
    ...state,
    [action.name]: action.value,
  }
}
