import type { NextApiRequest, NextApiResponse } from 'next';
import DB from '../../backend/sqlLite';
import {CircleGameProps} from '../../components/rooms/circle';
import {Games} from '../../types/games';


export type Rooms = {
	id: number,
	game: string,
	info: CircleGameProps | any
};

export type createRoomRequest = {
	game: string,
};

export type createRoomResponse = {
	success: boolean,
	room: Rooms,
}


const getRooms = (): Array<Rooms> => {
	const db = new DB();
	const stmt = db.db.prepare('SELECT * FROM rooms');
	const rooms = stmt.all();

	for (const index in rooms) {
		const room = rooms[index];

		if (room.game === 'circle') {
			const stmt = db.db.prepare('SELECT * FROM circle_game WHERE room_id = ?');
			const gameInfo = stmt.get(room.id);

			const firstUserStmt = db.db.prepare('SELECT * FROM users WHERE id = ?');
			const firstUser = firstUserStmt.get(gameInfo.first_user);
			const secondUserStmt = db.db.prepare('SELECT * FROM users WHERE id = ?');
			const secondUser = secondUserStmt.get(gameInfo.second_user);
			const winnerUserStmt = db.db.prepare('SELECT * FROM users WHERE id = ?');
			const winnerUser = winnerUserStmt.get(gameInfo.winner_user);

			rooms[index].info = {
				firstUser: firstUser ? firstUser : {
					id: 1,
					username: 'BOT',
				},
				secondUser: secondUser ? secondUser : {
					id: 1,
					username: 'BOT',
				},
				winnerUser: winnerUser
			};
		}
	}

	return rooms;
};

const createRoom = (room: string): createRoomResponse | Rooms => {
	const db = new DB();
	const roomReq: createRoomRequest = JSON.parse(room);

	if (roomReq.game === Games.Circle) {
		const random = Math.floor(Math.random() * 2) + 1;
		let firstUserId = 2;
		let secondUserId: number | null = 1;

		if (random === 2) {
			secondUserId = 3;
		}

		const users = [
			firstUserId,
			secondUserId,
		];
		const winnerUserId = users[Math.floor(Math.random() * users.length)];


		const firstUserStmt = db.db.prepare('SELECT * FROM users WHERE id = ?');
		const firstUser = firstUserStmt.get(firstUserId);
		const secondUserStmt = db.db.prepare('SELECT * FROM users WHERE id = ?');
		const secondUser = secondUserStmt.get(secondUserId);
		const winnerUserStmt = db.db.prepare('SELECT * FROM users WHERE id = ?');
		const winnerUser = winnerUserStmt.get(winnerUserId);

		let stmt = db.db.prepare('INSERT INTO rooms (game) VALUES (?)');
		const roomInsert = stmt.run('circle');

		stmt = db.db.prepare('INSERT INTO circle_game (room_id, first_user, second_user, winner_user) VALUES (?, ?, ?, ?)');

		const circleGameInsert = stmt.run(roomInsert.lastInsertRowid, firstUserId, secondUserId, winnerUserId);

		if (circleGameInsert.changes === 1) {
			return {
				success: true,
				room: {
					id: Number(roomInsert.lastInsertRowid),
					game: Games.Circle,
					info: {
						firstUser,
						secondUser: secondUser ? secondUser : {
							id: 1,
							username: 'BOT',
						},
						winnerUser,
					}
				}
			}
		}
	}

	return {
		success: false,
		room: {
			id: 0,
			game: '',
			info: {}
		}
	}
};


export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		res.status(200)
			.json(getRooms())
	} else {
		res.status(200)
			.json(createRoom(req.body))
	}
}