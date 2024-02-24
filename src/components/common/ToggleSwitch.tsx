import { styled } from "@mui/material";

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  className: string;
}

const StyledSwitchWrapper = styled("div")`
  display: inline-block;
`;

const StyledToggleSwitch = styled("div")<{ isOn: boolean }>`
  width: 50px;
  height: 25px;
  background-color: ${(props) =>
    props.isOn
      ? props.theme.palette.primary.main
      : props.theme.palette.grey[500]};
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 21px;
    height: 21px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.25s;
    transform: ${(props) => (props.isOn ? "translateX(25px)" : "none")};
  }
`;

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  handleToggle,
  className,
}) => {
  return (
    <StyledSwitchWrapper onClick={handleToggle} className={className}>
      <StyledToggleSwitch isOn={isOn} />
    </StyledSwitchWrapper>
  );
};

export default ToggleSwitch;
