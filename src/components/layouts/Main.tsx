import { styled } from "@mui/material";
import React, { HTMLAttributes } from "react";

export type MainContainerProps = Pick<MainProps, "className"> &
  JSX.IntrinsicAttributes;

export interface MainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  MainComponent: React.ComponentType;
}

const StyledMain = styled("main")`
  margin: 1rem 2rem;
  color: #0b0101;
`;

const Main: React.FC<MainProps> = ({ MainComponent, ...rest }) => {
  return (
    <StyledMain {...rest}>
      <MainComponent />
    </StyledMain>
  );
};

export default Main;
