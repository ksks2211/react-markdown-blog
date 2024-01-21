import { useChangeMenu } from "../hooks/useGlobal";
import Menu from "../contexts/Menu.enum";
import withLayout from "../hoc/withLayout";

const Data: React.FC = () => {
  useChangeMenu(Menu.DATA);

  return <p>This is Data</p>;
};

const DataWithLayout = withLayout(Data);

export default DataWithLayout;
