const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_USERS":
      return { ...state, users: [...action.payload] };

    case "SET_QUESTIONS":
      return { ...state, questions: [...action.payload] };

    case "ADD_QUESTION":
      return { ...state, questions: [...state.questions, action.payload] };

    case "DELETE_QUESTION":
      return {
        ...state,
        questions: state.questions.filter(
          (item) => item?._id !== action.payload
        ),
      };

    case "VOTE_QUESTION":
      const { q, id } = action.payload;
      const arr = state.questions.map((item) => {
        if (item._id === id) return { ...q };
        return item;
      });

      return {
        ...state,
        questions: arr,
      };

    case "SET_ANSWERS":
      return { ...state, answers: [...action.payload] };

    case "ADD_ANSWER":
      return { ...state, answers: [...state.answers, action.payload] };

    case "VOTE_ANSWER":
      const { ans, ansId } = action.payload;
      const temp = state.answers.map((item) => {
        if (item._id === ansId) return { ...ans };
        return item;
      });

      return {
        ...state,
        answers: temp,
      };

    case "DELETE_ANSWER":
      return {
        ...state,
        answers: state.answers.filter((item) => item?._id !== action.payload),
      };

    default:
      return state;
  }
};

export default AppReducer;
