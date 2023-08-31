import {
  DRAFT,
  PUBLISHED,
  WAITING,
} from "../actions/types/newsAdminFilterStatusTypes";

const initState = {
  filterState: {
    statusFilter: null,
    nameFilter: "Статус",
  },
};

export default function newsAdminFilterReducer(state = initState, action) {
  switch (action.type) {
    case DRAFT: {
      return { filterState: action.payload };
    }
    case PUBLISHED: {
      return { filterState: action.payload };
    }
    case WAITING: {
      return { filterState: action.payload };
    }
    default:
      return state;
  }
}
