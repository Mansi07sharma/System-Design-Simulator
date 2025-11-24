import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import './oauth/google.js';
import session from 'express-session';
import { createAdj, topSort, test } from './function.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import Design from './models/Design.model.js';
import { redirect } from 'react-router-dom';
import User from './models/User.model.js';
import bcrypt from "bcrypt";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI)
console.log("Connected to MongoDB");

const app = express()
app.use(cors({
  origin: "https://system-design-simulator-smoky.vercel.app",
  credentials: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'MansiSDSSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } //for localhost if production use true with https
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

//A callback URL (also called redirect URI) is the URL in your backend where Google sends the user after successful authentication.
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // creating token
    let token = jwt.sign({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      photo: req.user.photo
    },
      process.env.JWT_SECRET, { expiresIn: '1d' }
    );

    // Setting token in cookie(becuase of safety, in query risk of leak user data)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // set to true if using https 
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    // Successful authentication, redirect home.
    // res.redirect('http://localhost:5173/auth/callback');
    res.redirect('https://system-design-simulator-smoky.vercel.app/auth/callback');

  });

app.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    console.log("User logged out");
    // res.redirect('http://localhost:5173/');
    res.redirect('https://system-design-simulator-smoky.vercel.app/');
  })
})

app.get('/api/me', (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" })
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    res.send({ user })
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" })
  }
})

app.get('/designs', async (req, res) => {
  const userEmail = req.query.userEmail;
  let design = await Design.find({ email: userEmail });
  res.send(design);
})

app.post('/saveDesign', async (req, res) => {
  const email = req.query.userEmail
  if (!email) {
    // redirect('http://localhost:5173/login')
    return redirect('https://system-design-simulator-smoky.vercel.app/login')
  }

  const design = req.body;
  console.log("Design received at backend:", design);
  const userDesign = new Design(design)
  await userDesign.save()
  res.send({ "message": "Design saved successfully!!" })
})

app.post('/registerUser', async (req, res) => {
  const user = req.body
  try {
    let exist = await User.findOne({ email: user.email });

    if (exist) {
      return res.status(401).send({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      name: user.name,
      email: user.email,
      password: hashedPassword
    });
    await newUser.save();

    res.send({ message: "User registered successfully!" });
  }
  catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
})

app.post('/loginUser', async (req, res) => {
  let user = req.body
  try {
    let exist = await User.findOne({ email: user.email })
    if (!exist) {
      return res.status(401).send({ message: "No user found!" })
    }

    const isPasswordCorrect = await bcrypt.compare(user.password, exist.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Password wrong!" });
    }

    let token = jwt.sign({
      name: exist.name,
      email: exist.email,
    },
      process.env.JWT_SECRET, { expiresIn: '1d' }
    );

    // Setting token in cookie(becuase of safety, in query risk of leak user data)
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set to true if using https 
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({ message: "Login user successfull" })
  } catch (e) {
    res.status(500).send({ message: "internal server error!" })
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/start-simulation', async (req, res) => {
  console.log('Simulation parameters received:');
  const nodes = req.body.nodes;
  const edges = req.body.edges;
  const rps = req.body.workloadRps;
  const slaLatency = req.body.slaLatencyMs;

  const graph = await createAdj(edges);
  const map = graph.map;
  const inDegree = graph.inDegree;

  //topological sort to calculate latency and capacity
  const details = await topSort(map, nodes, rps, inDegree);
  const result = await test(details.avgLatency, details.avgCapacity, details.nodeDetails, rps, slaLatency, nodes);

  const overallStatus = result.capOk && result.latOk;

  const finalResult = {
    overallStatus: overallStatus,
    avgLatency: details.avgLatency,
    avgCapacity: details.avgCapacity,
    overallAvailability: details.overallAvailability,
    overallError: details.overallError,
    paths: details.paths,
    bottleneckNodes: result.bottleneckNodes,
    suggestions: result.suggestions,
    nodeDetails: details.nodeDetails,
    rps: rps,
    slaLatency: slaLatency,
    timeStamp: new Date().toISOString()
  };

  console.log('Simulation result:', finalResult);
  res.send(finalResult);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

