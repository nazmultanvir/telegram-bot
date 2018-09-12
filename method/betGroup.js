


function betGroup(){
	const date1 = new Date("1/8/2018");
	const date2 = new Date();
	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
	const diff =  Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	return diff/7;
}

function betGroupRoundUp(){ 
	const date1 = new Date("1/8/2018");
	const date2 = new Date();
	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
	const diff =  Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	return diff/7 | 0;  
}
function betAward(){
const date1 = new Date("1/8/2018");
const date2 = new Date();
const timeDiff = Math.abs(date2.getTime() - date1.getTime());
const diff =  Math.ceil(timeDiff / (1000 * 3600 * 24)); 
const betGroup = diff/7;
const betGroupRoundUp = betGroup | 0;
const betDateAward = betGroup-betGroupRoundUp;
const betProcessAward = 1- betDateAward;
const betAward = 50 + (200 * betProcessAward);
return betAward | 0;
}



module.exports.betGroup = betGroup;
module.exports.betAward = betAward;
module.exports.betGroupRoundUp = betGroupRoundUp;