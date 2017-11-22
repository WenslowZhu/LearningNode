import * as fs from 'fs';

const data = {
    name: 'Bob'
};

fs.writeFile('./data01.json', JSON.stringify(data), (err)=>{
    if (err) {
        console.log(err);
    }
});