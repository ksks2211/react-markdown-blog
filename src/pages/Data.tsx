import { useEffect } from "react";
import withLayout from "../hoc/withLayout";
import useGlobal from "../hooks/useGlobal";
import { Menu } from "../contexts/menuEnum";

const Data: React.FC = () => {
  const { changeMenu } = useGlobal();
  useEffect(() => {
    changeMenu(Menu.DATA);
  }, [changeMenu]);

  return <p>This is Data</p>;
};

const DataWithLayout = withLayout(Data);

export default DataWithLayout;
