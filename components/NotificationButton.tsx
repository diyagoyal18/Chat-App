import { useState } from 'react';

export default function NotificationButton({ notifications }: { notifications: string[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ position: 'fixed', top: 10, right: 10 }}>
            <button onClick={() => setOpen(!open)}>
                Notifications ({notifications.length})
            </button>
            {open && (
                <div style={{ border: '1px solid #ccc', background: '#fff', marginTop: 5 }}>
                    {notifications.map((note, index) => (
                        <div key={index} style={{ padding: '4px 8px' }}>
                            {note}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}