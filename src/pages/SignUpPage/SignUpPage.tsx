import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopFullBar from "../../components/common/TopFullBar";
import {
  StyledLoginCard,
  StyledLoginWrapper,
} from "../LogInPage/LogInPage.styles";
import { SignUpForm } from "./SignUpForm";
import { useSnackbarState } from "../../hooks/useSnackbarState";
import SnackbarAlert from "../../components/common/ErrorSnackbar";

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { displaySnackbar, snackbarState, closeSnackbar } = useSnackbarState();

  useEffect(() => {
    if (errorMessage) {
      displaySnackbar(errorMessage);
      setErrorMessage(null);
    }
  }, [errorMessage, displaySnackbar]);

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

      <SnackbarAlert
        snackbarState={snackbarState}
        onClose={() => closeSnackbar()}
      />
    </>
  );
}
