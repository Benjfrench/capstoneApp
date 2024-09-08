export const templateReducerActions = {
  // ACTION TYPES
  FIRST_ACTION: "FIRST_ACTION",
  SECTION_ACTION: "SECTION_ACTION",
};

export function templateReducer(state, action) {
  // TELL ME WHAT ACTION IS FIRED
  console.log("Action is fired:", state.type);

  const cloneOfState = { ...state };
  switch (action.type) {
    case templateReducerActions.FIRST_ACTION:
      // insert change of state based on action here
      return cloneOfState;
    case templateReducerActions.SECTION_ACTION:
      // insert change of state based on action here
      return cloneOfState;

    default:
      return cloneOfState;
  }
}
