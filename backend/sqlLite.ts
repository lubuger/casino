import type {Database} from 'better-sqlite3';
import * as BetterSqlite3 from 'better-sqlite3';

class DB {
    public db: Database;

    constructor() {
        this.db = new BetterSqlite3.default('database.db', {
            verbose: console.log
        });

        this.initTables();
    }

    initTables() {
        const createUsers = "CREATE TABLE IF NOT EXISTS users ('id' integer PRIMARY KEY, 'username' varchar);";
        const createRooms = "CREATE TABLE IF NOT EXISTS rooms ('id' integer PRIMARY KEY, 'game' varchar);";
        const createCircleGame = "CREATE TABLE IF NOT EXISTS circle_game ('id' integer PRIMARY KEY, 'room_id' integer, 'first_user' integer, 'second_user' integer DEFAULT NULL, 'winner_user' integer DEFAULT NULL);";

        this.db.exec(createUsers);
        this.db.exec(createRooms);
        this.db.exec(createCircleGame);
    }

    test() {
        let stmt = this.db.prepare('INSERT INTO rooms VALUES (?, ?)');
        stmt.run(1, 'circle');
        stmt.run(2, 'circle');

        stmt = this.db.prepare('INSERT INTO circle_game VALUES (?, ?, ?, ?, ?)');
        stmt.run(1, 1, 1, null, 1);
        stmt.run(2, 2, 1, 2, null);

        stmt = this.db.prepare('INSERT INTO users VALUES (?, ?)');
        // stmt.run(1, 'user');
        stmt.run(1, 'BOT');
        stmt.run(2, 'user');
        stmt.run(3, 'user2');
    }
}

export default DB;
