

const Telegraf = require('telegraf')
const Router = require('telegraf/router')
const Extra = require('telegraf/extra')
const session = require('telegraf/session')
const Markup = require('telegraf/markup')

//db
const mongoose = require('mongoose');
const currencyPair= require('./method/cureencyPair');
const sendMessage =require('./method/sendMessage');
const pointCalculation= require('./method/pointsCalculation');
const BetGroup = require('./method/betGroup');
mongoose.connect('mongodb://127.0.0.1:27017/Data');
const User = require('./model/User');
const Bet = require('./model/Bet');
const BetList = require('./model/BetList');


const bot = new Telegraf('516124228:AAGk6_VlhOeLGuWg4w22H1tYd9eHCUgLOR0')



bot.use(session())

bot.command('start', ctx => {
	let name = ctx.update.message.from.first_name;
	User.find({ chatId: ctx.from.id })
    .exec()
    .then(user => {
      if (user <= 1) {
		const user = new User({ chatId: ctx.from.id, username : ctx.from.username, first_name: ctx.from.first_name, last_name: ctx.from.last_name, points:'400', language_code:ctx.from.language_code });
		user.save().then(() => {
			console.log("saved");
			ctx.reply('Hello ' +
			 			name +
						' ! Do you want to pump your financial intuition and get a real bonus to your trading account? Do betting on growth or fall on our bot question and scoring points. By the end of the month, the top 10 users will have access to a trading account with a balance of 500 USD.',)
		});

		setTimeout(function(){ 
				ctx.reply(
					'You are credited with 400 bonus points for registration. Invite your friends and get 200 more points for each friend.',
				);
		 }, 2000);
	  }else{
		  ctx.reply('Welcome back ! '+ name);
		  ctx.reply('For set a bet, Use /bet');
	  }
	});

});

// // Bet
// //BetUP
// bot.action('BetUP', (ctx) => {
// 	console.log(ctx.callbackQuery);
// 	Bet.find({chatId: ctx.from.id, betId: BetGroup.betGroupRoundUp()})
// 	.exec()
// 	.then(bet => {
// 		if(bet.length <= 100){
// 			async function asyncCall() {
// 				var result = await currencyPair.pairValue('EURUSD','GOLD');
// 				return result;
// 			  }
// 			  asyncCall().then((currency)=>{
		
// 			const bet = new Bet({ chatId: ctx.from.id, betId : BetGroup.betGroupRoundUp(), betType: 1, betCurrencyValue: currency.toFixed(2), betReward : BetGroup.betAward(), betDate: new Date() });
// 			bet.save().then((result) => {
// 					ctx.reply('Thank you so much for your bet, you have bet 👍 UP when currency pair value is '+result.betCurrencyValue+'  if you win you will get '+result.betReward+' as reward point');
// 					pointCalculation.pointCalculation(ctx.from.id, 50)
// 			});
		
// 		})
// 		}else{
// 			ctx.reply('you have no bet remaining on this week, to check you remaining bet /betreamin');
// 		}
// 	})

// })
// bot.action('BetDOWN', (ctx) => {
// 	console.log(ctx.callbackQuery);
// 	Bet.find({chatId: ctx.from.id, betId: BetGroup.betGroupRoundUp()})
// 	.exec()
// 	.then(bet => {
// 		if(bet.length <= 100){
// 			async function asyncCall() {
// 				var result = await currencyPair.pairValue('EURUSD','GOLD');
// 				return result;
// 			  }
// 			  asyncCall().then((currency)=>{
		
// 			const bet = new Bet({ chatId: ctx.from.id, betId : BetGroup.betGroupRoundUp(), betType: 0, betCurrencyValue: currency.toFixed(2), betReward : BetGroup.betAward(), betDate: new Date() });
// 			bet.save().then((result) => {
// 					ctx.reply('Thank you so much for your bet, you have bet 👎 Down when currency pair value is '+result.betCurrencyValue+'  if you win you will get '+result.betReward+' as reward point');
// 					pointCalculation.pointCalculation(ctx.from.id, 50)
// 			});
		
// 		})
// 		}else{
// 			ctx.reply('you have no bet remaining on this week, to check you remaining bet /betreamin');
// 		}
// 	})

// })

//CallBackQuery


bot.command('user', ctx=>{
	User.find({})
    .exec()
    .then(user => {
		let message = 'this test knock for test from nazmul 2nd test';
		let i  = 0;
		for(i==0; i<=user.length;i++){
			let chatId = user[i].chatId;
			sendMessage.sendMessage(chatId, message);
		}
	});
})

// bot.command('bet1v', ctx=>{
// 	async function asyncCall() {
// 		var result = await currencyPair.pairValue('EURUSD','GOLD');
// 		return result;
// 	  }
// 	  asyncCall().then((result)=>{

// 		ctx.reply('The first sum is EURUSD + GOLD rates, the current rate is '+result+'. Do you think the rate will go up or down by the end of the week?').then(()=>{
// 			ctx.reply('Press UP or DOWN', Markup.inlineKeyboard([
// 				Markup.callbackButton('👍 UP', 'BetUP'),
// 				Markup.callbackButton('👎 DOWN', 'BetDOWN'),
// 			  ]).extra());
// 		})

// 	  })
// })


//points
bot.command('points', ctx =>{
	User.find({chatId: ctx.from.id})
    .exec()
    .then(user => {
		ctx.reply('You have '+user[0].points+' bet point remaming !');
	  
	});
})


