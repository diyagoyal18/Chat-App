import { useState, useEffect } from 'react';

export default function Chat({ socket }: any) {
    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.off('newMessage').on('newMessage', (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });
    }, [socket]);

    function handleSend() {
        if (message.trim() !== '') {
            socket.emit('message', message);
            setMessage('');
        }
    }

    function handleTyping() {
        if (!typing) {
            setTyping(true);
            socket.emit('typing', 'User');
            setTimeout(() => setTyping(false), 2000);
        }
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Chat</h1>
            <div style={{ border: '1px solid #ccc', height: 200, overflowY: 'auto', marginBottom: 8 }}>
                {messages.map((m, i) => (
                    <div key={i}>{m}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    handleTyping();
                }}
            />
            <button onClick={handleSend} style={{ marginLeft: 8 }}>Send</button>
        </div>
    );
}