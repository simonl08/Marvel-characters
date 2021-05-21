const fetch = require('node-fetch'); 
const md5 = require("md5");
require('dotenv').config()

const publicKey = process.env.publicKey;
const privateKey = process.env.privateKey;
const ts = Math.floor(new Date().getTime() / 1000);
const item = "characters?";
const hashedKey = md5(`${ts}${privateKey}${publicKey}`)
// const url = `http://gateway.marvel.com/v1/public/${item}&${marvelCharacter}&ts=${ts}&apikey=${publicKey}&hash=${hashedKey}`;

const getMarvel = async(charFilter) => { 
    let data = await fetch(`http://gateway.marvel.com/v1/public/${item}${charFilter}&ts=${ts}&apikey=${publicKey}&hash=${hashedKey}`); 
    return await data.json();
} 

module.exports = getMarvel;