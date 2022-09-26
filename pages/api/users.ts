import type { NextApiRequest, NextApiResponse } from 'next';
import DB from '../../backend/sqlLite';


export type User = {
	id: number,
	username: string,
}


export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<User>>
) {
	const db = new DB();

	const stmt = db.db.prepare('SELECT * FROM users');

	res.status(200)
		.json(stmt.all())
}