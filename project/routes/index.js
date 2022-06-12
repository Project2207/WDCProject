var express = require('express');
var path = require('path');
var router = express.Router();

//define folder
var quick = require('../define/queryStrings'); //for quick query string generation
var misc = require('../define/misc');

var signUpRouter = require('./subroutes/signUp');
var loginRouter = require('./subroutes/login');
var eventEditRouter = require('./subroutes/eventEdit');
router.post('/signUp*', signUpRouter);
router.post('/login*', loginRouter);
router.post('/event*', eventEditRouter);



/*
router.get('/template', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/template_delete_later.html'));
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/');
  });

//LOGGED OUT FILE PATHS
  router.get('/logged_out', function(req, res, next) {
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
  })

  router.get('/logged_out/login_admin', function(req, res, next) {
	res.sendFile(path.resolve(__dirname + '/../public/logged_out_admin_signin.html'));
  });

  router.get('/logged_out/login_user', function(req, res, next) {
	res.sendFile(path.resolve(__dirname + '/../public/logged_out_user_signin.html'));
  });

  router.get('/logged_out/signup', function(req, res, next) {
	res.sendFile(path.resolve(__dirname + '/../public/logged_out_signup.html'));
  });

//LOGGING OUT  ROUTES
  router.get('/signOut', function(req,res,next)
  {
		  req.session.user = null;
		req.session.destroy(null);
		  req.session.regenerate(function(err)
		  {
			  res.redirect('/logged_out');
			  return;
		  })
  })


//LOGGED OUT REDIRECT
router.use('/*', function(req,res,next)
{
	if(!req.session.user)
	{
		res.redirect('/logged_out');
	}
	else
	{
		next();
	}
})

//LOGGED IN ROUTES
router.get('/user', function(req, res, next) {
  res.redirect('/user/events');
})

//GET EVENT IDS FOR THING
router.get('/user/events', function(req, res, next) {
	//connect to single connection
	req.pool.getConnection(function(error, connection) {
		if (error) {
			console.log("connection error");
			console.log(error);
			res.sendStatus(500);
			return;
		}
		//set up query
		var query = quick.select("*", "invitations", "guestID = ?");

		//run request
		connection.query(query, req.session.user, function(error, rows, fields) {
			connection.release();
			if (error) {
				console.log("query error");
				console.log(error);
				res.sendStatus(500);
			} else {
				{
					console.log("success");
//					console.log(rows);
//					req.cookies.pasrse(rows);//go to next middleware
					next();
				}
			}
		})
	})

})

//     id: 8,
//     name: "Sports Day (E)",
//     organiser: "SherlockGnome",
//     descr: "Have ya ever met a man with a real yardarm? Let's get together and haul some keel. That's some treasure chest you've got there. Is that a belayin' pin in yer britches, or are ye …  “I've got a jar of dirt! I've got a jar of dirt, and guess what's inside it?” “Why is the rum always gone?”",
//     loc: "Colosseum",
//     start: new Date("2022-05-28 09:14"),
//     end: new Date("2022-05-28 10:31"),
//     invitees: ["jane.doe23@gmail.com ",
//     "sophie@gmail.com",
//     "saschaiscool@gmail.com",
//     "hannahiscooltoo@gmail.com",
//     "katieiscooler@gmail.com"],
//     finalised: true


router.get('/user/account', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/user_account.html'));
})

router.get('/user/account/manage_account', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/user_manage_account.html'));
})

router.get('/user/account/manage_notifications', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/user_manage_notifications.html'));
})

router.get('/user/account/link_calendar', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/user_link_calendar.html'));
})

router.get('/user/events', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/user_events.html'));
})

router.get('/user/create_event', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/user_create_event.html'));
})

router.get('/user/events/event/:eventId/organiser', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/user_view_event_organiser.html'));
})

router.get('/user/events/event/:eventId/attendee', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/attendee_view_event.html'));
})

router.get('/user/events/plan/:planId/organiser', function(req, res, next) {

  res.sendFile(path.resolve(__dirname + '/../public/user_edit_plan_organiser.html'));
})

router.get('/user/events/plan/:planId/attendee', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/attendee_user_plan.html'));
})

//ADMIN REDIRECT
router.use('/admin*', function(req,res,next)
{
	if(req.session.access != 'admin')
	{
		res.sendStatus(403);
	}
	else
	{
		next();
	}
})

// ADMIN FILE PATHS
router.get('/admin', function(req, res, next) {
  res.redirect('/admin/events');
})

router.get('/admin/account', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/admin_account.html'));
})

router.get('/admin/account/manage_account', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/admin_manage_account.html'));
})

router.get('/admin/account/signup_admin', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/admin_signup_admin.html'));
})

router.get('/admin/events', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/admin_events.html'));
})

router.get('/admin/events/event', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/admin_manage_event.html'));
})

router.get('/admin/events/plan', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/admin_manage_plan.html'));
})

router.get('/admin/users', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/admin_users.html'));
})


// Temporary Delete later -------------------------------------------
router.get('/guest/view_plan', function(req, res, next) {
	res.sendFile(path.resolve(__dirname + '/../public/attendee_guest_plan.html'));
  });

router.get('/admin/users/manage_account', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/admin_users_manage_account.html'));
})

//DATABASE GET REQUESTS
router.get('/request/getAllEvents', function(req, res, next) {
	req.pool.getConnection(function(error,connection){
	  if(error){
		res.sendStatus(500);
		return;
	  }
	  var query = quick.selectAllEvents();
	  connection.query(query, function(error, rows, fields) {
		connection.release();
		if (error) {
		  res.sendStatus(418);
		  return;
		}
		let response = JSON.parse(JSON.stringify(rows));
		console.log("rows");
		console.log(JSON.stringify(rows));
		res.json(rows); //// HERE <-----------------------
//		res.json(response);
	  });
	});
});

//????
router.get('/request/getUserById', function(req, res, next) {

  let query = quick.selectUser("id");

	req.pool.getConnection(function(error, connection) {
		if (error){
			res.sendStatus(500);
      		return;
		}

		connection.query(query, req.query.id, function(error, rows, fields)
		{
			connection.release();
			if(error)
			{
				res.sendStatus(418);
				return;
			}

			res.json(rows);
		});
	});
});

//????
router.get('/request/getUserByEmail', function(req, res, next) {

	// console.log(req.query);
	let query = quick.selectUser('e');
	// console.log(query);

	req.pool.getConnection(function(error, connection) {
		if (error){
			console.log(error);
			res.sendStatus(500);
			return;
		}

		connection.query(query, req.query.email, function(error, rows, fields)
		{
			connection.release();
			if(error)
			{
				// console.log(error);
				res.sendStatus(418);
				return;
			}

			res.json(rows);
		});
	});
});

router.get('/request/getEvent', function(req, res) {
	//FIRST STEP - set up connection!
		let pool = req.pool;
		pool.getConnection(function(error, connection) {
			if (error){
				res.send(500);
				return;
			}

			//create query
			let query = quick.selectEvent(); // Make sure that session is created

			connection.query(query, req.session.eventID, function(error, rows, fields)
			{
				connection.release();
				if(error)
				{
					res.sendStatus(418);
					return;
				}
				res.json(rows);
			});
		});
	});

router.get('/request/getTimes', function(req, res) {
	//FIRST STEP - set up connection!
		let pool = req.pool;
		pool.getConnection(function(error, connection) {
			if (error){
				res.send(500);
				return;
			}

			//create query
			let query = quick.selectEventTimes(req.session.eventID); // Make sure that session is created

			connection.query(query, function(error, rows, fields)
			{
				connection.release();
				if(error)
				{
					res.sendStatus(418);
					return;
				}
				res.json(rows);
			});
		});
	});



//unfinished
router.get('/request/getEventInvitees', function(req, res, next) {
		//FIRST STEP - set up connection!
		let pool = req.pool;
		pool.getConnection(function(error, connection) {
		  if (error){
			res.sendStatus(500);
			return;
		  }

		  let query = quick.selectEventInvitees(req.session.eventID); // Make sure session is created

		  connection.query(query, function(error, rows, fields)
		  {
			  connection.release();
			  if(error)
			  {
				  res.sendStatus(418);
				  return;
			  }
			  res.json(rows);
		  });
	  });
  });

//DATABASE POST REQUESTS
//???
router.post('/request/getAddress', function(req, res) {
	//FIRST STEP - set up connection!
	  let pool = req.pool;
	  pool.getConnection(function(error, connection) {
		  if (error){
			  res.sendStatus(500);
			  return;
		  }

		  //create query
		  let query = quick.selectAddress(req.body.adddressID);

		  connection.query(query, function(error, rows, fields)
		  {
			  connection.release();
			  if(error)
			  {
				  res.sendStatus(418);
				  return;
			  }
			  res.json(rows);
		  });
	  });
  });




// Not finished
router.post('/request/updateAvail', function(req, res, next) {
	//FIRST STEP - set up connection!
	  let pool = req.pool;
	  pool.getConnection(function(error, connection) {
		  if (error){
			  res.send(500);
			  return;
		  }

		  //get user details
		  var timeID = req.body.timeID;
		  var invitationID = req.session.invitationID; // Make sure that session is created
		  //var available = req.body.available;

		  //create query
		  let query = quick.updateAvailability(timeID,invitationID);

		  connection.query(query,[timeID,invitationID], function(error, rows, fields)
		  {
			  connection.release();
			  if(error)
			  {
				  res.sendStatus(418);
				  return;
			  }
		  });
	  });
  });


// Not finished
router.post('/request/getTotalAvailableInvitees', function(req, res, next) {
	//FIRST STEP - set up connection!
	  let pool = req.pool;
	  pool.getConnection(function(error, connection) {
		  if (error){
			  res.send(500);
			  return;
		  }

		  //get user details
		  var timeID = req.body.timeID;
		  var eventID = req.session.eventID; // Make sure that session is created

		  //create query
		  let query = quick.countTotalAvailableInvitees(timeID,eventID);

		  connection.query(query, function(error, rows, fields)
		  {
			  connection.release();
			  if(error)
			  {
				  res.sendStatus(418);
				  return;
			  }
			  res.json(rows);
		  });
	  });
  });




module.exports = router;