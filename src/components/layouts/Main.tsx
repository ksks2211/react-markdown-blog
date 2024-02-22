import { styled } from "@mui/material";
import React, { HTMLAttributes } from "react";

export type MainContainerProps = Pick<MainProps, "className"> &
  JSX.IntrinsicAttributes;

export interface MainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  MainComponent: React.ComponentType;
}

const StyledMinHeightWrapper = styled("div")`
  min-height: 70vh;
`;

const Main: React.FC<MainProps> = ({ MainComponent, ...rest }) => {
  return (
    <StyledMinHeightWrapper>
      <MainComponent {...rest} />
    </StyledMinHeightWrapper>
  );
};

export default Main;
