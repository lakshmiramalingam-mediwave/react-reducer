import { useRef } from "react";
import EditForm from "./editForm";
const TodoList = ({
  todos,
  handleDelete,
  handleEdit,
  handleDone,
  handleUpdate,
  dragUpdate
}) => {
  //   it doesnt  re render 
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  function handleCheck(e, id) {
   
    let type = "done";
    if (!e.target.checked) {
      type = "undone";
    }
    handleDone(id, type);
  }
  const handleSort = () => {
    let newTodos = [...todos];

    const dragItemContent = newTodos.splice(dragItem.current, 1)[0];

    newTodos.splice(dragOverItem.current, 0, dragItemContent);
    dragUpdate(newTodos);
  };
  return (
    <div>
      <h1>My todos</h1>
      <div>
        {todos.map((t,index) => (
          <div
            key={t.id}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
          >
            {t.isEdit ? (
              <>
                <EditForm
                  item={t}
                  handleUpdate={(text, id) => handleUpdate(text, id)}
                />
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={t.isDone}
                  onChange={(e) => handleCheck(e, t.id)}
                />
                <span
                 style={t.isDone ? { textDecoration: "line-through" } : {}}
                 >
                  {t.text}
                  </span>

                <button onClick={() => handleDelete(t.id)}>Delete</button>
                <button onClick={() => handleEdit(t.id)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default TodoList;