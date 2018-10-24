import { Party } from "../models/customer";
import {
  Actions,
  CREATE_PARTY,
  DELETE_PARTY,
  RETRIEVE_PARTY
} from "../actions/customer.actions";

export interface State {
  readonly party: Party[];
}

const initialState: State = {
  party: [
    {
      id: "1",
      name: "Andrien",
      age: 27,
      active: true
    }
  ]
};

export function custReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case CREATE_PARTY:
      [...state.party, action.payload];
      return state;
    case DELETE_PARTY:
      //return state.party.filter(({ id }) => id !== action.id);
      return state;
    case RETRIEVE_PARTY:
      //return state.party.filter(({ id }) => id !== action.id);
      return state;
    default:
      return state;
  }
}
