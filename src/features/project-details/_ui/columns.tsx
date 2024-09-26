"use client";

import { Skeleton } from "@/shared/ui/skeleton";
import { useColumns } from "../_model/use-columns";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ColumnContainer } from "./column-container";
import { useDragColumn } from "../_model/use-drag-column";
import { createPortal } from "react-dom";

export const Columns = ({ boardId }: { boardId: number }) => {
    const { data, isLoading, isError } = useColumns({ boardId });
    const { columns, activeColumn, onDragStart, onDragEnd } = useDragColumn({
        data: data?.data || [],
    });

    if (isLoading) {
        return (
            <div className="grid gap-4">
                {Array.from({ length: 10 }).map((_, i) => {
                    return <Skeleton className="w-full h-14" key={i} />;
                })}
            </div>
        );
    }

    if (isError) {
        return <div>Произошла ошибка</div>;
    }

    if (!data) {
        return <div>Ошибка при получении данных</div>;
    }

    if (data.error) {
        return <div>{data.error.message}</div>;
    }

    if (!data.data) {
        return <div>Данные не получены</div>;
    }

    return (
        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className="overflow-x-auto">
                <div className="flex gap-4 min-w-full">
                    <SortableContext items={columns.map((col) => col.id)}>
                        {columns.map((column) => {
                            return (
                                <ColumnContainer
                                    column={column}
                                    key={column.id}
                                />
                            );
                        })}
                    </SortableContext>
                </div>
            </div>
            {createPortal(
                <DragOverlay>
                    {activeColumn && <ColumnContainer column={activeColumn} />}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
};
