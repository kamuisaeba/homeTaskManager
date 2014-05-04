/**
 * TaskController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	todoTaskCount : function (req,res){
		Task.count({
			user : 1, 
			done : false}).exec(function(err,found){
				if (err) found = 0;
				res.json({todoTaskCounter:found});

			})
	},
	todoTask : function (req,res){
		Task.find({
			user : req.session.user, 
			done : false}).exec(function(err,task){
			res.json(task);

		})
	},
	newTask : function (req,res){
		Task.create({
			user : req.session.user,
			done : (req.param('done') != undefined) ? req.param('done'): false,
			name : req.param('name')}).exec(function(err,task){
				if (err) return next(err);
				res.json(task);
			})
	},
	markAsDone : function (req,res){
		Task
		.find({user : req.session.user})
		.update({finishedBy: 1, done: true, finishedAt: new Date() })
		.exec(function(err,task){
			console.info(task);
		})
	},
	destroyTask : function (req, res){
		console.info("destroy")
	}
};
