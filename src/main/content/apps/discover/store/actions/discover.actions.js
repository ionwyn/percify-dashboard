import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

export const SGET_TOKENS = 'SGET_TOKENS';
export const SGET_RECOMMEND = 'SGET_RECOMMEND';
export const SGET_FAILURE = 'SGET_FAILURE';
export const SGET_SUGGESTIONS_SUCCESS = 'SGET_SUGGESTIONS_SUCCESS';
export const SGET_SUGGESTIONS_FAILURE = 'SGET_SUGGESTIONS_FAILURE';

export function getToken() {
  const accessToken = spotifyApi.getAccessToken()
    ? spotifyApi.getAccessToken()
    : JSON.parse(sessionStorage.getItem('userToken')).access_token;
  spotifyApi.setAccessToken(accessToken);
  return { type: SGET_TOKENS, accessToken };
}

export function getRecommendation(seedObject) {
  return dispatch => {
    spotifyApi
      .getRecommendations(seedObject)
      .then(data => {
        // console.log(data);
        let dataItems = data.tracks.map(function(tile) {
          // console.log(tile);
          let o = Object.assign({}, tile);
          o.img = tile.album.images[2].url;
          return o;
        });
        console.log('sharmoota');
        dispatch({ type: SGET_RECOMMEND, data: dataItems });
      })
      .catch(e => {
        dispatch({ type: SGET_FAILURE, error: e });
        console.log('bitch');
      });
  };
}

export function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return dispatch => {
    spotifyApi
      .search(inputValue + '*')
      .then(data => {
        const dataItems = data;
        console.log(dataItems);
        dispatch({ type: SGET_SUGGESTIONS_SUCCESS, data: dataItems });
      })
      .catch(e => {
        dispatch({ type: SGET_SUGGESTIONS_FAILURE });
        console.log('oiaosdiasdnk');
      });
  };
}
