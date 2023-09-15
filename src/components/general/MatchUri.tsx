import { ReactNode } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

interface ComponentProps {
  uri: string;
  children: ReactNode | JSX.Element;
}
export const MatchUri: React.FC<ComponentProps> = ({ uri, children }) => {
  const match = useMatch(uri);
  return (
    <> {match && children}</>
  );
}
