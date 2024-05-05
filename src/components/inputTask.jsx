export default function InputTask({handleSubmit, handleChangeInput, input}) {
  return (
    <form className="container m-auto mt-5" onSubmit={handleSubmit} action="#">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Write some task..."
          aria-label="Write some task..."
          aria-describedby="button-addon2"
          onChange={handleChangeInput}
          value={input}
        />
        <button type="submit" className="btn btn-primary" id="button-addon2">
          👇
        </button>
      </div>
    </form>
  );
}
