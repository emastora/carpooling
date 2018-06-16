const Mongoose = require('mongoose');
const User = Mongoose.model('User');
const Car = Mongoose.model('Car');

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
        successRedirect: '/profile3',
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
            user: req.user
                // user: 'Stelios'
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

    // app.get('/GetUser', (req, res) => {
    //     // req.logout();
    //     // res.redirect('/');

    //     User.findOne({ 'local.email': req.params.Iden }, function(err, user) {
    //         if (err) {
    //             res.send(err);
    //             // console.log(req);
    //             // console.log(res.status);
    //         } else if (user) {
    //             res.json(User);
    //             console.log("brika user blaks");
    //             // console.log(res);
    //             // console.log(res.body);
    //         } else
    //             console.log("Paparia")
    //     });
    // });

    app.get('/GetUser', async(req, res) => {
        try {
            const user = await User.findOne({ 'local.email': req.query.email }).lean()
            console.log('/GetUser', user)
            res.json(user);
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    });

    // app.post('/UpdateUser', async(req, res) => {
    //     try {
    //         const user = await User.findOne({ 'local.email': req.body.email }).lean();
    //         console.log('/UpdateUser found', user)
    //         user = await User.update({ 'local.name': req.body.name, 'local.surname': req.body.surname }).lean()
    //         console.log('/UpdateUser updated', user)
    //         res.json({ data: user, message: 'User updated!' })
    //     } catch (e) {
    //         console.log(e)
    //         res.send(e)
    //     }
    // });

    app.post('/UpdateUser', (req, res) => {

        User.findOne({ 'local.email': req.body.email }, function(err, user) {
            if (err) {
                console.log(req);
                console.log(res.status);
                // return done(err);
            } else if (user) {
                console.log(req.body);
                user.update({
                        'local.name': req.body.name,
                        'local.surname': req.body.surname,
                        'user.local.birthdate': req.body.birthdate,
                        'user.local.occupation': req.body.occupation,
                        'user.local.interests': req.body.interests,
                        'user.local.music': req.body.music,
                        'user.local.smoker': req.body.smoker
                    },

                    function(err) {
                        if (err)
                            console.log('error')
                        else
                            console.log('success')
                        res.json({ message: 'User updated!' })
                    });
            }
        })
    });

    app.get('/GetVehicle', async(req, res) => {
        try {
            const car = await Car.findOne({ 'local.owner': req.query.email }).lean()
            console.log('/GetCar', car)
            res.json(car);
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    });

    app.post('/CreateVehicle', (req, res) => {

        var newVehicle2 = new Car();
        console.log(req.body);
        newVehicle2.local.owner = req.body.owner;
        newVehicle2.local.brand = req.body.brand;
        newVehicle2.local.model = req.body.model;
        newVehicle2.local.seats = req.body.seats;
        newVehicle2.local.color = req.body.color;
        newVehicle2.local.licencePlate = req.body.licencePlate;
        newVehicle2.local.year = req.body.year;
        newVehicle2.local.cc = req.body.cc;
        newVehicle2.local.aircondition = req.body.aircondition;
        newVehicle2.local.petsAllowed = req.body.petsAllowed;

        newVehicle2.save(function(err) {
            if (err) {
                throw err;
            }
            res.json({ message: 'Vehicle created!' });
        });

    });

    app.post('/UpdateVehicle', (req, res) => {

        Car.findOne({ 'local.ownver': req.body.owner }, function(err, car) {
            if (err) {
                console.log(req);
                console.log(res.status);
                // return done(err);
            } else if (car) {
                console.log(req.body);
                car.update({
                        'local.name': req.body.name,
                        'local.surname': req.body.surname,
                        'local.birthdate': req.body.birthdate,
                        'local.occupation': req.body.occupation,
                        'local.interests': req.body.interests,
                        'local.music': req.body.music,
                        'local.smoker': req.body.smoker
                    },

                    function(err) {
                        if (err)
                            console.log('error')
                        else
                            console.log('success')
                        res.json({ message: 'Car updated!' })
                    });
            }
        })
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}