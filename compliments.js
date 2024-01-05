let fs = require('fs')

let compliments_raw = fs.readFileSync("./compliments.txt").toString('utf-8');
let compliments = compliments_raw.split("\n")

compliments.forEach((element, index) => {compliments[index] = element.replace("\r", "")});

const getCompliment = (callback) =>{
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    callback(undefined, {
        compliment: compliment
    });
};

module.exports = {getCompliment};