//deposite
bot.command('deposite', ctx =>{

	const DepositeChatId = '375433963'; //Nazmul 578417732
	User.update({ chatId: DepositeChatId }, { points: '5000' }, { multi: true }, function (err, raw) {
		if (err) return handleError(err);
		console.log(raw);
			User.find({chatId: DepositeChatId})
			 .exec()
			.then(user => {
				console.log(user);
			});
	  });
})

//points
bot.command('/betreamin', ctx =>{
	Bet.find({ chatId: ctx.from.id, betId : BetGroup.betGroupRoundUp() })
    .exec()
    .then(bet => {
		let betreamin = 3 - bet.length;
		if(bet.length <=3){
			ctx.reply('You have '+betreamin+' bet remaining this week !');
		}else{
			ctx.reply('You have no bet remaining this week !');
		}
	});
})

//test

//points
bot.command('/result', ctx =>{
	ctx.reply('This weeks bet result is not publish yet !');

})


//setBets 
bot.command('bets', ctx=>{
	const command =ctx.update.message.text;

	BetList.find({}).exec()
    .then(result => {
		console.log(result)
	})
	let res = command.split(" ");

	BetList.find({betId : BetGroup.betGroupRoundUp()}).exec()
    .then(result => {
		console.log(result);
		if(result.length <= 2){
			const betList = new BetList({ betListId: (BetGroup.betGroupRoundUp()*10)+(result.length+1), betId : BetGroup.betGroupRoundUp(), betListCurrencyOne: res[1], betListCurrencyTwo: res[2], betListDate : new Date() });
			betList.save().then((betList) => {
				console.log(betList);
				ctx.reply('You have set bet currency pair successfully !');
			})
		}else{
			ctx.reply('You have already set three bet currency pair for this week !');
		}
	})

})

bot.command('betsdel', ctx=>{
	BetList.remove({betId : BetGroup.betGroupRoundUp()}).exec()
    .then(result => {
		console.log('removes : findByIdAndRemove',result);
		BetList.find({betId : BetGroup.betGroupRoundUp()}).exec()
		.then(result => {
			console.log(result);})
	
	})

})


// help
bot.command('help', ctx => {
	ctx.reply('/start : starting the bot');
	ctx.reply('/bet : Set Bet');
	ctx.reply('/points : chceking remaining points');
	ctx.reply('/betreamin : checking reaminig Bet');
	ctx.reply('/help : List of all command');
    
})









bot.command('bet', ctx => {
	BetList.find({ betId : BetGroup.betGroupRoundUp() })
    .exec()
    .then(betList => {
		console.log(betList);
		function currencyPair(){
			let currencyPair = [];
			var i;
			for (i = 0; i < 3; i++) { 
				currencyPair[i] = betList[i].betListCurrencyOne +' + '+ betList[i].betListCurrencyTwo
			}
			
			console.log(currencyPair)
			var options = {
				reply_markup: JSON.stringify({
					 inline_keyboard: currencyPair.map((x, xi) => ([{
						 text: x,
						 callback_data: String('setBet:'+betList[xi].betListCurrencyOne+':'+betList[xi].betListCurrencyTwo+':'+BetGroup.betGroupRoundUp()+(xi+1)),
					 }])),
			   }),
		   };
			return ctx.reply(`Please choose currency pair from the list for set bet !`, options)
		}

		currencyPair();

	})

});

bot.on("callback_query", ctx => {
	const query = ctx.update.callback_query.data;
	let res = query.split(":");
	console.log(res);
	if(res[0]=='setBet'){
		async function asyncCall() {
			var result = await currencyPair.pairValue(res[1],res[2]);
			return result;
		  }
		  asyncCall().then((result)=>{
			  const SetBetProcessing = ['👍 UP', '👎 DOWN'];
			  var SetBetProcessingMenu = {
				reply_markup: JSON.stringify({
					 inline_keyboard: SetBetProcessing.map((x, xi) => ([{
						 text: x,
						 callback_data: String('SetBetProcessing:'+xi+':'+res[1]+':'+res[2]+':'+res[3]),
					 }])),
			   }),
		   };
		   return ctx.reply('  You have select '+res[1]+' + '+res[2]+' Currency Pair. the current Pair rate is '+result+'. Do you think the rate will go up or down by the end of the week?', SetBetProcessingMenu)
	
		  })
	}if (res[0]=='SetBetProcessing') {
		Bet.find({chatId: ctx.from.id, betId: BetGroup.betGroupRoundUp()})
		.exec()
		.then(bet => {
			if(bet.length <=3){
				Bet.find({chatId: ctx.from.id, betId: BetGroup.betGroupRoundUp(), betListId : res[4]})
				.exec()
				.then(bet => {
					console.log('SetBetProcessing_______________', bet)
					if(bet.length === 0){
						async function asyncCall() {
							var result = await currencyPair.pairValue(res[2],res[3]);
							return result;
						  }
						  asyncCall().then((currency)=>{
					
						const bet = new Bet({ chatId: ctx.from.id, betId : BetGroup.betGroupRoundUp(),betListId : res[4], betType: res[1], betCurrencyValue: currency.toFixed(2), betReward : BetGroup.betAward(), betDate: new Date() });
						bet.save().then((result) => {
								console.log(result);
								ctx.reply('Thank you so much for your bet, you have bet 👍 UP when currency pair value is '+result.betCurrencyValue+'  if you win you will get '+result.betReward+' as reward point');
								pointCalculation.pointCalculation(result.chatId, 50);
						});
					
					})

					}else{
						ctx.reply('you have already set be on this currency pair !');
					}
				})

			}else {
				ctx.reply('you have no bet remaining on this week, to check you remaining bet /betreamin');
			}
		})
		
	} else {
		
	}

	});


bot.startPolling()

