"use server";

import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { serverAction } from "@/shared/lib/server-action";
import { Column } from "../_domain/types";

// Функция для обновления порядка колонок
export const updateColumns = serverAction(
    async ({
        boardId,
        columns,
    }: {
        boardId: number;
        columns: { id: number; order: number }[];
    }): Promise<Column[]> => {
        // Проверяем, существует ли доска
        const board = await prisma.board.findUnique({
            where: { id: boardId },
        });

        if (!board) {
            throw new CustomError({
                message: "Доска не найдена",
                code: ERROR_CODES.NOT_FOUND,
            });
        }

        const updatedColumns = await Promise.all(
            columns.map(({ id, order }) =>
                prisma.column.update({
                    where: { id },
                    data: { order },
                })
            )
        );

        return updatedColumns;
    }
);
