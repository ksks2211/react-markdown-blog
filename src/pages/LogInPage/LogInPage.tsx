import { useEffect, useState } from "react";
import TopFullBar from "../../components/common/TopFullBar";
import { Link, useSearchParams } from "react-router-dom";
import { StyledLoginWrapper, StyledLoginCard } from "./LogInPage.styles";
import { LogInInputForm } from "./LogInHandleForm";

export default function LogInPage() {
  const [params, setParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorFromPrev = params.get("error");
    if (errorFromPrev) {
      setParams();
      setErrorMessage(errorFromPrev);
    }
  }, [params, setParams]);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      setErrorMessage(null);
    }
  }, [errorMessage]);

  return (
    <>
      <TopFullBar title="Log In">
        <Link to="/sign-up">Sign Up</Link>
      </TopFullBar>

      <StyledLoginWrapper>
        <StyledLoginCard>
          <LogInInputForm setErrorMessage={setErrorMessage} />
        </StyledLoginCard>
      </StyledLoginWrapper>
    </>
  );
}
