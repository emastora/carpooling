const Mongoose = require('mongoose');
const User = Mongoose.model('User');
const Car = Mongoose.model('Car');
const Journey = Mongoose.model('Journey');

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

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/CarPoolingIndex',
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
        successRedirect: '/CarPoolingIndex',
        failureRedirect: '/signup',
        failureFlash: true // allow flash messages
    }));

    //profile view
    //    app.get('/profile', isLoggedIn, (req, res) => {
    //        res.render('profile', {
    //            user: req.user
    //        });
    //	});

    app.get('/CarPoolingIndex', isLoggedIn, (req, res) => {

        // res.send('Hello World');
        res.render('CarPoolingIndex', {
            user: req.user
        });
    });


    // logout
    app.get('/logout', (req, res) => {
        req.logout();
        // successRedirect: '/'
        res.redirect('/');
        // res.render('index');
    });

    // app.get('/map', (req, res) => {
    //     res.render('map.ejs', {
    //         message: req.flash('loginMessage')
    //     });
    // });


    // USER BACKEND

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
                        'local.birthDate': req.body.birthdate,
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
                        res.json({ message: 'User updated!' })
                    });
            }
        })
    });


    // VEHICLE BACKEND
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

        Car.findOne({ 'local.owner': req.body.owner }, function(err, car) {
            if (err) {
                console.log(req);
                console.log(res.status);
                // return done(err);
            } else if (car) {
                console.log(req.body);
                car.update({
                        'local.brand': req.body.brand,
                        'local.model': req.body.model,
                        'local.seats': req.body.seats,
                        'local.color': req.body.color,
                        'local.licencePlate': req.body.licencePlate,
                        'local.year': req.body.year,
                        'local.cc': req.body.cc
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

    // JOURNEY BACKEND
    app.post('/CreateJourney', (req, res) => {

        var journey2 = new Journey();
        console.log(req.body);
        journey2._id = req.body.oid;
        journey2.local.requester = req.body.requester;
        journey2.local.vehicle = req.body.vehicle;
        journey2.local.driver = req.body.driver;
        journey2.local.mode = req.body.mode;
        journey2.local.departureAddress = req.body.departureAddress;
        journey2.local.departureLat = req.body.departureLat;
        journey2.local.departureLng = req.body.departureLng;
        journey2.local.destinationAddress = req.body.destinationAddress;
        journey2.local.destinationLat = req.body.destinationLat;
        journey2.local.destinationLng = req.body.destinationLng;
        journey2.local.schedule = req.body.schedule;
        journey2.local.distance = req.body.distance;
        journey2.local.acceptedPassengers = req.body.acceptedPassengers;
        journey2.local.pendingPassengers = req.body.pendingPassengers;
        journey2.local.rejectedPassengers = req.body.rejectedPassengers;
        // journey2.local.waypoints = req.body.waypoints;
        journey2.local.seatsAvailable = req.body.seatsAvailable;
        journey2.local.notes = req.body.notes;

        journey2.save(function(err) {
            if (err) {
                throw err;
            }
            res.json({ message: 'Journey created!' });
        });

    });

    app.get('/GetJourney', async(req, res) => {
        try {
            const journe = await Journey.findOne({ 'local.requester': req.query.email }).lean()
            console.log('/GetJourney', journe)
            res.json(journe);
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    });

    var calculateDistance = function(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var lat1 = lat1 * Math.PI / 180;
        var lat2 = lat2 * Math.PI / 180;

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    app.get('/GetJourneysForAll', async(req, res) => {
        try {
            const journeyAll = await Journey.find({ 'local.schedule': { $gte: req.query.time }, 'local.requester': { $ne: req.query.email } }).lean();
            console.log("Journeys All available are ");
            console.log(journeyAll);

            var journeyMatch = [];

            if (typeof journeyAll == 'undefined' || journeyAll.length == 0) {
                console.log('No matching journeys found');
            } else {
                // for (var i in req.query.joursArray) {
                for (var k in journeyAll) {
                    if (Math.abs(journeyAll[k].local.schedule - req.query.scheduleBack) < 43200) {
                        var distance1 = calculateDistance(req.query.departureLatBack, req.query.departureLngBack, journeyAll[k].local.departureLat, journeyAll[k].local.departureLng);
                        console.log("Distance1 is " + distance1);
                        if (distance1 <= req.query.radius) {
                            var distance2 = calculateDistance(req.query.destinationLatBack, req.query.destinationLngBack, journeyAll[k].local.destinationLat, journeyAll[k].local.destinationLng)
                            if (distance2 <= req.query.radius) {
                                console.log("Distance2 is " + distance2);
                                journeyMatch.push(journeyAll[k]);

                                console.log("journeyMatch is " + journeyMatch[k]._id);
                            }

                        }

                    }

                }

                // }

            }
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    });


};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}