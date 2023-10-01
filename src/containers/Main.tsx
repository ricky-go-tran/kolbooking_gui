import React from "react";
import { IMainContainer } from "../global_variable/global_type";

const Main = ({ children }: IMainContainer) => {
  return (
    <main className="h-full overflow-y-auto">
      <div className="container grid px-6 mx-auto">{children}</div>
    </main>
  );
};

export default Main;
