module.exports = function(app, passport) {

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('loginPage', { message: req.flash('loginMessage'), title:'Login' });
	});

	// process the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('loginPage', { message: req.flash('loginMessage'), title:'Login' });
	});

	app.post('/login', function(req, res, next) {
  		passport.authenticate('local-login', function(err, user) {
    		if (err) { return next(err); }
    		if (!user) { return res.redirect('/'); }
    		req.logIn(user, function(err) {
      			if (err) { return next(err); }
      			if(user.kyumei.length != 0) { console.log(user.kyumei[0].paydata[0].groupname); }
      			if(user.local.role === '01')
      				{ return res.redirect('/admin'); } // redirect to admin page 
      			if(user.local.role === '02')
      				{ return res.redirect('/payHistory'); }
    		});
  		})(req, res, next);
	});

	// =====================================
	// payHistory ==========================
	// =====================================
	// show 
	app.get('/payHistory', isLoggedIn, function(req, res, next) {
		// make sure user role is logged in
		if(req.user.local.role !== '02') {
			return res.redirect('/');
		}
		var loginUser = req.user.local.empcode + ' ' + req.user.local.department + ' ' +req.user.local.empname;
		console.log(loginUser);
		// render the page and pass in any flash data if it exists
		res.render('payHistoryPage', { title:'payHistory', empname: loginUser, kyumei: req.user.kyumei});
	});

	// =====================================
	// payHistory ==========================
	// =====================================
	// show 
	app.get('/pwchange', function(req, res, next) {
		// render the page and pass in any flash data if it exists
		res.render('changePassWord', { title:'pwchange'});
	});

	// =====================================
	// payDetail ===========================
	// =====================================
	// show 
	app.get('/payDetail/:payid', isLoggedIn, function(req, res) {

		var paynum = 0;
		var existed = 0;
		var isFirst = false, isLast = false;

		console.log('>> local.role: ' + req.user.local.role );
		console.log('>> req.payid: ' + req.params.payid );
		console.log('>> db.payid: ' + req.user.kyumei[0].payid );
		// make sure user role is logged in
		if(req.user.local.role !== '02') {
			return res.redirect('/');
		}

		// get out the array
		for(var i = 0; i < req.user.kyumei.length; i++) {
			if(req.user.kyumei[i].payid === req.params.payid) {
				existed = 1;
				paynum = i;
				break;
			}
		}

		// check if latest or firstest payment
		if(paynum === 0) {
			isFirst = true;
		} else {
			isFirst = false;
		}

		if(paynum === req.user.kyumei.length - 1) {
			isLast = true;
		} else {
			isLast = false;
		}

		console.log('>> paynum: ' + paynum + ' >> existed: ' + existed );

		var loginUser = req.user.local.empcode + ' ' + req.user.local.department + ' ' +req.user.local.empname;

		if(existed === 1) {
			// render the page and pass in any flash data if it exists
			res.render('payDetailPage', { title:'payDetail', empname: loginUser, paydetail: req.user.kyumei[paynum], firstPay: isFirst, lastPay: isLast });
		} else {
			// render the page and pass in any flash data if it exists
			res.render('payHistoryPage', { title:'payHistory', empname: loginUser, kyumei: req.user.kyumei});
		}
	});

	// prev
	app.post('/showPrevPage/:payid', isLoggedIn, function(req, res, next) {
  		var paynum = 0;
		var existed = 0;
		console.log('>> local.role: ' + req.user.local.role );
		console.log('>> req.payid: ' + req.params.payid );
		console.log('>> db.payid: ' + req.user.kyumei[0].payid );
		// make sure user role is logged in
		if(req.user.local.role !== '02') {
			return res.redirect('/');
		}

		// get out the array
		for(var i = req.user.kyumei.length - 1; i > 0; i--) {
			if(req.user.kyumei[i].payid === req.params.payid) {
				existed = 1;
				paynum = i;
				break;
			}
		}

		if(existed === 1) {
			var url = '/payDetail/' + req.user.kyumei[paynum - 1].payid;
			return res.redirect(url);
		} else {
			var url = '/payDetail/' + req.user.kyumei[req.user.kyumei.length - 1].payid;
			return res.redirect(url);
		}
	});

	// next
	app.post('/showNextPage/:payid', isLoggedIn, function(req, res, next) {
  		var paynum = 0;
		var existed = 0;
		console.log('>> local.role: ' + req.user.local.role );
		console.log('>> req.payid: ' + req.params.payid );
		console.log('>> db.payid: ' + req.user.kyumei[0].payid );
		// make sure user role is logged in
		if(req.user.local.role !== '02') {
			return res.redirect('/');
		}

		// get out the array
		for(var i = 0; i < req.user.kyumei.length - 1; i++) {
			if(req.user.kyumei[i].payid === req.params.payid) {
				existed = 1;
				paynum = i;
				break;
			}
		}

		if(existed === 1) {
			var url = '/payDetail/' + req.user.kyumei[paynum + 1].payid;
			return res.redirect(url);
		} else {
			var url = '/payDetail/' + req.user.kyumei[0].payid;
			return res.redirect(url);
		}
	});

	// =====================================
	// Admin ===============================
	// =====================================
	// show 
	app.get('/admin', isLoggedIn, function(req, res) {
		// make sure admin role is logged in
		console.log('Role: ' + req.user.local.empcode);
		if(req.user.local.role !== '01') {
			// render the page and pass in any flash data if it exists
			return res.redirect('/');
		}
		res.render('adminPage', { title:'admin', empname: req.user.local.empname });
	});

	

	// =====================================
	// Header ==============================
	// =====================================
	app.post('/logout', function(req, res) {
		req.logout();
		return res.redirect('/');
	});

	// Defines a custom 404 Page and we use app.use because
	// the request didn't match a route (Must follow the routes)
	app.use(function(req, res) {
	  	// Define the content type
	  	res.type('text/html');

	  	// The default status is 200
	  	res.status(404);

	  	// Point at the 404.handlebars view
	  	res.render('error',  { message:'Something wrong!' });
	});

	app.use(function (req, res, next) {
		if (req.method == 'POST' && req.url == '/login') {
		    if (req.body.rememberme) {
		    req.session.cookie.maxAge = 1000 * 60 * 3;
		  } else {
		    req.session.cookie.expires = false;
		  }
		}
		next();
	});
	app.use(passport.initialize());
	app.use(passport.session());
		

};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}