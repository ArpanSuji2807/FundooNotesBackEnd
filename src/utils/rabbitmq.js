var amqp = require('amqplib/callback_api');
import { postMail } from './postmail';

var mailid;
function producer(data) {

    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';
            var msg = JSON.stringify(data);
            mailid = data.email;
            console.log("Inside rabbitmq---->>>>",mailid);
            

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function () {
            connection.close();
        }, 1000);
    });
   

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            let message = JSON.parse(msg.content)
            console.log(" [x] Received %s", message);
            postMail(mailid);
        }, {
            noAck: true
        });
    });
});
};


export {producer};