const par = require('csv-parser');
const fs= require('fs');
const { result } = require('lodash');

const paymentController = {
    "getPayments": (req,res) => {
        const amount = req.query.amount
        const key = 'pk_test_51IWQUwH8oljXErmdg6L4MhsuB6tDdmumlHFfyNaopty2U27pmRcqMX1c868zn838lGQtU1eYV6bKRSQtMFWf36VT00aNsvnTOE'
        res.render('payment', {amount,key})
    },
    "makePayment": async (req,res) => {
        const Stripe = require('stripe');
        const stripe = Stripe('sk_test_51IWQUwH8oljXErmds28KftkL6o6jYIcPgYbBdfEmCPSuAlIh0fgoS4NADcCmsIZbdQ3p5nbAeCOcGkSmo38U9BIe00BdOenrqosk_test_51IWQUwH8oljXErmds28KftkL6o6jYIcPgYbBdfEmCPSuAlIh0fgoS4NADcCmsIZbdQ3p5nbAeCOcGkSmo38U9BIe00BdOenrqo');
        const getCharge = await stripe.charges.retrieve(
            'ch_3LaR8nJmy2CuxvWv1XgNRDKM',
            {
              apiKey: 'sk_test_51IWQUwH8oljXErmds28KftkL6o6jYIcPgYbBdfEmCPSuAlIh0fgoS4NADcCmsIZbdQ3p5nbAeCOcGkSmo38U9BIe00BdOenrqo'
            }
          );
        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: 'Mk Airports',
            address: {
                line1: 'Developer',
                postal_code: '100242',
                city: 'Lagos',
                state: 'Lagos',
                country: 'Nigeria',
            }
        })
        .then((customer) => {


        
            return stripe.charges.create({
                amount: req.body.amount,
                description: 'Payment for flight',
                currency: 'USD',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.redirect('/appreciation',{"charge":charge}) // If no error occurs
        })
        .catch((err) => {
            res.send(err)    // If some error occurs
        });
        
    },
}

module.exports = paymentController;