import { auth0 } from '../drivers';

class UsersController {

	createUser(req, res) {

		let body = req.body.data || '';

		auth0.createUser(body)
			.then((data) => {

				res.status(201).send({ data });

			})
			.catch((error) => {

				res.status(error.statusCode).send({ message: error.message });

			});

	}

}

export default new UsersController();
