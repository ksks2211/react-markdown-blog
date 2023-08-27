import withLayout from "../hoc/withLayout";

const Data: React.FC = () => {
  return <p>This is Data</p>;
};

const DataWithLayout = withLayout(Data);

export default DataWithLayout;
