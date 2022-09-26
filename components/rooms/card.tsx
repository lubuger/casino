import styles from '../../styles/pages/Rooms.module.scss';
import Circle, {CircleGameProps} from './circle';
import {Games} from '../../types/games';


type cardProps = {
	id: number,
	game: string,
	info: CircleGameProps
};


/**
 * Renders different games
 * @param props {cardProps}
 * @constructor
 */
const Card = (props: cardProps) => {
	const {
		id,
		game,
		info,
	} = props;

	return (
		<div className={`card me-5 ${styles.card}`}>
			<div className={`card-body ${styles.cardBody}`}>
				{game === Games.Circle && <Circle {...info} />}
			</div>
		</div>
	)
};

export default Card;