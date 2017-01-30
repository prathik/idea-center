import { Template } from 'meteor/templating';

import { Tasks  } from '../api/tasks.js';

import './task.js';
import './body.html';


weightedComparator = function(t1, t2) {
	var timeDiff = t1.createdAt - t2.createdAt;
	var diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
	if(diffDays == 0) {
		var diff = t2.upvotes - t1.upvotes;
		return diff;
	}
	var factor = 0.9748805191**diffDays;
	if(t1.createdAt > t2.createdAt) {
		return t2.upvotes*factor - t1.upvotes;
	} else {
		return t2.upvotes - t1.upvotes*factor;
	}
}
Template.body.helpers({
	tasks() {
		return Tasks.find({}, { sort: weightedComparator });
	},

});

Template.body.events({
	'submit .new-task'(event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;
		const text = target.text.value;

		// Insert a task into the collection
		Tasks.insert({
			text,
			upvotes: 0,
			createdAt: new Date(), // current time
		});

		// Clear form
		target.text.value = '';
	},
});

