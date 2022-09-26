import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import API from '../config/API';


const Home: NextPage = () => {
    const initDB = () => {
        fetch(API.initDB).then((response) => {
           alert('Database initialized');
        });
    };

    return (
        <>
            <Head>
                <title>Casino</title>
                <meta name="description" content="web casino" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container-fluid">
                <div className="row">
                    <div className="col d-flex justify-content-center align-items-center flex-column">
                        <h4 className="mt-5">App routes:</h4>

                        <ul className="list-group w-25 mt-3">
                            <li className="list-group-item list-group-item-action text-center">
                                <Link href="/games/circle/rooms">
                                    Circle game rooms
                                </Link>
                            </li>
                        </ul>

                        <div className="mt-5 d-flex flex-column">
                            <p>
                                Click on init DB if not initialized before
                            </p>

                            <button className="btn btn-dark" onClick={() => initDB()}>
                                init DB
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
