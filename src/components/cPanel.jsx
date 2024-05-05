export default function CPanel({handleImport, descargarLocalStorage, handleClearAll}) {
  return (
    <>
      <div
        className="conatiner m-auto w-75 mt-5 text p-3 rounded"
        style={{ border: "1px solid green", color: "green" }}
      >
        <label htmlFor="downloadFileBtn" className="form-label">
          ☝️ Upload
        </label>

        <input
          id="downloadFileBtn"
          className="form-control"
          type="file"
          accept=".json"
          onChange={handleImport}
        />
      </div>
      <div className="conatiner m-auto w-75 mt-3 text-center d-flex gap-3 mb-3">
        <button
          className="btn btn-outline-primary w-50 m-auto"
          onClick={descargarLocalStorage}
        >
          ☁️ Download
        </button>

        <button
          className="btn btn-outline-danger w-50 m-auto"
          onClick={handleClearAll}
        >
          🧹 Clear All
        </button>
      </div>
    </>
  );
}
