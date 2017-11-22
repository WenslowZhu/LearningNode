import * as fs from 'fs';

fs.readdir('./', (err, data)=>{
    console.log(data);
});