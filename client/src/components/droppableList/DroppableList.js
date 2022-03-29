import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "./droppableList.css";
export default function DroppableList({ id, index, data }) {
  return (
    <Draggable key={id} index={index} draggableId={id}>
      {(provided) => {
        // console.log(provided);
        return (
          <div className="droppableList"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {data}
          </div>
        );
      }}
    </Draggable>
  );
}
