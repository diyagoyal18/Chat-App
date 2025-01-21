import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NotificationButton from '../components/NotificationButton';

// Connect to the Socket.IO server
const socket = io('http://localhost:3001');

function MyApp({ Component, pageProps }: AppProps) {
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        socket.on('newMessage', (msg: string) => {
            setNotifications((prev) => [...prev, `New message: ${msg}`]);
        });
        socket.on('userTyping', (user: string) => {
            setNotifications((prev) => [...prev, `${user} is typing...`]);
        });
    }, []);

    return (
        <div>
            <NotificationButton notifications={notifications} />
            <Component {...pageProps} socket={socket} />
        </div>
    );
}

export default MyApp;