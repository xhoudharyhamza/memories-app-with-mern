// create reducer function
let reducer = (state, action) => {
  switch (action.type) {
    case "SET_MEMORIES":
      return {
        ...state,
        memories: action.payload,
      };
    case "ADD_MEMORY":
      return {
        ...state,
        memories: [...state.memories, action.payload],
      };
    case "DELETE_MEMORY":
      return {
        ...state,
        memories: action.payload,
      };
      case "INCREASE_LIKES":
        return{
          ...state,
          memories:action.payload
        }
    default:
      return {
        ...state,
      };
      break;
  }
};
export default reducer;