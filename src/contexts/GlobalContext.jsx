import { useState } from "react";
import { createContext } from "react";

const DEFAULT_STATE = {
  username: "",
};

const GlobalContext = createContext(DEFAULT_STATE);

const GlobalProvider = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);

  return (
    <GlobalContext.Provider value={[state, setState]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
