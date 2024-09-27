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

export const useDragColumns = ({ boardId }: { boardId: number }) => {
    const {
        data: columnsData,
        isLoading: isColumnsLoading,
        isError: isColumnsError,
    } = useColumns({ boardId });
    const [columns, setColumns] = useState<Column[]>(columnsData?.data || []);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const {
        data: tasksData,
        isLoading: isTaskLoading,
        isError: isTaskError,
    } = useTasks();
    const [tasks, setTasks] = useState<Task[]>(tasksData?.data || []);
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

    const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    function onDragStart(e: DragStartEvent) {
        console.log("start", e);

        if (e.active.data.current?.type === "Column") {
            setActiveColumn(e.active.data.current.column);
            return;
        }

        if (e.active.data.current?.type === "Task") {
            setActiveTask(e.active.data.current.task);
            return;
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
            const activeColumnIndex = columns?.findIndex(
                (col) => col.id === activeId
            );
            const overColumnIndex = columns?.findIndex(
                (col) => col.id === overId
            );
            return arrayMove(columns, activeColumnIndex, overColumnIndex);
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
                    (task) => task.id === activeId
                );

                const overIndex = tasks.findIndex((task) => task.id === overId);

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverColumn = over.data.current?.type === "Column";

        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex(
                    (task) => task.id === activeId
                );
                tasks[activeIndex].columnId = Number(overId);

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
