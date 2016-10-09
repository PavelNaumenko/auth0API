import config from 'config';
import fetch from 'node-fetch';

class Auth0Driver {

	constructor() {

		this.token = `Bearer ${config.auth0.token}`;

	}

	createUser(body) {

		return new Promise((resolve, reject) => {

			fetch('https://pashka95.eu.auth0.com/api/v2/users', {

				method: 'POST',
				headers: {
					Authorization: this.token,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)

			})
				.then((response) => {

					response.json().then((data) => {

						resolve(data);

					});

				})
				.catch((error) => {

					reject({ statusCode: error.statusCode, message: error });

				});

		});

	}

}

export default new Auth0Driver();
