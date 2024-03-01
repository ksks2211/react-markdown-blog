import ButtonGroup from "@mui/material/ButtonGroup";
import { StyledFixedButtonGroup } from "./PostCreatePage.styles";
import Button from "@mui/material/Button";
import { MdArrowBack } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import { rgba } from "polished";

interface FixedButtonGroupProps {
  isLg: boolean;
  isLoading: boolean;
  onPrevPageBtnClick: () => void;
  onSubmitBtnClick: () => void;
}

const ButtonSx = { backgroundColor: rgba("#fff", 0.8) };

export default function PostCreateSubmitButtonGroup({
  isLg,
  isLoading,
  onPrevPageBtnClick,
  onSubmitBtnClick,
}: FixedButtonGroupProps) {
  return (
    <StyledFixedButtonGroup>
      <ButtonGroup variant="outlined" size={isLg ? "large" : "small"}>
        <Button
          type="button"
          color="primary"
          sx={ButtonSx}
          startIcon={<MdArrowBack />}
          onClick={onPrevPageBtnClick}
        >
          Prev
        </Button>

        {!isLoading ? (
          <Button
            type="button"
            color="primary"
            sx={ButtonSx}
            onClick={onSubmitBtnClick}
          >
            Submit
          </Button>
        ) : (
          <Button type="button" sx={ButtonSx}>
            <CircularProgress
              size={isLg ? 22 : 18}
              thickness={isLg ? 4.2 : 3.8}
              color="primary"
            />
          </Button>
        )}
      </ButtonGroup>
    </StyledFixedButtonGroup>
  );
}
