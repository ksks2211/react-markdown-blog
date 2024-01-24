import { useChangeMenu } from "../hooks/useGlobal";
import Menu from "../contexts/Menu.enum";
import withLayout from "../hoc/withLayout";

const Data: React.FC = () => {
  useChangeMenu(Menu.TAGS);

  return <p>This is TAG</p>;
};

const DataWithLayout = withLayout(Data);

export default DataWithLayout;
