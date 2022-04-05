import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DroppableList from "../droppableList/DroppableList";
import './dragdrop.css';

export default function DragDrop({listItem, nameList, setListItem}) {

  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;
    const newData = Array.from(listItem);
    // console.log(newData);
    const [reorderedItem] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, reorderedItem);

    setListItem(newData);
    //set listitem
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={nameList} type="caterogy">
          {(provided) => {
            // console.log(provided);
            return (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listItem.map((e, index) => {
                  // console.log(e);
                  return (
                    <DroppableList 
                        key={e._id}
                        id={e._id}
                        {...e}
                        index={index}
                        data={e.name}
                    />
                  );
                })}
                {provided.placeholder}
              </ul>
            );
          }}

        </Droppable>
      </DragDropContext>
    </div>
  );
}
