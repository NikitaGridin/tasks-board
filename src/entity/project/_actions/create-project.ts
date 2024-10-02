"use server";

import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { serverAction } from "@/shared/lib/server-action";

export const createProject = serverAction(
    async ({
        name,
        authorId,
        companyId,
    }: {
        name: string;
        authorId: number;
        companyId: number;
    }): Promise<{
        id: number;
        name: string;
        authorId: number;
        companyId: number;
    }> => {
        // Проверка наличия автора проекта
        const author = await prisma.user.findUnique({
            where: { id: authorId },
        });

        if (!author) {
            throw new CustomError({
                message: "Автор проекта не найден",
                code: ERROR_CODES.NOT_FOUND,
            });
        }

        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!company) {
            throw new CustomError({
                message: "Компания не найдена",
                code: ERROR_CODES.NOT_FOUND,
            });
        }

        // Создание проекта
        const project = await prisma.project.create({
            data: {
                name,
                author: {
                    connect: { id: authorId },
                },
                company: {
                    // Connect the project to the company
                    connect: { id: companyId },
                },
            },
        });

        // Создание доски для проекта
        const board = await prisma.board.create({
            data: {
                project: {
                    connect: {
                        id: project.id,
                    },
                },
                name: "Главная",
            },
        });

        // Создание трех колонок: Ожидание, В работе, Готово
        const columns = await prisma.column.createMany({
            data: [
                {
                    boardId: board.id,
                    name: "Ожидание",
                    order: 1,
                },
                {
                    boardId: board.id,
                    name: "В работе",
                    order: 2,
                },
                {
                    boardId: board.id,
                    name: "Готово",
                    order: 3,
                },
            ],
        });

        return {
            id: project.id,
            name: project.name,
            authorId: project.authorId,
            companyId: project.companyId,
        };
    }
);
