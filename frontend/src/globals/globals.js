// Variables
const auth0ClientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0RedirectUri = process.env.REACT_APP_REDIRECT_URI;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const stripePayFormat = [99, 199, 299]; // matching subscriptionPrices
const stripeToken = process.env.REACT_APP_STRIPE_TOKEN;
const subscriptionPlans = ['free', 'bronze', 'silver', 'gold']; // same order as subscriptionPrices
const subscriptionPrices = ['$0.00', '$0.99/yr', '$1.99/yr', '$2.99/yr']; // same order as subscriptionPlans

// Copy from backend globals (can't import from out of src folder)
const accountStatusTypes = ['inactive', 'active', 'banned']; // be careful when adding new things or changing order

module.exports = {
  accountStatusTypes,
  auth0ClientID,
  auth0Domain,
  auth0RedirectUri,
  backendUrl,
  stripePayFormat,
  stripeToken,
  subscriptionPlans,
  subscriptionPrices
};
