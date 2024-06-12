const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');
    morgan = require('morgan');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });


// middleware functions
app.use(bodyParser.json());
app.use(morgan('common'));

let auth = require('./auth')(app);
const passport = require('passport');
require('passport');

let users = [
    {
        id: 1,
        name: "Chris",
        username: [],
        password: [],
        email: [],
        birthdate: [],
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Sofia",
        username: [],
        password: [],
        email: [],
        birthdate: [],
        favoriteMovies: ["How High"]
    },
]

// movie info
let movies = [
    {
        "Title":"Bad Boys",
        "Description":"Bad Boys is a 1995 American buddy cop action comedy film directed by Michael Bay in his feature directorial debut, produced by Don Simpson and Jerry Bruckheimer, and starring Martin Lawrence and Will Smith as two Miami narcotics detectives Marcus Burnett and Mike Lowrey. ",
        "Genre": {
            "Name":"Action Comedy",
            "Description":"The action comedy film genre represents a captivating fusion of high-octane excitement and uproarious humor, creating a cinematic experience that delights audiences across the globe."
        },
        "Director": {
            "Name":"Michael Bay",
            "Bio": "Michael Benjamin Bay is an American film director and producer. He is best known for making big-budget, high-concept action films characterized by fast cutting, stylistic cinematography and visuals, and extensive use of special effects, including frequent depictions of explosions.",
            "Birth":1965.0
        },
        "Image URL":" ",
        "Featured":false
    },
    {
        "Title":"How High",
        "Description":"In the film, Redman and Method Man portray two cannabis users who are visited by the ghost of a deceased friend after smoking his ashes. The ghost helps with their exams, and they receive scholarships to Harvard University. The film was released by Universal Pictures on December 21, 2001, and received generally negative reviews from critics.",
        "Genre": {
            "Name":"Comedy",
            "Description":"A comedy film is a film genre that emphasizes humor."
        },
        "Director": {
            "Name":"Jesse Dylan",
            "Bio": "Jesse Byron Dylan is an American film director and production executive. He is the founder of the media production company Wondros and Lybba, a non-profit organization. He is also a member of the Council on Foreign Relations and TED.",
            "Birth":1966.0
        },
        "Image URL":" ",
        "Featured":false
    },
    {
        "Title":"Interstellar",
        "Description":"Set in a dystopian future where Earth is suffering from catastrophic blight and famine, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for humankind.",
        "Genre": {
            "Name":"Science Fiction",
            "Description":"Fiction based on imagined future scientific or technological advances and major social or environmental changes, frequently portraying space or time travel and life on other planets."
        },
        "Director": {
            "Name":"Christopher Nolan",
            "Bio": "Christopher Nolan is a British film director and writer acclaimed for his noirish visual aesthetic and unconventional, often highly conceptual narratives. His notable films include Inception (2010), Interstellar (2014), Dunkirk (2017), and several Batman movies.",
            "Birth":1970.0
        },
        "Image URL":" ",
        "Featured":false
    },
    {
        "Title":"White Chicks",
        "Description":"In the film, two FBI agents go undercover as women by using whiteface to protect two hotel heiresses from a kidnapping plot targeting socialites.",
        "Genre": {
            "Name":"Action Comedy",
            "Description":"The action comedy film genre represents a captivating fusion of high-octane excitement and uproarious humor, creating a cinematic experience that delights audiences across the globe."
        },
        "Director": {
            "Name":"Keenan Wayans",
            "Bio": "The trail-blazing linchpin of a sprawling family dynasty of comic entertainers, it was multi-talented writer/director/producer Keenen Ivory Wayans who led the familial pack and was the first to achieve national prominence when he successfully created, launched, wrote, hosted and starred in In Living Color (1990).",
            "Birth":1958.0
        },
        "Image URL":" ",
        "Featured":false
    },
    {
        "Title":"Rush Hour",
        "Description":"Rush Hour stars Jackie Chan and Chris Tucker as mismatched police officers who are assigned to rescue a Chinese diplomat's abducted daughter.",
        "Genre": {
            "Name":"Action Comedy",
            "Description":"The action comedy film genre represents a captivating fusion of high-octane excitement and uproarious humor, creating a cinematic experience that delights audiences across the globe."
        },
        "Director": {
            "Name":"Brett Ratner",
            "Bio": "Brett Ratner is an American film director and producer. He directed the Rush Hour film series, The Family Man, Red Dragon, X-Men: The Last Stand, and Tower Heist. He is a producer of several films, including the Horrible Bosses series, The Revenant and War Dogs, and was an executive producer of the television series Prison Break.",
            "Birth":1969.0
        },
        "Image URL":" ",
        "Featured":false
    },
    {
        "Title":"Spider-Man, Across The Spiderverse",
        "Description":"It is the sequel to Spider-Man: Into the Spider-Verse (2018) and the second film in the Spider-Verse franchise, which is set in a shared multiverse of alternate universes called the Spider-Verse.",
        "Genre": {
            "Name":"Superhero Fiction",
            "Description":"Superhero fiction is a subgenre of speculative fiction examining the adventures, personalities and ethics of costumed crime fighters known as superheroes, who often possess superhuman powers and battle similarly powered criminals known as supervillains."
        },
        "Director": {
            "Name":"Kemp Powers",
            "Bio": "Kemp Powers is an American playwright, screenwriter, and director. He is best known for his play One Night in Miami and the 2020 film adaptation of the same name, as well as for co-directing the animated films Soul (2020) and Spider-Man: Across the Spider-Verse (2023).",
            "Birth":1973.0
        },
        "Image URL":" ",
        "Featured":false
    },
    {
        "Title":"Wall-E",
        "Description":"The film follows a solitary robot named WALL-E on a future, uninhabitable, deserted Earth in 2805, left to clean up garbage. He is visited by a robot called EVE sent from the starship Axiom, with whom he falls in love and pursues across the galaxy.",
        "Genre": {
            "Name":"Science Fiction",
            "Description":"Fiction based on imagined future scientific or technological advances and major social or environmental changes, frequently portraying space or time travel and life on other planets."
        },
        "Director": {
            "Name":"Andrew Stanton",
            "Bio": "Andrew Stanton has been a major creative force at Pixar Animation Studios since 1990, when he became the second animator and ninth employee to join the company's elite group of computer animation pioneers. As Vice President, Creative he currently oversees all shorts and feature projects at the studio.",
            "Birth":1965.0
        },
        "Image URL":" ",
        "Featured":false
    },
    {
        "Title":"The Dark Knight",
        "Description":"Based on the DC Comics superhero Batman, it is the sequel to Batman Begins (2005) and the second installment in The Dark Knight trilogy. The plot follows the vigilante Batman, police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City.",
        "Genre": {
            "Name":"Action",
            "Description":"The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work."
        },
        "Director": {
            "Name":"Christopher Nolan",
            "Bio": "Christopher Nolan is a British film director and writer acclaimed for his noirish visual aesthetic and unconventional, often highly conceptual narratives. His notable films include Inception (2010), Interstellar (2014), Dunkirk (2017), and several Batman movies.",
            "Birth":1970.0
        },
        "Image URL":" ",
        "Featured":false
    },
    {
        "Title":"Juice",
        "Description":"The film touches on the lives of four black youths growing up in Harlem, following their day-to-day activities, their struggles with police harassment, rival neighborhood gangs and their families.",
        "Genre": {
            "Name":"Thriller",
            "Description":"Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror, and detective fiction."
        },
        "Director": {
            "Name":"Ernest Dickerson",
            "Bio": "Ernest R. Dickerson, is an American film director and cinematographer. As a cinematographer, he is known for his frequent collaborations with Spike Lee. As a director, he is known for films such as Juice (1992), Tales from the Crypt: Demon Knight (1995), Bones (2001) and Never Die Alone (2004).",
            "Birth":1952.0
        },
        "Image URL":" ",
        "Featured":false
    },
    {
        "Title":"Inception",
        "Description":"The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets. He is offered a chance to have his criminal history erased as payment for the implantation of another person's idea into a target's subconscious.",
        "Genre": {
            "Name":"Science Fiction",
            "Description":"Fiction based on imagined future scientific or technological advances and major social or environmental changes, frequently portraying space or time travel and life on other planets."
        },
        "Director": {
            "Name":"Christopher Nolan",
            "Bio": "Christopher Nolan is a British film director and writer acclaimed for his noirish visual aesthetic and unconventional, often highly conceptual narratives. His notable films include Inception (2010), Interstellar (2014), Dunkirk (2017), and several Batman movies.",
            "Birth":1970.0
        },
        "Image URL":" ",
        "Featured":false
    },
];



