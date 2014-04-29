/**
 * TaskController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	todoTaskCount : function (req,res){
		Task.count({
			user : req.session.user, 
			done : false}).exec()
	},
	doneTaskCount : function (req,res){
		Task.count({
			user : req.session.user, 
			done : false}).exec()
	},
	todoTask : function (req,res){
		Task.find({
			user : req.session.user, 
			done : false})
		}).exect(function(err,task){

		})
	},
	newTask : function (req,res){
		Task.create({
			user : req.session.user,
			done : (req.param('done') != undefined) ? req.param('done'): false,
			name : req.param('name')}).exec(function(err,task){
				if (err) return next(err);
				next(task)
			})

		})
	},
	markAsDone : function (req,res){
		Task.find({user : req.session.user}).update({finishedBy: req.session.user, done: true, finishedAt: new Date() }).exec(function(err,task){
			console.info(task);
		})
	},
	destroyTask : function (req, res){

	}
