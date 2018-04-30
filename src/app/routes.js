const User = require('./models/user');

module.exports = (app, passport) => {

    // index routes
    app.get('/', (req, res) => {
        res.render('index');
    });

    //login view
    app.get('/login', (req, res) => {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    //    app.post('/login', passport.authenticate('local-login', {
    //      successRedirect: '/profile',
    //        failureRedirect: '/login',
    //        failureFlash: true
    //	}));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile3',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // signup view
    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true // allow flash messages
    }));

    //profile view
    //    app.get('/profile', isLoggedIn, (req, res) => {
    //        res.render('profile', {
    //            user: req.user
    //        });
    //	});

    app.get('/profile3', isLoggedIn, (req, res) => {

        // res.send('Hello World');
        res.render('profile3', {
            //user: req.user
        });
    });

    // logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // app.get('/map', (req, res) => {
    //     res.render('map.ejs', {
    //         message: req.flash('loginMessage')
    //     });
    // });

    app.post('/profile3', (req, res) => {
        // User.create({
        //     name: req.body.firstName,
        //     lastname: req.body.lastName
        // });
        var newUser2 = new User();
        newUser2.local.name = req.body.firstName;
        newUser2.local.surname = req.body.lastName;

        newUser2.save(function(err) {
            if (err) {
                throw err;
            }
            return done(null, newUser2);
        });
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}