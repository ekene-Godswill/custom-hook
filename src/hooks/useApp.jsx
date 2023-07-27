import { useContext } from "react";
import { AppContext } from "../contexts/AppContextProvider";
const useApp = () =>{
    return useContext(AppContext);
}

export default useApp;