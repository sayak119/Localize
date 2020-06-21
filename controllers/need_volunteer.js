const fbService = require('../External_API/facebook_service')
const external_api = require('../External_API/external_api')
const userService = require('../models/user');
const appmodule = require('../app');


const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

module.exports = {
    self_certify: async function (userId) {
        console.log('*************When customer click "Need for volunteers" button. **************');
        let responseText = "Do you self-certify that you will be wearing masks to the shops and have been corona negative or have not shown any symptoms for the past 14 days ? ";
        let replies = [
            {
                "content_type": "text",
                "title": "Yes",
                "payload": "n_v_yes"
            },
            {
                "content_type": "text",
                "title": "No",
                "payload": "n_v_no"
            },
            {
                "content_type": "text",
                "title": "Start Over",
                "payload": "start_over"
            },
            {
                "content_type": "text",
                "title": "Cancel ",
                "payload": "cancel"
            }
        ];



        fbService.sendQuickReply(userId, responseText, replies);

    },

    //when customer click yes in Need for volunteers
    certify_yes: async function (userId) {
        console.log('*************sent that input name in be_volunteer. *************');
        let responseText = "Please seek such deliveries only when it is an emergency. The people who help you are volunteers. All deliveries will be contactless. Be polite to the volunteers. ";

        fbService.sendTextMessage(userId, responseText);
        await waitFor(1000);
        let replytext = "Please enter your name.";
        let replies = [
            {
                "content_type": "text",
                "title": "Start Over",
                "payload": "start_over"
            },
            {
                "content_type": "text",
                "title": "Previous ",
                "payload": "need_volunteers"
            },
            {
                "content_type": "text",
                "title": "Cancel ",
                "payload": "cancel"
            }
        ];

        fbService.sendQuickReply(userId, replytext, replies);
    },

    certify_no: async function (userId) {
        console.log('*************sent that input name in be_volunteer. *************');
        let responseText = "Please seek such deliveries only when it is an emergency. The people who help you are volunteers. All deliveries will be contactless. Be polite to the volunteers. ";

        fbService.sendTextMessage(userId, responseText);
        await waitFor(1000);
        let replytext = "Please enter your name.";
        let replies = [
            {
                "content_type": "text",
                "title": "Start Over",
                "payload": "start_over"
            },
            {
                "content_type": "text",
                "title": "Previous ",
                "payload": "need_volunteers"
            },
            {
                "content_type": "text",
                "title": "Cancel ",
                "payload": "cancel"
            }
        ];

        fbService.sendQuickReply(userId, replytext, replies);
    },

    // when user enter name
    sendToWit_1: function (event) {
        try {
            let self = module.exports;
            console.log('*********received text message**********');
            var userId = event.sender.id;
            console.log(JSON.stringify(event));
            var wit_confience = event.message.nlp.intents[0].confidence;

            if (wit_confience > 0.95) {
                var intent = event.message.nlp.intents[0].name;
                console.log(intent);
                switch (intent) {
                    case 'name':
                        // if (event.message.nlp.entities.intent[0].confidence > 0.95) {
                            var value = event.message.text;
                            console.log(value);
                            self.inputAddress(userId);
                        // } else {
                        //     let responseText = 'Please enter correct data.';

                        //     fbService.sendTextMessage(userId, responseText);
                        // }

                        break;
                    case 'greeting':
                        self.sendWelcomeMessage(userId);
                        break;

                    case 'address':
                        var value = event.message.text;
                        console.log(userId);
                        userService.n_v_address(userId, value, function (updated) {
                            if (updated) {

                                self.item_require(userId);
                            }
                            console.log(value);
                        });


                        break;
                    case 'need_item':
                        console.log("need_item");
                        let items = [];
                        var n_item = event.message.nlp.entities["item:item"];
                        console.log(`n_item: ${n_item}`);
                        n_item.forEach(element => {
                            items.push(element.body);
                        });
                        userService.n_v_item(userId, items, (updated) => {
                            if (updated) {
                                timeslot_require(userId);
                            }
                        });
                        break;

                    default:
                        let responseText = 'Please enter correct data.';

                        fbService.sendTextMessage(userId, responseText);
                        break;
                }
            } else {
                let responseText = 'sorry, more again.';

                fbService.sendTextMessage(userId, responseText);
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    inputAddress: function (userId) {
        console.log('***************we sent message that input location.**********');

        let responseText = "Please enter your location. ";
        let replies = [
            {
                "content_type": "text",
                "title": "Start Over",
                "payload": "start_over"
            },
            {
                "content_type": "text",
                "title": "Previous ",
                "payload": "inputname"
            },
            {
                "content_type": "text",
                "title": "Cancel ",
                "payload": "cancel"
            }
        ];



        fbService.sendQuickReply(userId, responseText, replies);
    },

    sendWelcomeMessage: async function (userId) {
        console.log("*************We received welcomemessage!******************");
        let responseText = "Welcome to Localize. Here you can book your slots for shopping at your nearest shop, Requires delivery of goods or Become a volunteer. What would you like to choose? ";
        // await appmodule.setSessionAndUser(userId);
        let replies = [
            {
                "content_type": "text",
                "title": "Self-service",
                "payload": "self_service"
            },
            {
                "content_type": "text",
                "title": "Need for volunteers ",
                "payload": "need_volunteers"
            },
            {
                "content_type": "text",
                "title": "Be a volunteer ",
                "payload": "be_volunteer"
            },
            {
                "content_type": "text",
                "title": " Cancel",
                "payload": "cancel"
            }
        ];

        fbService.sendQuickReply(userId, responseText, replies);
    },

    item_require: function (userId) {
        console.log("*************after enter address******************");
        let responseText = "Please enter the items you need. For example you can enter like follow.       I need 'cake and pizza' ";
        let replies = [
            {
                "content_type": "text",
                "title": "Start Over",
                "payload": "start_over"
            },
            {
                "content_type": "text",
                "title": "Previous ",
                "payload": "need_volunteers"
            },
            {
                "content_type": "text",
                "title": "Cancel ",
                "payload": "cancel"
            }
        ];

        fbService.sendQuickReply(userId, responseText, replies);
    }

    // all_timeslot: async function (userId){

    // }
}



function timeslot_require(userId) {
    console.log('***************we sent message that input timeslots.**********');
    fbService.timeslot_template(userId, () => {
        let responseText = " Click 'All the timeslots' button to check all timeslots ";
        let replies = [

            {
                "content_type": "text",
                "title": "Start Over",
                "payload": "start_over"
            },
            {
                "content_type": "text",
                "title": "Previous ",
                "payload": "inputname"
            },
            {
                "content_type": "text",
                "title": "Cancel ",
                "payload": "cancel"
            }
        ];



        fbService.sendQuickReply(userId, responseText, replies);
    });

}


