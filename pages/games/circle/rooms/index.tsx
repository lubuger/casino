import React from 'react';
import {connect} from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';

import {createRoomRequest, Rooms} from '../../../api/rooms';
import {createRoom, fetchRooms, setRoomsState} from '../../../../store/roomSlice';
import Card from '../../../../components/rooms/card';


type RoomProps = {
    rooms: Array<Rooms>,
    setRoomsState: (payload: Array<Rooms>) => {},
    fetchRooms: () => {},
    createRoom: (data: createRoomRequest) => {},
};

/**
 * Renders all rooms with different games
 */
class Room extends React.Component<RoomProps, any> {
    componentDidMount() {
        this.props.fetchRooms();
    }

    createRoom() {
        Router.push('room')
        // this.props.createRoom({
        //     game: Games.Circle
        // });
        // this.props.fetchRooms();
    }

    render() {
        return (
            <>
                <Head>
                    <title>All rooms</title>
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
                    <div className="row d-flex align-items-center">
                        <div className="col">
                            <button className="btn btn-info border-rounded" onClick={() => this.createRoom()}>
                                Create room
                            </button>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col d-flex align-items-center justify-content-start flex-wrap">
                            {this.props.rooms.map(el => (
                                <Card {...el} key={`room_${el.id}`}/>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state: { rooms: { rooms: Array<Rooms> }; }) => ({
    rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        // dispatching plain actions
        setRoomsState: (payload: Array<Rooms>) => dispatch(setRoomsState(payload)),
        fetchRooms: () => dispatch(fetchRooms()),
        createRoom: (data: createRoomRequest) => dispatch(createRoom(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Room)
