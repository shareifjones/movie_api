const express = require('express'),
    morgan = require('morgan');

const app = express();

// movie info
let topMovies = [
    {
        title: 'Bad Boys',
        director: 'Michael Bay'
    },
    {
        title: 'How High',
        director: 'Jesse Dylan'
    },
    {
        title: 'Interstellar',
        director: 'Christopher Nolan'
    },
    {
        title: 'White Chicks',
        director: 'Keenan Wayans'
    },
    {
        title: 'Rush Hour',
        director: 'Brett Ratner'
    },
    {
        title: 'Spider-Man, Across The Spiderverse',
        director: 'Kemp Powers'
    },
    {
        title: 'Wall-E',
        director: 'Andrew Stanton'
    },
    {
        title: 'The Dark Knight',
        director: 'Christopher Nolan'
    },
    {
        title: 'Juice',
        director: 'Ernest Dickerson'
    },
    {
        title: 'Inception',
        director: 'Christopher Nolan'
    },
];

// express function
app.use('/documentation.html', express.static('public'));

// middleware functions
app.use(morgan('common'));

// GET Requests
app.get('/', (req, res) => {
    res.send('Welcome to my Movie App!');
});
    
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

// LISTEN for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});

