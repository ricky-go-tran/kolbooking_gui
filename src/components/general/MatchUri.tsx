import { ReactNode } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { IComponent } from "../../global_variable/global_type";

export const MatchUri: React.FC<IComponent> = ({ uri, children }) => {
  const match = useMatch(uri);
  return <> {match && children}</>;
};
