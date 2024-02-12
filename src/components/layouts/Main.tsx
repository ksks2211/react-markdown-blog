import React, { HTMLAttributes } from "react";

export type MainContainerProps = Pick<MainProps, "className"> &
  JSX.IntrinsicAttributes;

export interface MainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  MainComponent: React.ComponentType;
}

const Main: React.FC<MainProps> = ({ MainComponent, ...rest }) => {
  return <MainComponent {...rest} />;
};

export default Main;
