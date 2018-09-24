const axios = require('axios');

   function sendMessage(chatID, message){
            axios({
                method:'get',
                url:'https://api.telegram.org/bot516124228:AAGk6_VlhOeLGuWg4w22H1tYd9eHCUgLOR0/sendMessage?chat_id='+chatID+'&text='+message,
                responseType:'json'
              })
                .then(function(response) {
                    return response;
                });
    }


    module.exports.sendMessage = sendMessage;
