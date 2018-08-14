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

export function getTopTracks(timeRange = 'medium_term') {
  return dispatch => {
    spotifyApi
      .getMyTopTracks({ time_range: timeRange })
      .then(({ items }) => {
        let dataItems = items.map(tile => {
          let o = Object.assign({}, tile);
          o.img = tile.album.images[0].url;
          return o;
        });
        dispatch({ type: SGET_TRACKS, data: dataItems });
      })
      .catch(e => {
        dispatch({ type: SGET_FAILURE, error: e });
      });
  };
}

export function getTopArtist(timeRange = 'medium_term') {
  return dispatch => {
    spotifyApi
      .getMyTopArtists({ time_range: timeRange })
      .then(({ items }) => {
        let dataItems = items.map(tile => {
          let o = Object.assign([], tile);
          o.img = tile.images[0].url;
          return o;
        });
        dispatch({ type: SGET_ARTISTS, data: dataItems });
      })
      .catch(e => {
        dispatch({ type: SGET_FAILURE, error: e });
      });
  };
}
