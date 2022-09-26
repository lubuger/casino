import React from 'react';
import {connect} from 'react-redux';
import Head from 'next/head';

import {createRoomRequest, Rooms} from '../../../api/rooms';
import {createRoom} from '../../../../store/roomSlice';
import Card from '../../../../components/rooms/card';
import {Games} from '../../../../types/games';


type RoomProps = {
    room: Rooms,
    rooms: Array<Rooms>,
    createRoom: (data: createRoomRequest) => {},
};

/**
 * Renders all rooms with different games
 */
class Room extends React.Component<RoomProps, any> {
    componentDidMount() {
        this.props.createRoom({
            game: Games.Circle
        });
    }

    render() {
        const {
            room
        } = this.props;

        return (
            <>
                <Head>
                    <title>Room </title>
                    <meta name="description" content="web casino" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <svg className="visually-hidden" viewBox="0 0 512 512">
                    <defs>
                        <linearGradient id="grad" x1="0.5" y1="1" x2="0" y2="0" gradientTransform="rotate(0 0.5 0.5)">
                            <stop offset="0" stopColor="#4db1cc" />
                            <stop offset="49%" stopColor="#4db1cc" />
                            <stop offset="49%" stopColor="#241e2d" />
                            <stop offset="51%" stopColor="#241e2d" />
                            <stop offset="0" stopColor="#bf3359" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="container-fluid p-4 mt-1" id="rooms">
                    <div className="row mt-5">
                        <div className="col d-flex align-items-center justify-content-center flex-wrap">
                            <Card {...room} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state: { rooms: { rooms: Array<Rooms>, room: Rooms }; }) => ({
    rooms: state.rooms.rooms,
    room: state.rooms.room,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        createRoom: (data: createRoomRequest) => dispatch(createRoom(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Room)