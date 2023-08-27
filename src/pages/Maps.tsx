import withLayout from "../hoc/withLayout";

const Maps: React.FC = () => {
  return <p>This is Maps</p>;
};

const MapsWithLayout = withLayout(Maps);

export default MapsWithLayout;
