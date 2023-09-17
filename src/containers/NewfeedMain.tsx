import React from "react";
import { IMainContainer } from "../utils/global_type";



const NewfeedMain = ({ children }: IMainContainer) => {
  return (
    <main className="h-full  overflow-y-auto">
      {children}
    </main >
  );
};

export default NewfeedMain;
