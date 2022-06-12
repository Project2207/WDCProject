var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// https://ethereal.email/messages
//
// Ethereal Account Credentials
// Name: Geo Kling
// Username: geo.kling99@ethereal.email
// Password: NPuumu8ayR1pzsn9xy

 var transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'geo.kling99@ethereal.email',
      pass: 'NPuumu8ayR1pzsn9xy'
  }
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Email Notifications */
router.post('/emailcreated', function(req,res){
  let invitees = req.body.invitees;
  let organiser = req.body.organiser;
  let name = req.body.name;
  //let loc = req.body.loc;
  let descr = req.body.descr;
  let dates = req.body.dates;
  let times = req.body.times;

  emailCreated(invitees, organiser, name, descr, dates, times);

  res.send();
});

router.post('/emailfinalised', function(req,res){
  let invitees = req.body.invitees;
  let organiser = req.body.organiser;
  let name = req.body.name;
  //let loc = req.body.loc;
  let descr = req.body.descr;
  let dates = req.body.dates;
  let times = req.body.times;

  emailFinalised(invitees, organiser, name, descr, dates, times);

  res.send();
});

router.post('/emailcancelled', function(req,res){
  let invitees = req.body.invitees;
  let organiser = req.body.organiser;
  let name = req.body.name;
  //let loc = req.body.loc;
  let descr = req.body.descr;
  let dates = req.body.dates;
  let times = req.body.times;

  emailCancelled(invitees, organiser, name, descr, dates, times);

  res.send();
});

router.post('/emailresponded', function(req,res){
  let invitees = req.body.invitees;
  let organiser = req.body.organiser;
  let name = req.body.name;
  //let loc = req.body.loc;
  let descr = req.body.descr;
  let dates = req.body.dates;
  let times = req.body.times;

  emailResponded(invitees, organiser, name, descr, dates, times);

  res.send();
});


function emailCreated(invitees, organiser, name, descr, dates, times) {
  var mailOptions = {
    from: 'Calendar App <calendarappevents@gmail.com>',
    to: invitees, // To Invitees with selected notification
    subject: 'You have been invited to an event!',
    html: `<div style="background-color: #E1E1FF;
    text-align: center;
      font-family: 'Roboto', Helvetica, Verdana, sans-serif;
      font-size: 1.5em;
      padding: 15px;">
      <div style="font-family: 'Chelsea Market', 'American Typewriter', Georgia, serif;font-weight: bold;
      font-size: 2.5em;
      color: #504EA6;
      text-align: center;
      height: 100px;
      line-height: 100px;">Calendar App</div>
      <br/>
      <p>You have been invited to an event!</p>
      <br/>
      <p>Log into your account to view the event and specify your availability!</p>
      <br/>
  </div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 };

function emailFinalised(invitees, organiser, name, descr, dates, times) {
  var mailOptions = {
    from: 'Calendar App <calendarappevents@gmail.com>',
    to: invitees, // To Invitees with selected notification
    subject: 'An event you were invited to has been finalised!',
    html: `<div style="background-color: #E1E1FF;
    text-align: center;
      font-family: 'Roboto', Helvetica, Verdana, sans-serif;
      font-size: 1.5em;
      padding: 15px;">
      <div style="font-family: 'Chelsea Market', 'American Typewriter', Georgia, serif;font-weight: bold;
      font-size: 2.5em;
      color: #504EA6;
      text-align: center;
      height: 100px;
      line-height: 100px;">Calendar App</div>
      <br/>
      <p>An event you were invited to was finalised!</p>
      <br/>
      <p>Log into your account to view the date and time of the event!</p>
      <br/>
  </div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 };

 function emailCancelled(invitees, organiser, name, descr, dates, times) {
  var mailOptions = {
    from: 'Calendar App <calendarappevents@gmail.com>',
    to: invitees, // To Invitees with selected notification
    subject: 'An event you were invited to has been cancelled.',
    html: `<div style="background-color: #E1E1FF;
    text-align: center;
      font-family: 'Roboto', Helvetica, Verdana, sans-serif;
      font-size: 1.5em;
      padding: 15px;">
      <div style="font-family: 'Chelsea Market', 'American Typewriter', Georgia, serif;font-weight: bold;
      font-size: 2.5em;
      color: #504EA6;
      text-align: center;
      height: 100px;
      line-height: 100px;">Calendar App</div>
      <br/>
      <p>Sorry! An event you were invited to was cancelled.</p>
      <br/>
  </div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 };

 function emailResponded(invitees, organiser, name, descr, dates, times) {
  var mailOptions = {
    from: 'Calendar App <calendarappevents@gmail.com>',
    to: invitees, // To Invitees with selected notification
    subject: 'An invitee has responded to your event',
    html: `<div style="background-color: #E1E1FF;
    text-align: center;
      font-family: 'Roboto', Helvetica, Verdana, sans-serif;
      font-size: 1.5em;
      padding: 15px;">
      <div style="font-family: 'Chelsea Market', 'American Typewriter', Georgia, serif;font-weight: bold;
      font-size: 2.5em;
      color: #504EA6;
      text-align: center;
      height: 100px;
      line-height: 100px;">Calendar App</div>
      <br/>
      <p>An invitee has specified their availability for your event!</p>
      <br/>
      <p>Log into your account to view the event and see invitees' availability for your event!</p>
      <br/>
  </div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 };

module.exports = router;
