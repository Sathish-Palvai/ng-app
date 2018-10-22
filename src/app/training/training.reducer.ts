import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_AVAILABLE_PARTIES,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
  SET_AVAILABLE_PARTICIPANTS
} from "./training.actions";
import { Exercise } from "./exercise.model";
import { Parties } from "./parties.model";
import {ParticipantList} from "./participants.model";
import * as fromRoot from "../app.reducer";

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
  availableParties: Parties[];
  availableParticipants: ParticipantList[];
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
  availableParties: [],
  availableParticipants: []
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_AVAILABLE_PARTIES:
      return {
        ...state,
        availableParties: action.payload
      };
      case SET_AVAILABLE_PARTICIPANTS:
      return {
        ...state,
        availableParticipants: action.payload
      };  
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {
          ...state.availableExercises.find(ex => ex.id === action.payload)
        }
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>(
  "training"
);

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getAvailableParties = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableParties
);
export const getAvailableParticipants = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableParticipants
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);
