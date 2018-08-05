import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

export const SGET_TOKENS = 'SGET_TOKENS';
export const SGET_RECOMMEND = 'SGET_RECOMMEND';
export const SGET_FAILURE = 'SGET_FAILURE';

export function getToken() {
  const accessToken = spotifyApi.getAccessToken()
    ? spotifyApi.getAccessToken()
    : JSON.parse(sessionStorage.getItem('userToken')).access_token;
  spotifyApi.setAccessToken(accessToken);
  return { type: SGET_TOKENS, accessToken };
}

export function getRecommendation() {
  return dispatch => {
    spotifyApi.getRecommendations({ insert_objet }).then(data => {
      console.log(data);
    });
  };
}