// CREATE/ POST must add user data is space
//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

  // Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: '+ err);
    });
  });


//DELETE a user by username
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Users.findOneAndDelete({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  // DELETE MOVIE FROM USER
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), async (req, res) =>{
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
      },
      { new: true }) // This line makes sure that the updated document is returned
     .then((updatedUser) => {
       res.json(updatedUser);
     })
     .catch((err) => {
       console.error(err);
       res.status(500).send('Error: '+ err);
     });
   });


// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', passport.authenticate('jwt', {session: false}), async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if(req.user.Username !== req.params.Username){
    return res.status(400).send('Permission denied');
}
// CONDITION ENDS
    await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
  
  });

//READ
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

//GET ALL Users
app.get('/users', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// GET A user by username
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// GET all movies
app.get('/movies', passport.authenticate('jwt', { session: false}), async (req, res) => {
    await Movies.find()
        .then((Movies) => {
            res.status(201).json(Movies);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//GET movies by title
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), async (req, res) => {

    const title = req.params.title;
    const movie = await Movies.findOne({ Title: title }); 
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No such movie.')
    }
});

//GET genres by name
app.get('/movies/genre/:genreName', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const genreName = req.params.genreName;
    const movie = await Movies.findOne({ 'Genre.Name' : genreName });

    if (movie) {
        res.status(200).json(movie.Genre);
    } else {
        res.status(400).send('No such genre.');
    } 
});

//GET directors by name
app.get('/movies/directors/:directorName', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const directorName = req.params.directorName;
    const movie = await Movies.findOne({ 'Director.Name' : directorName }); 

    if (movie) {
        res.status(200).json(movie.Director);
    } else {
        res.status(400).send('No such director.')
    }
});

app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
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
