
const readline = require('readline');


const Ads = require('./models/Ads');
const ads = require('./data/ads.json').ads;

async function main() {

  const ongoing = await askIfNo('Are you sure that you would like to clear? [n]')
  if (!ongoing) {
    process.exit();
  }

  const connection = require('./lib/connectMongoose')


  await initAds();

  connection.close();
}

main().catch(err => console.log('An error occured', err));

async function initAds(ads) {
  // Delete
  const deleted = await Ads.deleteMany();
  console.log(`Deleted ${deleted.n} ads.`);

  // Create
  const created = await Ads.insertMany(ads);
  console.log(`Inserted ${created.length} ads.`);
};

function askIfNo(question) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.question(question, answer => {
      interface.close();
      if (answer.toLowerCase() === 'Yes') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  })
}