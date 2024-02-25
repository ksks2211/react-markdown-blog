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
          sx={{ backgroundColor: rgba("#fff", 0.8) }}
          startIcon={<MdArrowBack />}
          onClick={onPrevPageBtnClick}
        >
          Prev
        </Button>

        {!isLoading ? (
          <Button
            type="button"
            color="primary"
            sx={{ backgroundColor: rgba("#fff", 0.8) }}
            onClick={onSubmitBtnClick}
          >
            Submit
          </Button>
        ) : (
          <Button type="button" sx={{ backgroundColor: rgba("#fff", 0.8) }}>
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
