import mock from './mock';

const spotifyDB = [
  {
    value: 'Thinking',
    count: 21
  },
  {
    value: 'Here Comes The Sun - Remastered',
    count: 16
  },
  {
    value: 'Animal Spirits',
    count: 8
  },
  {
    value: 'Blimp',
    count: 7
  },
  {
    value: '(They Long To Be) Close To You',
    count: 6
  }
];

mock.onGet('/api/spotify-analytics').reply(config => {
  return [200, spotifyDB];
});
