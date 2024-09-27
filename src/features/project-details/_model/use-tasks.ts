import { useGetTasks } from "@/entity/project/project";

export const useTasks = () => {
    const { data, isError, isLoading } = useGetTasks();

    return { data, isError, isLoading };
};
