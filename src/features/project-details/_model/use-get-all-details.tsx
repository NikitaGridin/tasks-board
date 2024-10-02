import { useEffect, useMemo, useState } from "react";
import { useColumns } from "./use-columns";
import { Column, Task } from "@/entity/project/_domain/types";
import { useTasks } from "./use-tasks";

export const useGetAllDetails = ({ boardId }: { boardId: number }) => {
    const {
        data: columnsData,
        isLoading: isColumnsLoading,
        isError: isColumnsError,
    } = useColumns({ boardId });
    const [columns, setColumns] = useState<Column[]>([]);

    const {
        data: tasksData,
        isLoading: isTaskLoading,
        isError: isTaskError,
    } = useTasks({ boardId });

    const [tasks, setTasks] = useState<Task[]>([]);

    const sortedColumns = useMemo(
        () => columnsData?.data?.sort((a, b) => a.order - b.order),
        [columnsData?.data]
    );
    const sortedTasks = useMemo(
        () => tasksData?.data?.sort((a, b) => a.order - b.order),
        [tasksData?.data]
    );

    useEffect(() => {
        if (sortedColumns) {
            setColumns(sortedColumns);
        }
    }, [sortedColumns]);

    useEffect(() => {
        if (sortedTasks) {
            setTasks(sortedTasks);
        }
    }, [sortedTasks]);

    return {
        columns,
        setColumns,
        isColumnsLoading,
        isColumnsError,
        tasks,
        setTasks,
        isTaskLoading,
        isTaskError,
    };
};
