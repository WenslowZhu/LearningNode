import * as fs from 'fs';

const data = require('./data.json');

console.log(data.name);

fs.readFile('./data.json', 'utf-8', (err, data)=>{
   const jsonData = JSON.parse(data);
   console.log(jsonData.name);
});
console.log('This is first');