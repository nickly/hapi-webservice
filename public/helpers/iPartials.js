'use strict';
module.exports = function (context) {
	let type=context.hash.type;
    let items=context.data.root.layout;
	if(type&&items&&items[type])
	{  
		return context.data.root.skin+'/partials/'+items[type]; 
	}
	else
	{
		return 'null';
	}
};