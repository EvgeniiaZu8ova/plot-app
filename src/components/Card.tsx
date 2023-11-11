import { ReactElement } from "react";

interface IProps {
  children: ReactElement;
}

export const Card = ({ children }: IProps) => {
  return <div className="card">{children}</div>;
};
