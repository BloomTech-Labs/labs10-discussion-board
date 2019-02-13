// Variables
const numOfFakeUsers = 10;
const numOfHashes = 10;
const numOfDiscussions = 100;
const numOfPosts = 100;
const numOfPostVotes = 10;
const numOfDiscussionVotes = 100;

// Methods
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

const getRandomUserId = () => {
  min = 1;
  max = numOfFakeUsers;
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

// Seeds
const categoryNames = [
  'Tech Talk',
  'Sports',
  'Cars',
  'Anime',
  'TV Shows',
  'Movies',
  'Music'
];

module.exports = {
  // variables
  numOfDiscussions,
  numOfPosts,
  numOfFakeUsers,
  numOfHashes,
  numOfPostVotes,
  numOfDiscussionVotes,

  // methods
  getRandomIntInclusive,
  getRandomUserId,

  // seeds
  categoryNames
};