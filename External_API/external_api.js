
const request = require('request');
const config = require('../config');
const fetch = require("node-fetch");
var apikey = config.GOOGLE_API_KEY;

module.exports = {
    displayShop: async function (value, callback) {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key=' + apikey;

        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(JSON.stringify(json));
            const lat = json.results[0].geometry.location.lat.toString();
            const lng = json.results[0].geometry.location.lng.toString();
            const address = lat + ', ' + lng;
            const url_address = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=store&rankby=distance&=&key=' + apikey + '&location=' + address;
            const response_list = await fetch(url_address);
            const res = await response_list.json();
            console.log(JSON.stringify(res.results));
            var result = res.results;
            console.log(result.length);
            var shopArray = [];

            for (i = 0; i < 10; i++) {
                if (result[i].photos) {
                    imageUrl = 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' + result[i].photos[0].photo_reference + '&key=' + apikey + '&maxwidth=200'
                } else {
                    imageUrl = ' https://static3.depositphotos.com/1000556/110/i/950/depositphotos_1102733-stock-photo-shopping-cart.jpg';
                }

                var name = result[i].name;
                var place_id = result[i].place_id;
                buttons = [];
                var webview = {
                    "type": "web_url",
                    "url": "https://facebookmessengerapp-1.herokuapp.com/webview?address=" + value + "&name=" + name + "&place_id=" + place_id,
                    "title": "Booking schedule time",
                    "webview_height_ratio": "tall",
                    "messenger_extensions": "true"
                };
                // buttons.push(button);
                buttons.push(webview);
                var option =
                {
                    "title": result[i].name,
                    "image_url": imageUrl,
                    "buttons": buttons
                };
                shopArray.push(option);
                // shopArray.push(shopId);
                // console.log(JSON.stringify(shopArray));
                if (shopArray.length == 10) {
                    console.log("_________shopArray_________");
                    console.log(JSON.stringify(shopArray));
                    callback(shopArray);
                }
            }
        } catch (error) {
            console.log(error);
        }

    },

    sendQuickReply: function (recipientId, text, replies, metadata) {
        let self = module.exports;
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: text,
                metadata: self.isDefined(metadata) ? metadata : '',
                quick_replies: replies
            }
        };

        self.callSendAPI(messageData);
    },

    callSendAPI: function (messageData) {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: 'EAADhs54CZBV4BABhvflRJh3J03zD8zkZBRUtgAFEjm6gruGRyoyX8JZB2bRk8PvzTRTSZBKTZC232llCZBhipVIPPbZCoHgbSZCUgcwqxc1tdvbtOO930vEmCMEHM5JdGnoK7vGBkZBwRijZAAXd43jhG1MFJ4Sko2Sv7Elt9ZAN30SeMHcKsCvXY8M'
            },
            method: 'POST',
            json: messageData

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;

                if (messageId) {
                    console.log("Successfully sent message with id %s to recipient %s",
                        messageId, recipientId);
                } else {
                    console.log("Successfully called Send API for recipient %s",
                        recipientId);
                }
            } else {
                console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
            }
        });
    },

    date_time: function () {


        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        // prints date in YYYY-MM-DD format
        console.log(year + "-" + month + "-" + date);

        // prints date & time in YYYY-MM-DD HH:MM:SS format
        console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

        // prints time in HH:MM format
        console.log(hours + ":" + minutes);

        var ordertime = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
        return ordertime;

        // var date_ob = new Date();
        // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // let year = date_ob.getFullYear();
        // let minutes = date_ob.getMinutes()
        // let _minutes = (minutes + 30) % 60;

        // let d_minutes = Math.floor((minutes + 30) / 60);
        // let hour = date_ob.getHours();
        // let _hour = (hour + d_minutes + 5) % 24;
        // let d_hour = Math.floor((hour + d_minutes + 5) / 24);

        // let date = date_ob.getDate()
        // let _date = (date + d_hour) % 30

        // var ordertime = year + "-" + month + "-" + _date + " " + _hour + ":" + _minutes;
        // return ordertime;
    },

    get_add: function (origin, target, callback) {
        console.log(`origin: ${origin}`);
        console.log(`target: ${target}`);

        var options = {
            'method': 'GET',
            'url': 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + target + '&departure_time=now&key=' + apikey,
            'headers': {
            }
        };
        request(options, function (error, response) {
            try {
                if (error) throw new Error(error);
                var body = JSON.parse(JSON.stringify(response.body));
                var arr = body.split("\n");
                var text = arr[8].split(":");
                console.log(text[1]);
                var int = text[1].split(" ");
                console.log(int[2]);
                var unit = int[2].slice(0, 2);
                console.log(unit);
                if (unit.toString() == 'km') {
                    var res = int[1].slice(1);
                    var distance = res * 1000;
                } else {
                    var distance = int[1].slice(1) * 1;
                }

                callback(distance);
            } catch (err) {
                console.log(err);
            }
           
        });
    },

    isDefined: function (obj) {
        if (typeof obj == 'undefined') {
            return false;
        }

        if (!obj) {
            return false;
        }

        return obj != null;
    },

}

// function handler(req, res) {
//     return request('https://user-handler-service')
//         .catch((err) => {
//             logger.error('Http error', err);
//             error.logged = true;
//             throw err;
//         })
//         .then((response) => Mongo.findOne({ user: response.body.user }))
//         .catch((err) => {
//             !error.logged && logger.error('Mongo error', err);
//             error.logged = true;
//             throw err;
//         })
//         .then((document) => executeLogic(req, res, document))
//         .catch((err) => {
//             !error.logged && console.error(err);
//             res.status(500).send();
//         });
// }
