import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBoards } from "../_actions/get-boards";
import { getColumns } from "../_actions/get-columns";
import { getTasks } from "../_actions/get-tasks";
import { getUserProjects } from "../project.server";

const userProjects = "userProjects";
const boards = "boards";
const columns = "columns";
const tasks = "tasks";

export function useUserProjects(companyId: number) {
    return useQuery({
        queryKey: [userProjects, companyId],
        queryFn: () => getUserProjects(companyId),
        enabled: companyId !== undefined,
    });
}

export function useInvalidateUserProjects(companyId: number) {
    const queryClient = useQueryClient();
    return () =>
        queryClient.invalidateQueries({
            queryKey: ["userProjects", companyId],
        });
}

export function useGetBoards({ projectId }: { projectId: number }) {
    return useQuery({
        queryKey: [boards, projectId],
        queryFn: () => getBoards({ projectId }),
    });
}
export function useGetColumns({ boardId }: { boardId: number }) {
    return useQuery({
        queryKey: [columns, boardId],
        queryFn: () => getColumns({ boardId }),
    });
}

export function useGetTasks({ boardId }: { boardId: number }) {
    return useQuery({
        queryKey: [tasks, boardId],
        queryFn: () => getTasks({ boardId }),
    });
}
export function useInvalidateTasks(boardId: number) {
    const queryClient = useQueryClient();
    return () =>
        queryClient.invalidateQueries({
            queryKey: [tasks, boardId],
        });
}
