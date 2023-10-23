/* eslint-disable no-unused-vars */
// Make a copy of this file and save it as config.js (in the js directory).

// Set this to the base URL of your sample server, such as 'https://your-app-name.herokuapp.com'.
// Do not include the trailing slash. See the README for more information:

export const SAMPLE_SERVER_BASE_URL = 'https://opentok-tokbox-api-production.up.railway.app';

// OR, if you have not set up a web server that runs the learning-opentok-php code,
// set these values to OpenTok API key, a valid session ID, and a token for the session.
// For test purposes, you can obtain these from https://tokbox.com/account.

export let API_KEY = '';
export let SESSION_ID = '';
export let TOKEN = '';

export const loadConfig = () => {
    return fetch(SAMPLE_SERVER_BASE_URL + '/session')
      .then((response) => response.json())
      .then((json) => {
        const { apiKey, sessionId, token } = json;
        API_KEY = apiKey;
        SESSION_ID = sessionId;
        TOKEN = token;

        return json;
      })
}