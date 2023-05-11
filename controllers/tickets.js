const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    show
};

async function newTicket(req, res) {
    const flight = await Flight.findById(req.params.id)
    res.render('tickets/new', {title: 'Add Ticket'})
}

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);
    flight.tickets.push(req.body);
    try {
        await flight.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/flights/<%= flight.id %>}`);;
}

async function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', {ticket});
        });
    });
}
