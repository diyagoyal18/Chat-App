import Link from 'next/link';

export default function Home() {
    return (
        <div style={{ padding: '1rem' }}>
            <h1>Welcome</h1>
            <p>This is a simple Next.js + Express + Socket.IO + Drizzle ORM app.</p>
            <Link href="/chat">Go to Chat</Link>
        </div>
    );
}