import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";

interface CenterSkeletonProp {
  height: string;
}

const CenterSkeleton: React.FC<CenterSkeletonProp> = ({ height }) => {
  return (
    <Container
      sx={{
        height,
        padding: ".5rem 1rem",
      }}
    >
      <Skeleton
        sx={{
          transform: "scale(1,.8)",
        }}
        width={"100%"}
        height={"100%"}
      />
    </Container>
  );
};

export default CenterSkeleton;
