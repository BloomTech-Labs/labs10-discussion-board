const faker = require('faker')

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const titleArr =[
  'React Hooks',
  'New in Python',
  'One Piece Theories',
  'Kobe Bryant: GOAT or NO?',
  'Simpsons: How Long Will They Go?',
]

const generateSeeds = () => {
  let arr = []
  for (let i=0; i < 5; i++){
    arr.push({
        user_id: i+1,
        category_id: getRandomIntInclusive(1,7),
        title: titleArr[i],
        body: faker.lorem.sentence(),
        created_at: faker.date.recent(3)
    })
  }
  return arr
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('discussions').del()
    .then(function () {
      // Inserts seed entries
      return knex('discussions').insert(generateSeeds());
    });
};
