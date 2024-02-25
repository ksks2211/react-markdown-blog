import { useEffect } from "react";
import TopFullBar from "../../components/common/TopFullBar";
import { Link, useSearchParams } from "react-router-dom";
import { StyledLoginWrapper, StyledLoginCard } from "./LogInPage.styles";
import { LogInInputForm } from "./LogInHandleForm";
import { useErrorMessageSnackbarState } from "../../hooks/useSnackbarState";
import SnackbarAlert from "../../components/common/ErrorSnackbar";

export default function LogInPage() {
  const [params, setParams] = useSearchParams();
  const { displaySnackbar, snackbarState, closeSnackbar } =
    useErrorMessageSnackbarState();

  useEffect(() => {
    const errorFromPrev = params.get("error");
    if (errorFromPrev) {
      setParams();
      displaySnackbar(errorFromPrev);
    }
  }, [params, displaySnackbar, setParams]);

  return (
    <>
      <TopFullBar title="Log In">
        <Link to="/sign-up">Sign Up</Link>
      </TopFullBar>

      <StyledLoginWrapper>
        <StyledLoginCard>
          <LogInInputForm setErrorMessage={displaySnackbar} />
        </StyledLoginCard>
      </StyledLoginWrapper>

      <SnackbarAlert snackbarState={snackbarState} onClose={closeSnackbar} />
    </>
  );
}
