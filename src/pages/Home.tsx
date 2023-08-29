import { ComponentPropsWithoutRef, useEffect } from "react";
import useGlobal from "../hooks/useGlobal";
import withLayout from "../hoc/withLayout";

interface HomeProps extends ComponentPropsWithoutRef<"div"> {}

const Home: React.FC<HomeProps> = () => {
  const { changeMenu } = useGlobal();

  useEffect(() => {
    changeMenu("HOME");
  }, [changeMenu]);

  const { selectedMenu } = useGlobal();

  return <p>This is home -- Selected Menu : {selectedMenu}</p>;
};

const HomeWithLayout = withLayout(Home);

export default HomeWithLayout;
