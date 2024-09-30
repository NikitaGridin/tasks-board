import { Column, Task } from "@/entity/project/_domain/types";
import {
    DragEndEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { useGetAllDetails } from "./use-get-all-details";
import { useUpdateAllDetails } from "./use-update-all-details";

export const useDragContext = ({ boardId }: { boardId: number }) => {
    const {
        columns,
        setColumns,
        isColumnsLoading,
        isColumnsError,
        tasks,
        setTasks,
        isTaskLoading,
        isTaskError,
    } = useGetAllDetails({ boardId });

    const { setUpdatedColumns, setUpdatedTasks } = useUpdateAllDetails({
        boardId,
    });

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const tasksId = useMemo(
        () => tasks.map((task) => `task-${task.id}`),
        [tasks]
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
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

        const isActiveColumn = active.data.current?.type === "Column";

        if (isActiveColumn) {
            if (activeId === overId) return;

            setColumns((columns) => {
                const activeIndex = columns?.findIndex(
                    (col) => col.id === activeId
                );
                const overIndex = columns?.findIndex(
                    (col) => col.id === overId
                );
                const newColumns = arrayMove(columns, activeIndex, overIndex);

                setUpdatedColumns(
                    newColumns.map((col, index) => ({
                        id: col.id,
                        order: index + 1,
                    }))
                );

                return newColumns;
            });
        }
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

                const newTasks = arrayMove(tasks, activeIndex, overIndex);

                setUpdatedTasks(
                    newTasks.map((task, index) => ({
                        id: task.id,
                        order: index + 1,
                        columnId: task.columnId,
                    }))
                );

                return newTasks;
            });
        }

        const isOverColumn = over.data.current?.type === "Column";

        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex(
                    (task) => `task-${task.id}` === activeId
                );

                tasks[activeIndex].columnId = overId as number;

                const newTasks = arrayMove(tasks, activeIndex, activeIndex);

                setUpdatedTasks(
                    newTasks.map((task, index) => ({
                        id: task.id,
                        order: index + 1,
                        columnId: task.columnId,
                    }))
                );

                return newTasks;
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
