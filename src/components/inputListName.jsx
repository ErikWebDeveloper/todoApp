export default function InputListName({listName, handleTitleChange}) {
  return (
    <div className="text-center mt-5 m-auto">
      <input
        type="text"
        className="border-0 fs-3 text-center rounded-4"
        style={{ backgroundColor: "unset" }}
        placeholder="🎯 Write your list name..."
        value={listName}
        onChange={handleTitleChange}
      />
    </div>
  );
}
