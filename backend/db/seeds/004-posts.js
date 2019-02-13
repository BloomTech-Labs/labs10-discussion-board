const faker = require('faker')

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const generateSeeds = () => {
  let arr = []
  for (let i=0; i < 20; i++){
    arr.push({
        user_id: i+1,
        discussion_id: getRandomIntInclusive(1,5),
        body: faker.lorem.sentence(),
        created_at: faker.date.recent(3)
    })
  }
  return arr
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert(generateSeeds());
    });
};
