import '../styles/main.scss';
import {FC} from 'react';
import type { AppProps } from 'next/app';
import {wrapper} from '../store';

const MyApp: FC<AppProps> = ({Component, pageProps}) => <Component {...pageProps} />;


export default wrapper.withRedux(MyApp);