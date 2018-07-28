import Spotify from 'spotify-web-api-js';
import { setSpotifyUserData } from 'auth/store/actions/user.actions';

const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_LOGIN_SUCCESS = 'SPOTIFY_LOGIN_SUCCESS';

/** set the app's access and refresh tokens */
export function setTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
    sessionStorage.setItem(
      'userToken',
      JSON.stringify({ access_token: accessToken, refresh_token: refreshToken })
    );
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

/* get the user's info from the /me api */
export function getMyInfo() {
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN });
    spotifyApi
      .getMe()
      .then(data => {
        // Tell our parent components that user is now logged in
        dispatch(setSpotifyUserData(data));

        // Store the userData in local storage.
        sessionStorage.setItem('userData', JSON.stringify(data));

        // Send data to some component as props
        dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
      })
      .catch(e => {
        dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
      });
  };
}
