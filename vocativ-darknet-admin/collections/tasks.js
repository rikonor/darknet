Tasks = new Mongo.Collection("tasks");

Schemas.Tasks = new SimpleSchema({
  text: {
    type: String,
    max: 60,
    autoform: {
      placeholder: "What's your task?"
    }
  },
  createdAt: Schemas.createdAt,
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert && !this.isSet) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function () {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.username,
            value: user._id
          };
        });
      }
    }
  },
  username: {
    type: String,
    autoValue: function () {
      // Username should be derived from siblingField `owner`
      var ownerId = this.siblingField("owner").value;
      return Meteor.users.findOne(ownerId).username || "N/A";
    },
    autoform: {
      type: "hidden"
    }
  },
  checked: {
    type: Boolean,
    label: "Complete",
    defaultValue: false,
  },
  private: {
    type: Boolean,
    defaultValue: false
  }
});

Tasks.attachSchema(Schemas.Tasks);
