export default function ItemsList({
  todoList,
  handleChecked,
  handleMoveItem,
  handleDeleteItem,
}) {
  return (
    <div
      className="container border mt-3 rounded"
      style={{ height: "50vh", overflow: "scroll" }}
    >
      {todoList &&
        todoList.map((item, index) => {
          return (
            <div key={`item-${index}`} className="row p-3 border">
              <div className="col col-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item.checked}
                  id={`checkItem-${index}`}
                  onChange={() => handleChecked(event, index)}
                />
              </div>
              <label className="col col-8" htmlFor={`checkItem-${index}`}>
                {item.text}
              </label>
              <div className="col col-3 d-flex">
                <span
                  className="flex-fill text-center pointer"
                  onClick={() => handleMoveItem(index, "arriba")}
                >
                  ⬆️
                </span>
                <span
                  className="flex-fill text-center pointer"
                  onClick={() => handleMoveItem(index, "abajo")}
                >
                  ⬇️
                </span>
                <span
                  className="flex-fill text-center pointer"
                  onClick={() => handleDeleteItem(index)}
                >
                  🗑️
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
