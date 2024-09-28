import { Column, Task } from "@/entity/project/_domain/types";
import {
    DragEndEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { useColumns } from "./use-columns";
import { useTasks } from "./use-tasks";

export const useDragContext = ({ boardId }: { boardId: number }) => {
    const {
        data: columnsData,
        isLoading: isColumnsLoading,
        isError: isColumnsError,
    } = useColumns({ boardId });
    const [columns, setColumns] = useState<Column[]>([]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const {
        data: tasksData,
        isLoading: isTaskLoading,
        isError: isTaskError,
    } = useTasks({ boardId });
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    useEffect(() => {
        if (columnsData?.data) {
            setColumns(columnsData.data);
        }
    }, [columnsData]);

    useEffect(() => {
        if (tasksData?.data) {
            setTasks(tasksData.data);
        }
    }, [tasksData]);

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const tasksId = useMemo(
        () => tasks.map((task) => `task-${task.id}`),
        [tasks]
    );

    function onDragStart(e: DragStartEvent) {
        if (e.active.data.current?.type === "Column") {
            setActiveColumn(e.active.data.current.column);
        }
        if (e.active.data.current?.type === "Task") {
            setActiveTask(e.active.data.current.task);
        }
    }

    function onDragEnd(e: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = e;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        setColumns((columns) => {
            const activeIndex = columns?.findIndex(
                (col) => col.id === activeId
            );
            const overIndex = columns?.findIndex((col) => col.id === overId);
            return arrayMove(columns, activeIndex, overIndex);
        });
    }

    function onDragOver(e: DragEndEvent) {
        const { active, over } = e;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";

        if (!isActiveTask) return;

        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex(
                    (task) => `task-${task.id}` === activeId
                );

                const overIndex = tasks.findIndex(
                    (task) => `task-${task.id}` === overId
                );

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverColumn = over.data.current?.type === "Column";

        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex(
                    (task) => `task-${task.id}` === activeId
                );

                tasks[activeIndex].columnId = overId as number;

                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    return {
        columns,
        isColumnsLoading,
        isColumnsError,
        columnsId,
        tasks,
        tasksId,
        activeColumn,
        activeTask,
        sensors,
        onDragStart,
        onDragEnd,
        onDragOver,
    };
};
