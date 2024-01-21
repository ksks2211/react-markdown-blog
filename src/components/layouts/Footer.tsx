import { ComponentPropsWithoutRef } from "react";
import { styled } from "@mui/material";

export interface FooterProps extends ComponentPropsWithoutRef<"footer"> {
  className?: string;
}

const StyledFooter = styled("footer")`
  --footer-text-color: #837c7c;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
  background-color: var(--footer-color);

  & {
    p {
      color: var(--footer-text-color);
      white-space: no-wrap;
    }
  }
`;

const Footer: React.FC<FooterProps> = ({ children, ...rest }) => {
  return (
    <StyledFooter {...rest}>
      <p>{children}</p>
    </StyledFooter>
  );
};

export default Footer;
