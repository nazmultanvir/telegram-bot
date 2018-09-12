// const axios = require('axios');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Data');
const User = require('../model/User');
const PointHistory = require('../model/PointHistory');


   function pointCalculation(userId, changePoint){
       console.log(userId, changePoint)
        User.find({chatId: userId})
					.exec()
					.then(bet => {
                        repoints = bet[0].points - changePoint;
                        console.log(repoints);
						User.update({ chatId: userId }, { points: repoints }, { multi: true }, function (err, raw) {
                            const pointHistory = new PointHistory({ chatId: userId, betId : 45, points: bet[0].points, ChangePoint: changePoint, modificationTime : new Date() });
                            pointHistory.save().then((result) => {
                                console.log(result);
                            });
						  });
					});
    }

    module.exports.pointCalculation = pointCalculation;