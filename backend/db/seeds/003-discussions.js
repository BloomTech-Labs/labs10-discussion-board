const faker = require('faker');

// const {
//   numOfDiscussions,
//   getRandomUserId,
//   categoryNames,
//   getRandomIntInclusive
// } = require('../../config/globals.js');

// const generateSeeds = () => {
//   let arr = [];
//   for (let i = 1; i <= numOfDiscussions; i++) {
//     // prettier-ignore
//     arr.push({
//       user_id: getRandomUserId(),
//       category_id: getRandomIntInclusive(1, categoryNames.length),
//       title: faker.lorem.sentence(4),
//       body: faker.lorem.sentences(3),
//           new Date(Date.now() - (1000 * 60 * 60 * 12))
//         )
//       )
//     });
//   }
//   return arr;
// };

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('discussions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('discussions').insert([
        {user_id: '1', category_id: '1', title: 'Serverless Computing', 
          body: 'The basic idea is that, finally, developers can build without worrying about physical or virtual servers or even containers. Instead, devs can simply assemble services from small building blocks of code called functions, and all that messy infrastructure stuff under the hood takes care of itself.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1', title: 'Blockchain Technology', 
          body: 'The blockchain is an undeniably ingenious invention – the brainchild of a person or group of people known by the pseudonym, Satoshi Nakamoto. But since then, it has evolved into something greater.By allowing digital information to be distributed but not copied, blockchain technology created the backbone of a new type of internet. Originally devised for the digital currency, Bitcoin,  (Buy Bitcoin) the tech community is now finding other potential uses for the technology.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1', title: 'MicroSD Express Spec Memory Card',
          body: 'MicroSD cards are about to get a whole lot faster, thanks to the newly announced microSD Express format that the SD Association announced at MWC 2019. The new cards will rely on the far faster PCIe and NVMe interfaces commonly used on modern SSDs to reach speeds of up to 985 megabytes per second.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1', title: 'TWITTER Keeps your Deleted Messages!', 
          body: 'Twitter retains direct messages for years, including messages you and others have deleted, but also data sent to and from accounts that have been deactivated and suspended, according to security researcher Karan Saini.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1', title: 'Screenprints with Wifi and realtime capabilities',    body: ' the Weather Poster, a Kickstarter project from designer Oli Woods and his company, Typified. The project looks to merge traditional art (in this case, a screen-printed poster) with modern technology to create a smart display that’s more limited in function, but far nicer-looking and less obtrusive than just hanging a screen on your wall.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '1', title: 'Apple Endorsed ATT Fake 5G Claims', 
          body: 'it’s the exact same marketing scam that AT&T pulled when it began rolling out its 5G E logo on Android phones last month, with an extra dose of Apple’s complicity in pulling this scam on its own customers. It appears that Apple even helped AT&T design a new version of its 5G E logo to match the iPhone’s menubar, down to the smaller “E” that AT&T seems to hope you’ll confuse with real 5G.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '1', title: 'Why is Facebook Still So Big After All the Privacy Issues?', body: 'There were more than 1.52 billion people using Facebook every day in December 2018, a 9 percent increase year over year. Monthly active users were also up 9 percent year over year, with 2.32 billion as of December 31st.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2', title: 'Kobe Bryant: What is he up to now?', body: 'He got 5 championship rings, Dunk Champion, Multiple MVP awards, and a Frickin Grammy Folks, What is the mamba doing now?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2', title: 'Who are your picks for the NBA Champions 2019?', body: 'Im thinking that Steph Curry and the GSW aint losing steam with their all star line-up, while Lebron and the Lakers not doing so well even with their A-list Lineup, what you all thinking?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2', title: 'Major League Soccer: Who you got your money on?', body: 'Liverpool sitting high and untouched with 20 wins and 1 loss', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2', title: 'E-game Dragonball Z Fighter World Tour', body: 'How about that freaking Kazunoko, Who has won 4 out of the 7 tournaments. Next favorites are Sonic Fox and GO1(pronounced Go ichi).', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2', title: 'These Egame Tournament Prize Pools are Insane', 
        body: 'Largest prize pool was Dota 2018 at $24.6 million, while Fortnite literally just eclipsed that announcing a $100 million prize pool over the 2017-2018 Competitive Season', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '3', title: 'Can we talk about Lamborghini going HYBRID for a second here', body: 'This means that Lamborghini sees electrification as a must, something it needs to survive even if powerful engines are still the main reason that customers buy Lamborghinis', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '3', title: 'Are Older Corvettes Going to get a Price Drop?', body: 'Corvette Lovers are anticipating the new release, and a lot of dealers are sitting on their old Corvettes, Are we going to See a Price Drop? What ya think?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '3', title: 'TESLA Dropped their Patents, What Does This Mean for the Car World?', body: 'A few months ago, Elon Musk announced TESLA will drop all their patents opening up the tech for anyone who wants to use it. It was an incredible step for humanity and environment. But what does this mean for the Car World in terms of Technology?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4', title: 'One Piece: Manga, Any Theories on Big Mom and her amnesia?', body: 'In the last few issues, The Big Mom Pirates have arrived in Wano, likely to seek revenge from the Straw Hat Pirates, but in a clash, Big Mom now suffers from Amnesia, How do you think this is going to play out in the scheme of things?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4', title: 'Jump Force: The New Game that Brings in Characters from Various Anime', body: 'Tips, Tricks, Reviews, How is everyone enjoying this epic game?? I would love some feedback before I purchase', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4', title: 'Seven Deadly Sins: Holy Crap, this Manga is Getting Nuts', body: 'I feel like the writer just going all out from one OP event to the next, how do you think Ban will stop Meliodas? Some new Transformation? What is he capable of now? Theories PLEASE!', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4', title: 'Sword Art Online: Alicization, Not much Hype, Any thoughts on this new one?', body: 'I recently came upon this Anime on Hulu, but have not had much time to look into it, what are your thoughts on this?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '5', title: 'Game of Thrones: Winter is HERE. Predictions?', body: 'Game of Thrones is drawing closer and I cant wait, Post your Theories HERE!!!', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '5', title: 'After Game of Thrones', body: 'Seriously, this franchise is so successful I dont see a future there WILL NOT be some sort of spinoff, or prequel, what ya think? Any leaked news about this?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '4', category_id: '5', title: 'Umbrella Academy: Comic to Netflix', body: 'Provide your opinions and your thoughts on this Netflix series', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '4', category_id: '5', title:'Jordan Peele: Twilight Zone', body: 'This man is hillarious, but also has a very creative and unique worldview, I am excited to see him as the creator and host, what you all think?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '6', title:'How to Train your Dragon 3: Thoughts and Opinions?', body: 'The whole franchise was a huge success, and this movie was brilliantly put together to WRAP UP everything, OR WAS IT? Will there be a sequel? Prequel? Thoughts?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '5', category_id: '6', title:'Alita Angel: Manga to Big Screen', body: 'What do you think of the live action adaptation of ALITA? I personally have not read the manga.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '6', category_id: '6', title:'Happy Death Day: Incredibly Stupid Movie!! How Was There a Sequel??', body: 'This movie is about a girl who lives the same day over and over, then her friend gets something similar. This movie seemed so dumb, if you have seen it, was it good?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '5', category_id: '7', title:'Ariana Grande: Thank You Next. You\'re Girlfriend Has to Stop Singing This!', body: 'Ariana Grande is a great music artist, and I understand her reason for writing this song. But ladies, please stop singing this in the car with your current bf! My girl hates her ex, but sings this song. Is this weird? Am I tripping, what ya think?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '7', title:'Shallow: By Bradley Cooper and Lady Gaga wins BEST ORIGINAL SONG Oscars 2019', body: 'This is a beautiful song, what\'s more is freaking Bradley Cooper wins an Oscar his first musical performance. This guy... Anyway. Share your thoughts on this. I think its awesome. This song got some feel feels', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '4', category_id: '7', title:'Adam Lambert and Queen Oscars 2019', body: 'This was wicked! The range of Adam Lambert with the showmanship of Queen. I loved every minute of it. Any critiques?', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
      ]);
    });
};
