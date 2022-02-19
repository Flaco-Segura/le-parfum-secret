import { STORIES_FETCH_FAILURE, STORIES_FETCH_INIT, STORIES_FETCH_SUCCESS, REMOVE_STORY } from '../actions/actions';

import { StoriesState, StoriesAction } from '../types/StoriesReducerType';

const storiesReducer = (state: StoriesState, action: StoriesAction) => {
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REMOVE_STORY:
      return {
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        )
      }
    default:
      throw new Error();
  }
}

export default storiesReducer;