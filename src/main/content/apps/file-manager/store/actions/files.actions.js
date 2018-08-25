import axios from 'axios/index';

export const GET_TRACKS = '[FILE MANAGER APP] GET FILES';

export function getFiles() {
  const request = axios.get('/api/file-manager-app/files');

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_TRACKS,
        payload: response.data
      })
    );
}
