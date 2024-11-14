import HashLoader from "react-spinners/HashLoader";

function Loader() {
  return (
    <div
      // className="d-flex justify-content-center align-items-center"
      className="position-absolute top-50 start-50 translate-middle z-1"
    >
      <div className="sweet-loading">
        <HashLoader
          color="#000"
          loading={true}
          cssOverride=""
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
