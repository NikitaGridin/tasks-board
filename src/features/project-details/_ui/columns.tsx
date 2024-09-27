"use client";

import { Skeleton } from "@/shared/ui/skeleton";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ColumnContainer } from "./column-container";
import { useDragColumns } from "../_model/use-drag-column";
import { createPortal } from "react-dom";
import { TaskCard } from "./taskCard";

export const Columns = ({ boardId }: { boardId: number }) => {
    const {
        tasks,
        tasksId,
        columns,
        columnsId,
        isColumnsLoading,
        isColumnsError,
        activeColumn,
        activeTask,
        sensors,
        onDragStart,
        onDragEnd,
        onDragOver,
    } = useDragColumns({
        boardId,
    });

    if (isColumnsLoading) {
        return (
            <div className="grid gap-4">
                {Array.from({ length: 10 }).map((_, i) => {
                    return <Skeleton className="w-full h-14" key={i} />;
                })}
            </div>
        );
    }

    if (isColumnsError) {
        return <div>Произошла ошибка</div>;
    }

    if (!columns) {
        return <div>Ошибка при получении данных</div>;
    }

    // if (error) {
    //     return <div>{error.message}</div>;
    // }

    if (!columns) {
        return <div>Данные не получены</div>;
    }

    return (
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
        >
            <div className="overflow-x-auto">
                <div className="flex gap-4 min-w-full">
                    <SortableContext items={columnsId}>
                        {columns.map((column) => {
                            return (
                                <ColumnContainer
                                    column={column}
                                    key={column.id}
                                    tasks={tasks.filter(
                                        (task) => task.columnId === column.id
                                    )}
                                    tasksId={tasksId}
                                />
                            );
                        })}
                    </SortableContext>
                </div>
            </div>
            {createPortal(
                <DragOverlay>
                    {activeColumn && (
                        <ColumnContainer
                            column={activeColumn}
                            tasks={tasks.filter(
                                (task) => task.columnId === activeColumn.id
                            )}
                            tasksId={tasksId}
                        />
                    )}
                    {activeTask && <TaskCard task={activeTask} />}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
};
