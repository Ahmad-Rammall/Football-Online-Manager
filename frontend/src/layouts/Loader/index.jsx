import "./index.css";
import { CircularProgress } from "@mui/material";

const Loader = ({ height }) => (
  <div
    className="spinner"
    style={{
      height: height ? height : "100vh",
    }}
  >
    <div>
      <CircularProgress size={60} color="primary" />
    </div>
  </div>
);
export default Loader;
