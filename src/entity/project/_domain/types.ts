export type UserProjectsResponse = {
    id: number;
    name: string;
    authorId: number;
}[];

export type ProjectDetails = {
    id: number;
    name: string;
    authorId: number;
};

export type Column = {
    id: number;
    order: number;
    name: string;
    boardId: number;
};

export type UpdatedColumn = {
    id: number;
    order: number;
};

export type Task = {
    id: number;
    order: number;
    title: string;
    content: string | null;
    columnId: number;
};

export type UpdatedTask = {
    id: number;
    order: number;
    columnId: number;
};

export type Board = {
    id: number;
    name: string;
    projectId: number;
};
