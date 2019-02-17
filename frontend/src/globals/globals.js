// Variables
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0ClientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const auth0RedirectUri = process.env.REACT_APP_REDIRECT_URI;

module.exports = {
  backendUrl,
  auth0Domain,
  auth0ClientID,
  auth0RedirectUri,
};
