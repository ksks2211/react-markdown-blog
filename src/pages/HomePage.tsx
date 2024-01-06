import { ComponentPropsWithoutRef } from "react";
import { useChangeMenu } from "../hooks/useGlobal";
import withLayout from "../hoc/withLayout";
import { Link } from "react-router-dom";
import Menu from "../contexts/Menu.enum";

interface HomeProps extends ComponentPropsWithoutRef<"div"> {}

const Home: React.FC<HomeProps> = () => {
  useChangeMenu(Menu.HOME);
  return (
    <p>
      This is home -- Selected Menu
      <Link to="/login">Log In</Link>
      {/* <TextInputModal
        prompt={"what is it?"}
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        label={"Hello World"}
      /> */}
    </p>
  );
};

const HomeWithLayout = withLayout(Home);

export default HomeWithLayout;
