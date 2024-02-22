import { Link } from "react-router-dom";
import TopFullBar from "../../components/common/TopFullBar";
import {
  StyledLoginCard,
  StyledLoginWrapper,
} from "../LogInPage/LogInPage.styles";
import { SignUpForm } from "./SignUpForm";
import { useErrorMessageSnackbarState } from "../../hooks/useSnackbarState";
import SnackbarAlert from "../../components/common/ErrorSnackbar";

export default function SignUpPage() {
  const { snackbarState, closeSnackbar, setErrorMessage } =
    useErrorMessageSnackbarState();

  return (
    <>
      <TopFullBar title="Sign Up">
        <Link to="/login">Log In</Link>
      </TopFullBar>

      <StyledLoginWrapper>
        <StyledLoginCard>
          <SignUpForm setErrorMessage={setErrorMessage} />
        </StyledLoginCard>
      </StyledLoginWrapper>

      <SnackbarAlert snackbarState={snackbarState} onClose={closeSnackbar} />
    </>
  );
}
