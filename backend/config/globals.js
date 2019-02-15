// Variables
const numOfFakeUsers = 500;
const numOfHashes = 10;
const numOfDiscussions = 50;
const numOfPosts = 100;
const numOfPostVotes = 500;
const numOfDiscussionVotes = 5000;
const safeUsrnameSqlLetters = [
  '-',
  '_',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0'
];

const safePwdSqlLetters = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '-',
  '_',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0'
];

const accountStatusTypes = ['inactive', 'active', 'banned'];
const accountRoleTypes = [
  'user',
  'gold_member',
  'moderator',
  'super_moderator'
];

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
  safeUsrnameSqlLetters,
  safePwdSqlLetters,
  accountStatusTypes,
  accountRoleTypes,

  // methods
  getRandomIntInclusive,
  getRandomUserId,

  // seeds
  categoryNames
};
