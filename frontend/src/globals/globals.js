// Variables
const auth0ClientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0RedirectUri = process.env.REACT_APP_REDIRECT_URI;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const subscriptionPlans = ['free', 'bronze', 'silver', 'gold'];

module.exports = {
  auth0ClientID,
  auth0Domain,
  auth0RedirectUri,
  backendUrl,
  subscriptionPlans
};
