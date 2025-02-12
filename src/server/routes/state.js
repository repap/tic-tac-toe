let state = {};

export function createStateHandler(updateFunctions) {
  return {
    updateState: (newState) => {
      state = { ...state, ...newState };

      updateFunctions.forEach((fn) => fn(state));
    },
  };
}
