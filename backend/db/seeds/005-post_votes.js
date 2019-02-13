function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const generateSeeds = () => {
  let arr = [];
  for (let i = 0; i < 500; i++) {
    arr.push({
      post_id: getRandomIntInclusive(1, 20),
      user_id: i + 1,
      type: getRandomIntInclusive(0, 5) > 1 ? 1 : -1, // 2/3 chance of receiving an upvote
    });
  }
  return arr;
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post_votes').del()
    .then(function () {
      // Inserts seed entries
      return knex('post_votes').insert(generateSeeds());
    });
};
