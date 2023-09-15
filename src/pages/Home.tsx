import { ComponentPropsWithoutRef, useEffect } from "react";
import useGlobal from "../hooks/useGlobal";
import withLayout from "../hoc/withLayout";
import { Link } from "react-router-dom";

interface HomeProps extends ComponentPropsWithoutRef<"div"> {}

const Home: React.FC<HomeProps> = () => {
  const { changeMenu } = useGlobal();

  useEffect(() => {
    changeMenu("HOME");
  }, [changeMenu]);

  return (
    <p>
      This is home -- Selected Menu
      <Link to="/login">Log In</Link>
    </p>
  );
};

const HomeWithLayout = withLayout(Home);

export default HomeWithLayout;
