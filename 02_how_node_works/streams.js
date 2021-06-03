const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // fs.readFile('test-file.txt', (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // })
    // const readStream = fs.createReadStream(`${__dirname}/test-file.txt`);
    // readStream.on('data', chunk => {
    //     res.write(chunk);
    // });
    // readStream.on('end', () => {
    //     res.end();
    // })
    const readStream = fs.createReadStream(`${__dirname}/test-file.txt`);
    readStream.pipe(res);
    readStream.on('error', err => {
        console.log(err);
        res.statusCode = 500;
        res.end("file not found")
    })
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening...");
})