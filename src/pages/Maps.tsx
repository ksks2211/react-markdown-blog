import { useEffect } from "react";
import withLayout from "../hoc/withLayout";
import useGlobal from "../hooks/useGlobal";

const Maps: React.FC = () => {
  const { changeMenu } = useGlobal();
  useEffect(() => {
    changeMenu("MAPS");
  }, [changeMenu]);

  return <p>This is Maps</p>;
};

const MapsWithLayout = withLayout(Maps);

export default MapsWithLayout;
