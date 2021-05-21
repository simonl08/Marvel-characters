const express = require('express')
const hbs = require('express-handlebars')
const path = require('path');
const bodyParser = require('body-parser');

const getMarvel = require('./lib/getMarvel')

const app = express();

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 

app.engine('hbs', hbs({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async (req,res)=> {
    let data = await getMarvel("orderBy=modified&limit=100");
    let newData = data.data.results;
    // console.log(newData)

    // hardcoded array 
    // let name = newData[16].name;
    // let image = newData[16].thumbnail.path + "." + newData[16].thumbnail.extension;
    // let desc = newData[16].description;
    // console.log(desc)
    // if (desc == ""){
    //     desc = "No description availiable in database"
    // }
    // res.render('index', {name, image, desc} );
    // console.log(newData)

    // Random character data
    for (let i = 0; i < newData.length; i++) {
        let character = newData[Math.floor(Math.random() * newData.length)];
        let name = character.name;
        let image = character.thumbnail.path + "." + character.thumbnail.extension;
        let desc = character.description;
        
        if (desc == ""){
            desc = "No description availiable in database"
        }
        res.render('index', {name, image, desc} );
      } 

});

app.get('/searchMarvel', (req, res) => {      
    res.render('searchMarvel');
}); 
 
app.post('/searchMarvel', async (req, res)=> {
    console.log(req.body)
    let charFilter = "name=" + req.body.charFilter;
    let data = await getMarvel(charFilter)
    let newData = data.data.results;
    // console.log(newData)
    let name = newData[0].name;
    let image = newData[0].thumbnail.path + "." + newData[0].thumbnail.extension;
    let desc = newData[0].description;

    if (desc == ""){
        desc = "No description availiable in database"
    }

    res.render('searchMarvel', {name, image, desc})
})

//404 error
app.get('*', (req,res)=> {
    res.render('404');
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});