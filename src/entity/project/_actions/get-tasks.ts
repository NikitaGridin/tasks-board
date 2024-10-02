"use server";

import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { serverAction } from "@/shared/lib/server-action";
import { Task } from "../_domain/types";

export const getTasks = serverAction(
    async ({ boardId }: { boardId: number }): Promise<Task[]> => {
        const tasks = await prisma.task.findMany({
            where: {
                boardId,
            },
        });
        if (!tasks) {
            throw new CustomError({
                message: "Колонки не найдены",
                code: ERROR_CODES.NOT_FOUND,
            });
        }
        return tasks;
    }
);
