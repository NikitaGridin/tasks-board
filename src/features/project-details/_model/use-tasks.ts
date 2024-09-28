import { useGetTasks } from "@/entity/project/project";

export const useTasks = ({ boardId }: { boardId: number }) => {
    const { data, isError, isLoading } = useGetTasks({ boardId });

    return { data, isError, isLoading };
};
