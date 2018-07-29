import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

// constants
export const SGET_TOKENS = 'SGET_TOKENS';
export const SGET_TRACKS = 'SGET_TRACKS';
export const SGET_ARTISTS = 'SGET_ARTISTS';
export const SGET_FAILURE = 'SGET_FAILURE';

export function getToken() {
  const accessToken = spotifyApi.getAccessToken()
    ? spotifyApi.getAccessToken()
    : JSON.parse(sessionStorage.getItem('userToken')).access_token;
  spotifyApi.setAccessToken(accessToken);
  return { type: SGET_TOKENS, accessToken };
}

export function getTopTracks() {
  return dispatch => {
    spotifyApi
      .getMyTopTracks()
      .then(data => {
        dispatch({ type: SGET_TRACKS, data: data });
      })
      .catch(e => {
        dispatch({ type: SGET_FAILURE, error: e });
      });
  };
}
