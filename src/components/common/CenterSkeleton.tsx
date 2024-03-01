import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import { useMemo } from "react";

interface CenterSkeletonProp {
  height: string;
}

const SkeletonSx = {
  transform: "scale(1,.8)",
};

const CenterSkeleton: React.FC<CenterSkeletonProp> = ({ height }) => {
  const ContainerSx = useMemo(
    () => ({
      height,
      padding: ".5rem 1rem",
    }),
    [height]
  );

  return (
    <Container sx={ContainerSx}>
      <Skeleton sx={SkeletonSx} width={"100%"} height={"100%"} />
    </Container>
  );
};

export default CenterSkeleton;
