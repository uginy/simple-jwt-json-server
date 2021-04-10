const fs = require("fs");
const jwt = require("jsonwebtoken");

const TranslateApi = require('reverso-api');
const reverso = new TranslateApi();

const secret = "123456789";
const expiresIn = "1h"

const userDB = JSON.parse(fs.readFileSync("./users.json", "utf-8").toString())
const databaseDB = JSON.parse(fs.readFileSync("./database.json", "utf-8").toString())
const countriesDB = JSON.parse(fs.readFileSync("./countries.json", "utf-8").toString())

const countries = () => {
    return countriesDB.map(el => {
        return {
            label: el.country,
            value: el.country
        }
    })
}

const cities = (country) => {
    const findCountry = countriesDB.find(it => it.country === country)
    return findCountry.cities.map(el => {
        return {
            label: el,
            value: el
        }
    })
}

// search database db with conditions from req.body
const search = (data) => {
    return Object.keys(this).every((key) => {
        if (key !== "times") {
            return data[key] === this[key];
        } else {
            return (
                !!data[key].find((el) => new Date(el.start).getTime() >= new Date(this[key].start).getTime())
                &&
                !!data[key].find((el) => new Date(el.end).getTime() <= new Date(this[key].end).getTime())
            );
        }
    });
}
// create token and jwt sign
const createToken = (payload) => {
    return jwt.sign(payload, secret, {expiresIn: this.expiresIn});
}

// verify token
const verifyToken = (token) => {
    return jwt.verify(token, secret, (err, decode) => (decode !== undefined ? decode : err));
}

// check if user is auth
const isAuthenticated = ({username, password}) => {
    return this.userDB.users.findIndex((user) => user.username === username && user.password === password) !== -1;
}

// get user data
const userProfile = ({username}) => {
    return this.userDB.users.find((user) => user.username === username) || null;
}

const translate = ({text, to}) => {
    return reverso.getContext(text, "English", to).then(response => {
        console.log(response);
        return response
    }).catch(err => {
        return console.error(err);
    });

}
module.exports = {
    expiresIn,
    userDB,
    databaseDB,
    search,
    createToken,
    verifyToken,
    isAuthenticated,
    userProfile,
    countries,
    cities,
    translate
}
