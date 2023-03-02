var os = require("os");
var hostname = os.hostname();

var http = require('http');

const winston = require('winston');

const logger = winston.createLogger({
    // format của log được kết hợp thông qua format.combine
    format: winston.format.combine(
        winston.format.splat(),
        // Định dạng time cho log
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        // thêm màu sắc
        winston.format.colorize(),
        // thiết lập định dạng của log
        winston.format.printf(
            log => {
                // nếu log là error hiển thị stack trace còn không hiển thị message của log 
                if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
                return `[${log.timestamp}] [${log.level}] ${log.message}`;
            },
        ),
    ),
    transports: [
        // hiển thị log thông qua console
        new winston.transports.Console(),
    ],
});

//stdout

//create a server object:
http.createServer(function (req, res) {
    let ip = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        null;
    let r = (Math.random() + 1).toString(36).substring(5);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
        hostname,
        ip,
        id: r,
        service: "hello"
    })); //write a response to the client
    res.end(); //end the response
    logger.info('Request from ' + ip + ', id: ' + r);
}).listen(7000); //the server object listens on port 8080