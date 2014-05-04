/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	autosubscribe: ['destroy', 'update','create','add:task'],
  attributes: {
  	name : { type : 'string', required: true},
  	created_by : { model: 'user' },
  	users : {
  		collection : 'user',
  		via : 'categories'
  	},
  	tasks : {
  		collection : 'task',
  	}

  }
};

