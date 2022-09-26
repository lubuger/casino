import type { NextApiRequest, NextApiResponse } from 'next';
import DB from '../../backend/sqlLite';


export type Result = {
	result: string,
	data?: any,
}


export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Result>
) {
	const db = new DB();

	db.test();

	res.status(200)
		.json({ result: 'success' })
}