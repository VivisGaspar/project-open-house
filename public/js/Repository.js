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

	updateUser(id, newUser, userID) {
		this.database.ref('users/' + (userID || USER_ID)).update(newUser);
	}
}