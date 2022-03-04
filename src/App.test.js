import { fireEvent, queryByText, render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

import stories from './test_helpers/test_helpers'
import { act } from 'react-dom/test-utils';

jest.mock('axios');

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App', () => {
  test('succeeds fetching data', async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      }
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument();

    await act(() => promise);

    expect(screen.queryByText(/Loading/)).toBeNull();

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
    expect(screen.getAllByText('Dismiss').length).toBe(2);
  });

  test('fails fetching data', async () => {
    const promise = Promise.reject();

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();

    try {
      await act(() => promise);
    } catch (error) {
      expect(screen.queryByText(/Loading/)).toBeNull();
      expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
    }
  });

  test('removes a story', async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await act(() => promise);

    expect(screen.getAllByText('Dismiss').length).toBe(2);
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Dismiss')[0]);

    expect(screen.getAllByText('Dismiss').length).toBe(1);
    expect(screen.queryByText('Jordan Walke')).toBeNull();
  });

  test('searches for specific stories', async () => {
    const reactPromise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    const anotherStory = {
      title: 'JavaScript',
      url: 'https://en.wikipedia.org/wiki/JavaScript',
      author: 'Brendan Eich',
      num_comments: 15,
      points: 10,
      objectID: 3,
    };

    const javascriptPromise = Promise.resolve({
      data: {
        hits: [anotherStory],
      },
    });

    axios.get.mockImplementation((url) => {
      if (url.includes('React')) {
        return reactPromise;
      }

      if (url.includes('JavaScript')) {
        return javascriptPromise;
      }
    });

    // Initial Render

    render(<App />);

    // First Data Fetching

    await act(() => reactPromise);

    expect(screen.queryByDisplayValue('React')).toBeInTheDocument();
    expect(screen.queryAllByDisplayValue('JavaScript')).toBeNull();

    expect(screen.queryByText('Jordan Walke')).toBeInTheDocument();

    expect(
      screen,queryByText('Dan Abramov, Andrew Clark')
    ).toBeInTheDocument();
    expect(screen.queryByText('Bredan Eich')).toBeNull();

    // User Interaction -> Search

    fireEvent.change(screen.queryAllByDisplayValue('React'), {
      target: {
        value: 'JavaScript',
      },
    });

    expect(screen.queryAllByDisplayValue('React')).toBeNull();
    expect(
      screen.queryAllByDisplayValue('JavaScript')
    ).toBeInTheDocument();

    fireEvent.submit(screen.queryByText('Submit'));

    // Second Data Fetching

    await act(() => javascriptPromise);

    expect(screen.queryByText('Jordan Walke')).toBeNull();
    expect(
      screen.queryByText('Dan Abramov, Andrew Clark')
    ).toBeNull();
    expect(screen.queryByText('Brendan Eich')).toBeInTheDocument();
  });
});
