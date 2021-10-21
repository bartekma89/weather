import { Spinner } from "reactstrap";

const SpinnerCmp = () => {
  return (
    <div className="d-flex justify-content-center m-5">
      <Spinner style={{ width: "3rem", height: "3rem" }}>{""}</Spinner>
    </div>
  );
};

export default SpinnerCmp;
