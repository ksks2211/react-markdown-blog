import { ComponentPropsWithoutRef } from "react";
import { useChangeMenu } from "../hooks/useGlobal";
import Menu from "../contexts/Menu.enum";
import withLayout from "../hoc/withLayout";

interface HomeProps extends ComponentPropsWithoutRef<"div"> {}

const Home: React.FC<HomeProps> = () => {
  useChangeMenu(Menu.HOME);

  return <div>This is home</div>;
};

const HomeWithLayout = withLayout(Home);

export default HomeWithLayout;
