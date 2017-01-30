import { Meteor  } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import { Upvotes } from '../api/upvotes.js';


import './task.html';

Template.task.events({
        'click .upvote'() {

        var userId = Meteor.userId();

        if (!userId) {
        throw new Meteor.Error('not-authorized');
        }

        var upvotes = Upvotes.find({
        userId: userId,
        originId: this._id
                }).count();
        if(upvotes !== 0) {
        throw new Meteor.Error('duplicate');
        }
        Upvotes.insert({
            originId: this._id,
            userId: userId,
                });
        Tasks.update(this._id, {
                $set: { upvotes: this.upvotes + 1 },
                });
        },
        });

