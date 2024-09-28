export type Id = string | number;

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
    name: string;
    boardId: number;
};
export type Task = {
    id: Id;
    title: string;
    content: string | null;
    columnId: number;
};

export type Board = {
    id: number;
    name: string;
    projectId: number;
};
