Meteor.methods
	adminInsertDoc: (doc,collection)->
		check arguments, [Match.Any]
		if Roles.userIsInRole this.userId, ['admin']
			this.unblock()
			result = adminCollectionObject(collection).insert doc

			return result

	adminUpdateDoc: (modifier,collection,_id)->
		check arguments, [Match.Any]
		if Roles.userIsInRole this.userId, ['admin']
			this.unblock()
			result = adminCollectionObject(collection).update {_id:_id},modifier
			return result

	adminRemoveDoc: (collection,_id)->
		check arguments, [Match.Any]
		if Roles.userIsInRole this.userId, ['admin']
			if collection == 'Users'
				Meteor.users.remove {_id:_id}
			else
				# global[collection].remove {_id:_id}
				adminCollectionObject(collection).remove {_id: _id}


	adminNewUser: (doc) ->
		check arguments, [Match.Any]
		if Roles.userIsInRole this.userId, ['admin']
			emails = doc.email.split(',')
			_.each emails, (email)->
				user = {}
				user.email = email
				user.password = doc.password

				_id = Accounts.createUser user

				# Set new users as 'admin'
				Roles.addUsersToRoles _id, ['admin'], Roles.GLOBAL_GROUP

	adminUpdateUser: (modifier,_id)->
		check arguments, [Match.Any]
		if Roles.userIsInRole this.userId, ['admin']
			this.unblock()
			result = Meteor.users.update {_id:_id}, modifier
			return result

	adminSendResetPasswordEmail: (doc)->
		check arguments, [Match.Any]
		if Roles.userIsInRole this.userId, ['admin']
			console.log 'Changing password for user ' + doc._id
			Accounts.sendResetPasswordEmail(doc._id)

	adminChangePassword: (doc)->
		check arguments, [Match.Any]
		if Roles.userIsInRole this.userId, ['admin']
			console.log 'Changing password for user ' + doc._id
			Accounts.setPassword(doc._id, doc.password)
			label: 'Email user their new password'

	adminCheckAdmin: ->
		check arguments, [Match.Any]
		user = Meteor.users.findOne(_id:this.userId)
		if this.userId and !Roles.userIsInRole(this.userId, ['admin']) and (user.emails.length > 0)
			email = user.emails[0].address
			if typeof Meteor.settings.adminEmails != 'undefined'
				adminEmails = Meteor.settings.adminEmails
				if adminEmails.indexOf(email) > -1
					console.log 'Adding admin user: ' + email
					Roles.addUsersToRoles this.userId, ['admin'], Roles.GLOBAL_GROUP
			else if typeof AdminConfig != 'undefined' and typeof AdminConfig.adminEmails == 'object'
				adminEmails = AdminConfig.adminEmails
				if adminEmails.indexOf(email) > -1
					console.log 'Adding admin user: ' + email
					Roles.addUsersToRoles this.userId, ['admin'], Roles.GLOBAL_GROUP
			else if this.userId == Meteor.users.findOne({},{sort:{createdAt:1}})._id
				console.log 'Making first user admin: ' + email
				Roles.addUsersToRoles this.userId, ['admin']

	adminAddUserToRole: (_id,role)->
		check arguments, [Match.Any]
		if Roles.userIsInRole this.userId, ['admin']
			Roles.addUsersToRoles _id, role, Roles.GLOBAL_GROUP

	adminRemoveUserToRole: (_id,role)->
		check arguments, [Match.Any]
		if Roles.userIsInRole this.userId, ['admin']
			Roles.removeUsersFromRoles _id, role, Roles.GLOBAL_GROUP

	adminSetCollectionSort: (collection, _sort) ->
		check arguments, [Match.Any]
		global.AdminPages[collection].set
			sort: _sort
