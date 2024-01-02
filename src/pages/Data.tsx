import withLayout from "../hoc/withLayout";
import { useChangeMenu } from "../hooks/useGlobal";
import Menu from "../contexts/Menu";

const Data: React.FC = () => {
  useChangeMenu(Menu.DATA);

  return <p>This is Data</p>;
};

const DataWithLayout = withLayout(Data);

export default DataWithLayout;
