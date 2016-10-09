import { users } from '../controllers';

export default [
	{
		path: '/users/create',
		method: 'post',
		controller: users.createUser.bind(users)
	}
];
