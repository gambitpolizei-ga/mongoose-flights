const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index,
    show,
    createDestination,
    delete: deleteOne
};

async function deleteOne(req, res) {
    await Flight.deleteOne({_id: req.params.id})
    res.redirect('/flights')
}

function newFlight(req, res) {
    res.render('flights/new', {errorMsg: '' });
}

async function create(req, res) {
    console.log('req.body', req.body);
    try {
        await Flight.create(req.body);
        res.redirect('/flights/new')
    } catch (err) {
        console.log(err);
        res.render('flights/new', { title: 'Add Flight', errorMsg: err.message });
    }
}

async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
}

async function show(req, res) {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', {title: 'Flight Details', flight});
    console.log(flight)
}

async function createDestination(req, res) {
    console.log('req.body', req.body);
    try {
        const flight = await Flight.findById(req.params.id);
        flight.destinations.push(req.body)
        await flight.save()
        res.redirect(`/flights/$(req.params.id}`);
        } catch (err) {
            console.log(err);
            res.redirect(`/flight/$(req.params.id}`);
        }
}