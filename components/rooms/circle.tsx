import React, {useEffect, useState} from 'react';
import styles from '../../styles/pages/Games.module.scss';
import anime from 'animejs';
import { v4 as uuidv4 } from 'uuid';
import {User} from '../../pages/api/users';


export type CircleGameProps = {
	firstUser: User,
	secondUser: User,
	winnerUser: User,
};

/**
 * Renders circle game
 */
const Circle = (props: CircleGameProps) => {
	const [winner, setWinner] = useState<User | null>(null);
	const maskId = uuidv4();
	const circle = React.useRef(null);
	const {
		firstUser,
		secondUser,
		winnerUser
	} = props;

	useEffect(() => {
		anime({
			targets: '#grad',
			duration: 6000,
			easing: 'cubicBezier(0.3, 0.6, 0.15, 1)',
			gradientTransform: 'rotate(1800 0.5 0.5)',
			// loop: true
		});

		setTimeout(() => {
			setWinner(winnerUser);
		}, 5000);
	}, [winnerUser]);

	return (
		<div className={styles.gameCircle}>
			<svg className={styles.gameCircleCircle} ref={circle} viewBox="0 0 512 512">
				<circle cx="50%" cy="50%" r="50%" className={styles.gameCircleOuterCircle} />
				<circle cx="50%" cy="50%" r="48%" className={styles.gameCircleInnerCircle} mask={`url(#${maskId})`} />

				<defs>
					<mask id={maskId} width="500" height="500">
						<rect x="0"
						      y="0"
						      width="500"
						      height="500"
						      fill="white" />
						<g transform="scale(0.1) translate(2300, 4000)">
							<path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z" />
						</g>
					</mask>
				</defs>
			</svg>

			{winner && (
				<div className={styles.gameWinner}>
					{winner.username}
				</div>
			)}

			<div className={styles.gameUsers}>
				<div className={`${styles.gameUser} ${firstUser.username === 'BOT' ? styles.botUser : ''}`}>
					{firstUser.username}
				</div>

				<span className="ms-3 me-3">
					vs
				</span>

				<div className={`${styles.gameUser} ${secondUser.username === 'BOT' ? styles.botUser : ''}`}>
					{secondUser.username}
				</div>
			</div>
		</div>
	)
};

export default Circle;