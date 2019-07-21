class Repository {
	constructor(database, userID) {
		this.database = database;
		this.userID = userID;
	}
	
	async getUsers() {
		const ref = database.ref("users/");
		const snaps = await ref.once('value');
		let users = [];
		snaps.forEach((child) => {
			let user = child.val();
			user['id'] = child.key;
			users.push(user);
		});
		return users;
	}
	
	async getUserById(id) {
		const ref = database.ref("users/" + id);
		const snap = await ref.once('value');
		const user = snap.val();
		user['id'] = id;
		return user;
	}
	
	async getActivityByID(id, userID) {
		const ref = this.database.ref('activities/' + userID + '/' + id);
		const snap = await ref.once('value');
		const key = snap.key;
		const activity = snap.val();
		activity['id'] = key;
		return activity;
	}
	
	async getActivitiesByUserId(userId) {
		const ref = database.ref('activities/' + userId);
		const snaps = await ref.once('value');
		let activities = [];
		snaps.forEach((child) => {
			let activity = child.val();
			activity['id'] = child.key;
			activities.push(activity);
		});
		return activities.reverse();
	}
	
	updateUser(id, newUser, userID) {
		this.database.ref('users/' + (userID || USER_ID)).update(newUser);
	}
	
	insertActivity(activity){
		const message = this.database.ref('activities/' + USER_ID).push(activity);
		return message.key;
	}
}