import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { db } from '../drizzle/db';
import { messages } from '../drizzle/schema';

const t = initTRPC.create();

export const appRouter = t.router({
    getMessages: t.procedure.query(async () => {
        const rows = await db.select().from(messages);
        return rows;
    }),
    sendMessage: t.procedure
        .input(z.object({ senderId: z.string(), content: z.string() }))
        .mutation(async ({ input }) => {
            const newMsg = await db.insert(messages).values({
                senderId: input.senderId,
                content: input.content
            }).returning();
            return newMsg[0];
        })
});

export type AppRouter = typeof appRouter;