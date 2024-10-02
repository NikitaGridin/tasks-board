"use server";

import { getSessionStrictServer } from "@/entity/user/session.server";
import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { serverAction } from "@/shared/lib/server-action";

export const createTask = serverAction(
    async ({
        title,
        content,
        boardId,
        columnId,
    }: {
        title: string;
        content: string;
        boardId: number;
        columnId: number;
    }): Promise<{
        id: number;
        name: string;
        authorId: number;
        boardId: number;
        columnId: number;
        order: number;
    }> => {
        const session = await getSessionStrictServer();
        if (session.error) {
            throw new CustomError({
                message: session.error.message,
                code: session.error.code,
            });
        }
        if (!session.data) {
            throw new CustomError({
                message: "Сессия не установлена",
                code: ERROR_CODES.UNAUTHORIZED,
            });
        }
        const author = await prisma.user.findUnique({
            where: { id: session.data.id },
        });

        if (!author) {
            throw new CustomError({
                message: "Автор задачи не найден",
                code: ERROR_CODES.NOT_FOUND,
            });
        }
        const column = await prisma.column.findUnique({
            where: { id: columnId },
        });

        if (!column) {
            throw new CustomError({
                message: "Колонка не найдена",
                code: ERROR_CODES.NOT_FOUND,
            });
        }
        const board = await prisma.board.findUnique({
            where: { id: boardId },
        });

        if (!board) {
            throw new CustomError({
                message: "Доска не найдена",
                code: ERROR_CODES.NOT_FOUND,
            });
        }

        const maxOrderTask = await prisma.task.findFirst({
            where: { columnId },
            orderBy: { order: "desc" },
        });

        const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 1;

        const task = await prisma.task.create({
            data: {
                title,
                content,
                userId: author.id,
                order: newOrder,
                board: {
                    connect: { id: board.id },
                },
                column: {
                    connect: { id: column.id },
                },
            },
        });

        return {
            id: task.id,
            name: task.title,
            authorId: task.userId,
            order: task.order,
            columnId: task.columnId,
            boardId: task.boardId,
        };
    }
);
