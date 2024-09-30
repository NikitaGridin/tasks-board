"use server";

import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { serverAction } from "@/shared/lib/server-action";
import { Task } from "../_domain/types";

export const updateTasks = serverAction(
    async ({
        boardId,
        tasks,
    }: {
        boardId: number;
        tasks: { id: number; order: number; columnId: number }[];
    }): Promise<Task[]> => {
        const board = await prisma.board.findUnique({
            where: { id: boardId },
        });

        if (!board) {
            throw new CustomError({
                message: "Доска не найдена",
                code: ERROR_CODES.NOT_FOUND,
            });
        }

        const updatedTasks = await Promise.all(
            tasks.map(({ id, order, columnId }) =>
                prisma.task.update({
                    where: { id },
                    data: { order, columnId },
                })
            )
        );

        return updatedTasks;
    }
);
