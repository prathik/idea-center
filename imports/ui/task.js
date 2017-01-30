import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({
    'click .upvote'() {
        Tasks.update(this._id, {
            $set: { upvotes: this.upvotes + 1 },
        });
    },
});

