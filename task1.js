const https = require('https');
const fs = require('fs');
const crypto = require('crypto');


const main = () => {
    https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        let arrayOfObjects = []
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            
            //getting value of data
            let string = JSON.parse(data).data
            //to sepeerate the values 
            let array = string.split(',')
            for (let i = 0; i < array.length; i+=2 ){
                let obj = {}
                if(array[i+1].trim() === "age=32"){
                    obj[array[i].trim()] = array[i+1].trim();
                    arrayOfObjects.push(obj)
                }
            }
            writeToFile(arrayOfObjects);
            console.log(arrayOfObjects);        
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}

const writeToFile = (array) => {
    const file = fs.createWriteStream('output.txt')
    for(let i = 0; i<array.length; i++){
        let hash = getHash(array[i])

        //to write the hash of each key value pair       
        file.write(hash + '\n');
    }
    file.end();         
}

const getHash = (someObject) => {
    // to create a hash of each key pair which satisfy the conditions
    const sha = crypto.createHash('sha1');
    let hash_update = sha.update(JSON.stringify(someObject), 'utf-8').digest('hex')
    return hash_update;
}

module.exports = {writeToFile, getHash}

main()
