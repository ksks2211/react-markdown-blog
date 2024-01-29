import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopFullBar from "../../components/common/TopFullBar";
import {
  StyledLoginCard,
  StyledLoginWrapper,
} from "../LogInPage/LogInPage.styles";
import { SignUpForm } from "./SignUpForm";

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      setErrorMessage(null);
    }
  }, [errorMessage]);

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
    </>
  );
}
