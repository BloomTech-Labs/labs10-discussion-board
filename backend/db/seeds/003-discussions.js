const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('discussions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('discussions').insert([
        {user_id: '1', category_id: '1',
          body: 'RULES OF CONDUCT: Please refer to this channel for the proper code of conduct. Our HR will be ready to answer any questions posted.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1',
          body: 'All of our programming will now be done solely by Lambda School. They are the most incredible development program we\'ve ever experienced and they are incredibly generous.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1',
          body: 'We are currently looking to hire 10 new marketing interns. Applicant must currently be in college majoring in business finance, business management, graphic arts, psychology, or sociology. Please post your recommendations here with a copy of their Resume.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1',
          body: 'Office Game of Thrones Watch Party. Where: David Situ\'s House. Time: 5PM Pacific. There will be a raffle for best and funniest costumes. Valar morghulis.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1',
          body: 'We are going to begin implementing a yoga program in the morning before work at 7:00AM for those of you who would like to attend. Please post any concerns or questions here.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '1',
          body: 'Starting April 1st, 2019, we will be implementing a 24/7 open bar in the marketing department to enhance creativity. April Fools! Please keep your pranks this year to a minimum. No repeat of what happened last year.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '1',
          body: 'All Communication will now be held in Symposium. Urgent matters will be posted in Anouncements, please turn notifications on for this channel.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
          body: 'Dev Team RULES OF CONDUCT: Codes of Conduct, Rules of Effective Communication', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
          body: 'Dev Team News: This channel will be for any world news that you think will be affecting our company\'s Dev Team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
          body: 'Dev Team Announcements: This channel will be used for major company announcements that will be affecting the Dev Team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
          body: 'Dev Team Projects: Please locate your team\'s project and communicate within that channel with your team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
        body: 'Dev Team General: This channel will be a general chat for anything within the scope of the rules of communication.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '3',
          body: 'Design Team RULES OF CONDUCT: This channel contains the rules of communication and code of conduct. Questions will be answered by a Design Team Leader.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '3',
          body: 'Design Team Announcements: This channel will be used for any company changes that affects the Design Team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '3',
          body: 'Design Team Projects: This channel will be used for communication between your team. Find your team\'s chat within in this channel', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4',
          body: '', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4',
          body: 'Tips, Tricks, Reviews, How is everyone enjoying this epic game?? I would love some feedback before I purchase', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4',
          body: 'I feel like the writer just going all out from one OP event to the next, how do you think Ban will stop Meliodas? Some new Transformation? What is he capable of now? Theories PLEASE!', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4',
          body: 'I recently came upon this Anime on Hulu, but have not had much time to look into it, what are your thoughts on this?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '5',
          body: 'Game of Thrones is drawing closer and I cant wait, Post your Theories HERE!!!', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '5',
          body: 'Seriously, this franchise is so successful I dont see a future there WILL NOT be some sort of spinoff, or prequel, what ya think? Any leaked news about this?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '4', category_id: '5',
          body: 'Provide your opinions and your thoughts on this Netflix series', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '4', category_id: '5',
          body: 'This man is hillarious, but also has a very creative and unique worldview, I am excited to see him as the creator and host, what you all think?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '6',
          body: 'The whole franchise was a huge success, and this movie was brilliantly put together to WRAP UP everything, OR WAS IT? Will there be a sequel? Prequel? Thoughts?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '5', category_id: '6',
          body: 'What do you think of the live action adaptation of ALITA? I personally have not read the manga.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '6', category_id: '6',
          body: 'This movie is about a girl who lives the same day over and over, then her friend gets something similar. This movie seemed so dumb, if you have seen it, was it good?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '5', category_id: '7',
          body: 'Ariana Grande is a great music artist, and I understand her reason for writing this song. But ladies, please stop singing this in the car with your current bf! My girl hates her ex, but sings this song. Is this weird? Am I tripping, what ya think?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '7',
          body: 'This is a beautiful song, what\'s more is freaking Bradley Cooper wins an Oscar his first musical performance. This guy... Anyway. Share your thoughts on this. I think its awesome. This song got some feel feels', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '4', category_id: '7',
          body: 'This was wicked! The range of Adam Lambert with the showmanship of Queen. I loved every minute of it. Any critiques?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
      ]);
    });
};
