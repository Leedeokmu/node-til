const crypto = require('crypto');
const EventEmitter = require('events');
const http = require('http');

// const start = Date.now();
//
// crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//     console.log(Date.now() - start, "Password encrypted");
// });
// crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//     console.log(Date.now() - start, "Password encrypted");
// });
// crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//     console.log(Date.now() - start, "Password encrypted");
// });
// crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//     console.log(Date.now() - start, "Password encrypted");
// });

// setTimeout(() => {
//     console.log("timeout1");
// }, 0)
//
// setImmediate(() => {
//     console.log("immediate1");
// })

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();
myEmitter.on('newSale', () => {
    console.log('There are a new sale');
});
myEmitter.on('newSale', () => {
    console.log('Customer name: lee');
});
myEmitter.on('newSale', (stock) => {
    console.log(`There are now ${stock} items left in stock.`);
});
myEmitter.emit('newSale', 9);

const server = http.createServer();
server.on('request', (req, res) => {
    console.log('Request received!');
    res.end("Request received");
});
server.on('request', (req, res) => {
    console.log("Another request 😀");
});
server.on('close', (req, res) => {
    console.log('Server closed');
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests....');
})
