import { useState } from "react";

export const useDragTask =() =>{

    const [tasks, setTasks] = useState<string[]>()
    
        function handleOnDrag(e: React.DragEvent, name: string) {
            e.dataTransfer.setData("name", name);
        }

        function handleOnDragOver(e: React.DragEvent) {
            e.preventDefault();
        }
    
        function handleOnDrop(e: React.DragEvent) {
            if(tasks) {
                setTasks([
                    ...tasks.filter(
                        (taskName) => taskName !== e.dataTransfer.getData("name")
                    ),
                    e.dataTransfer.getData("name"),
                ]);
            } else {
                setTasks([e.dataTransfer.getData("name")])
            }
        }

        return {handleOnDrag,handleOnDragOver,handleOnDrop}
}
