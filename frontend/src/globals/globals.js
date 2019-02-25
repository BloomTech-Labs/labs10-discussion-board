// Variables
const auth0ClientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0RedirectUri = process.env.REACT_APP_REDIRECT_URI;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const stripePayFormat = [99, 199, 299]; // matching subscriptionPrices
const stripeToken = process.env.REACT_APP_STRIPE_TOKEN;
const subscriptionPlans = ['free', 'bronze', 'silver', 'gold']; // same order as subscriptionPrices
const subscriptionPrices = ['$0.00', '$0.99/yr', '$1.99/yr', '$2.99/yr']; // same order as subscriptionPlans
const searchCharLimit = 64; // limits the max number of characters to return in a search

// Copy from backend globals (can't import from out of src folder)
const accountStatusTypes = ['inactive', 'active', 'banned']; // be careful when adding new things or changing order

const dayTheme = {
  appBgColor:  '#54bdff',
  authBgColor: 'gray',
  authColor: 'white',
  authLinkRegColor: 'white',
  authLinkRegColorHov: 'black',
  authLoginColor: 'white',
  authLoginColorHov: 'black',
  catNameColor: 'black',
  catDiscussionCountColor: 'black',
  catBgColorHov: 'rgba(255, 255, 255, 0.6)',
  catTimestampColor: 'black',
  catTitleColor:'black',
  catNameDateColor:'black',
  discussionUsernameColor: 'black',
  discussionByCatWrapperBgColor: '#e8e3e0',
  discussionByCatWrapperBgColorHov: 'rgba(255, 255, 255, 0.195)',
  discussionByCatWrapperBgShdw:'2px 3px 2px 2px #610b07',
  discussionByCatTitleColor:'black',
  discussionByCatTitleBgColorHov:'rgba(255, 255, 255, 0.13)',
  discussionByCatTitleColorHov:'white',
  discussionByCatCategoryColor: 'black',
  discussionByCatCategoryBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatCategoryColorHov: 'white',
  discussionByCatNameDateColor: 'black',
  discussionByCatNameDateBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatNameDateColorHov: 'white',
  skyColor: '#37d8e6',
  symposiumProfileBgColor: '#ffdd00',
  symposiumBorderColor: '#f1c40f',
};

const nightTheme = {
  appBgColor: 'pink',
  authBgColor: 'black',
  authColor: 'gray',
  authLinkRegColor: 'black',
  authLinkRegColorHov: 'white',
  authLoginColor: 'black',
  authLoginColorHov: 'white',
  catNameColor: 'red',
  catDiscussionCountColor: 'red',
  catBgColorHov: 'rgba(100, 200, 200, 0.9)',
  catTimestampColor: 'red',
  catTitleColor: 'red',
  catNameDateColor:'red',
  discussionUsernameColor: 'white',
  discussionByCatWrapperBgColor: 'red',
  discussionByCatWrapperBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatWrapperBgShdw:'2px 3px 2px 2px pink',
  discussionByCatTitleColor:'white',
  discussionByCatTitleBgColorHov:'rgba(100, 200, 255, 0.33)',
  discussionByCatTitleColorHov:'black',
  discussionByCatCategoryColor: 'white',
  discussionByCatCategoryBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatCategoryColorHov: 'black',
  discussionByCatNameDateColor: 'white',
  discussionByCatNameDateBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatNameDateColorHov: 'black',
  skyColor: '#2c3e50',
  symposiumProfileBgColor: '#bdc3c7',
  symposiumBorderColor: '#eaeff2',
}

module.exports = {
  accountStatusTypes,
  auth0ClientID,
  auth0Domain,
  auth0RedirectUri,
  backendUrl,
  stripePayFormat,
  stripeToken,
  subscriptionPlans,
  subscriptionPrices,
  searchCharLimit,
  dayTheme,
  nightTheme,
};
