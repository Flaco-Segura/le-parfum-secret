import { storiesReducer } from './storiesReducer';

import { REMOVE_STORY } from '../actions/actions';

import { stories,  storyOne, storyTwo } from '../test_helpers/test_helpers'

describe('storiesReducer', () => {
  test('removes a story from all stories', () => {
    const action = { type: REMOVE_STORY, payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    }

    expect(newState).toStrictEqual(expectedState);
  });
})