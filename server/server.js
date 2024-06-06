



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => console.error('Could not connect to MongoDB:', error));

const teamSchema = new mongoose.Schema(
  {
  teamTitle: String,
  points: { type: Number, default: 0 },
  
});

const totalPointsSchema = new mongoose.Schema({
  totalPoints: { type: Number, default: 605 }
});



const matchSchema = new mongoose.Schema({
  round: String,
  winnerTeam: String,
  loserTeam: String,
  winnerPlayer: String,
  loserPlayer: String,
  winnerScore: Number,
  loserScore: Number,
  currentlyPlaying: Boolean
});

const seedSchema = new mongoose.Schema({
  seeds: {
    type: [String],
    required: true
  }
});

const Team = mongoose.model('Team', teamSchema);
const Match = mongoose.model('Match', matchSchema);
const TotalPoints = mongoose.model('TotalPoints', totalPointsSchema);
const Seeds = mongoose.model('Seed',seedSchema);



// Initialize teams if not already present
const initialPoints = [
  { teamTitle: "Bust Your Balls", points: 324  },
  { teamTitle: "Sultans", points: 329 },
  { teamTitle: "Kill Squad", points: 251 },
  { teamTitle: "Warriors", points: 354 },
  { teamTitle: "Motley Crew", points: 296 },
  { teamTitle: "Squashers", points: 261},
  { teamTitle: "Animals", points: 331 },
  { teamTitle: "Calm-Chorz", points: 274 }
];


//gaps
// colour change done
// list of players
// deployment
// refresh


// const initializeTeams = async () => {
//   const teamCount = await Team.countDocuments();
//   if (teamCount === 0) {
//     await Team.insertMany(initialPoints);
//     console.log('Teams initialized');
//   }
// };
const initializeTeams = async () => {
  const teamCount = await Team.countDocuments();
  if (teamCount === 0) {
    await Team.insertMany(initialPoints);
    console.log('Teams initialized');
  }

  const totalPointsCount = await TotalPoints.countDocuments();
  if (totalPointsCount === 0) {
    await TotalPoints.create({ totalPoints: 605 });
    console.log('Total points initialized');
  }
};


initializeTeams();

const calculatePoints = (round, winnerScore, loserScore) => {
  let winnerPoints = 0;
  let loserPoints = 0;

  if (round === 'quarter final') {
    winnerPoints = (winnerScore === 2) ? 5 : 5;
    loserPoints = loserScore === 1 ? 0 : 0;
  } else if (round === 'semi final') {
    winnerPoints =( winnerScore === 2) === 2 ? 10 : 10;
    loserPoints = loserScore === 1 ? 0 : 0;
  } else if (round === 'final') {
    winnerPoints = (winnerScore === 2) === 2 ? 15 : 15;
    loserPoints = loserScore === 1 ? 0 : 0;
  }

  return { winnerPoints, loserPoints };

};


// const updateTeamPoints = async (winnerTeam, loserTeam, winnerPoints, loserPoints) => {
//   await Team.updateOne({ teamTitle: winnerTeam }, { $inc: { points: winnerPoints } });
//   await Team.updateOne({ teamTitle: loserTeam }, { $inc: { points: loserPoints } });
// };

const updateTeamPoints = async (winnerTeam, loserTeam, winnerPoints, loserPoints) => {
  // Find the top team by points
  const topTeam = await Team.findOne().sort({ points: -1 });
  const topTeamPoints = topTeam ? topTeam.points : 0;

  // Get the previous points of the winner and loser teams
  const winnerTeamDoc = await Team.findOne({ teamTitle: winnerTeam });
  const loserTeamDoc = await Team.findOne({ teamTitle: loserTeam });

  if (!winnerTeamDoc || !loserTeamDoc) {
    throw new Error('Winner or loser team not found');
  }

  const previousWinnerPoints = winnerTeamDoc.points;
  const previousLoserPoints = loserTeamDoc.points;

  // Calculate new points
  const newWinnerPoints = previousWinnerPoints + winnerPoints;
  const newLoserPoints = previousLoserPoints + loserPoints;

  // Update the points of the winner and loser teams
  await Team.updateOne({ teamTitle: winnerTeam }, { points: newWinnerPoints });
  await Team.updateOne({ teamTitle: loserTeam }, { points: newLoserPoints });

  // Update the gap for all teams
  // const teams = await Team.find();
  // for (const team of teams) {
  //   const gap = topTeamPoints - team.points;
  //   await Team.updateOne({ teamTitle: team.teamTitle }, { gap: gap });
  // }

  // Update the totalPoints
  const totalPointsDocument = await TotalPoints.findOne();
  if (totalPointsDocument) {
    totalPointsDocument.totalPoints -= (winnerPoints + loserPoints);
    await totalPointsDocument.save();
  } else {
    throw new Error('TotalPoints document not found');
  }
};

app.get('/api/matches', async (req, res) => {
  try {
    const matches = await Match.find();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`IP Address: ${ip}`);
  
    res.send(matches);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching matches' });
  }
});


app.post('/api/seeds', async (req, res) => {
  const { seeds } = req.body;
  if (seeds && Array.isArray(seeds)) {
    try {
      const newSeed = new Seeds({ seeds });
      await newSeed.save();
      res.status(200).send({ message: 'Seeds stored successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error storing seeds', error });
    }
  } else {
    res.status(400).send({ message: 'Invalid seeds data' });
  }
});

app.get('/api/seeds', (req, res) => {
  res.status(200).send({ seeds: storedSeeds });
});

app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    const totalPoints = await TotalPoints.findOne();
    res.send({ teams, totalPoints });
  } catch (error) {
    res.status(500).send({ error: 'Error fetching teams and total points' });
  }
});

// app.get('/api/teams', async (req, res) => {
//   try {
//     const teams = await Team.find();
//     const totalPoints = await TotalPoints.find();
//     res.send(teams,totalPoints);
//   } catch (error) {
//     res.status(500).send({ error: 'Error fetching teams' });
//   }
// });

app.post('/api/matches', async (req, res) => {
  try {
    const { round, winnerTeam, loserTeam, winnerScore, loserScore } = req.body;
    const match = new Match(req.body);
    await match.save();

    const { winnerPoints, loserPoints } = calculatePoints(round, parseInt(winnerScore), parseInt(loserScore));
    await updateTeamPoints(winnerTeam, loserTeam, winnerPoints, loserPoints);

    // Update the totalPoints
    // const totalPointsDocument = await TotalPoints.findOne();
    // if (totalPointsDocument) {
    //   totalPointsDocument.totalPoints -= (winnerPoints);
    //   // totalPointsDocument.totalPoints -= (winnerPoints + loserPoints);
    //   await totalPointsDocument.save();
    // } else {
    //   res.status(500).send({ error: 'TotalPoints document not found' });
    //   return;
    // }

    res.send(match);
  } catch (error) {
    res.status(500).send({ error: 'Error adding match' });
  }
});


app.put('/api/matches/:id', async (req, res) => {
  try {
    const { round, winnerTeam, loserTeam, winnerScore, loserScore } = req.body;
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });

    const { winnerPoints, loserPoints } = calculatePoints(round, parseInt(winnerScore), parseInt(loserScore));
    await updateTeamPoints(winnerTeam, loserTeam, winnerPoints, loserPoints);

    res.send(match);
  } catch (error) {
    res.status(500).send({ error: 'Error updating match' });
  }
});

app.delete('/api/matches/:id', async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.send({ message: 'Match deleted' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting match' });
  }
});



