/*return(
    <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
          minHeight: "90vh",
        }}
      >
        <button className="btn btn-primary" onClick={QRGenerator} />
        <div>
          {qrBlob ? (
            // Renderiza la imagen PNG
            <img src={qrBlob} alt="Imagen obtenida de la API" />
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>
)*/