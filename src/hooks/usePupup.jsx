import { useContext } from "react";
import { PupUpContext } from "../contexts/PupUpContextProvider";

const usePupup = () => useContext(PupUpContext);

export default usePupup;