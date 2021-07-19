const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geoCode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// static dir to serve files 
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Luka'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: "Luka"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This is some helpful text!',
        name: "Luka "
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geoCode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        console.log(req.query.address, 'addr')
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            console.log(location, 'location');
            console.log(latitude, longitude, 'lat, lon')
            console.log(forecastData);
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        errorMessage: "404 Help article not found."
    });
});

app.get('*', (req, res) => {
    res.render('notFound', {
        errorMessage: "404 Page not found."
    });
});

app.listen(3000, () => {

    console.log('Running on port 3000');
});