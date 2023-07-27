import { createContext,useState } from "react";

export const AppContext = createContext({});

const AppContextProvider = ({children}) => {
    const [user,set_user] = useState({});
    const [data,set_data] = useState({
        users_list:[],
        tasks_list:[]
    })
    const value = {
        user,set_user,
        data,set_data
    };
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;