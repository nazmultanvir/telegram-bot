const axios = require('axios');



module.exports = {
    pairValue(pairValue1, pairValue2){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
              }, 2000);
            axios({
                method:'get',
                url:'https://quotes.instaforex.com/api/quotesTick?m=json&q='+pairValue1+','+pairValue2,
                responseType:'json'
              })
                .then(function(response) {
                    const data = response.data[1].ask + response.data[0].ask;
                    return resolve(data);
                });
          });
    }
};