import { ReactNode, Suspense } from "react";
import Loader from "./Loader";

interface Props {
  children: ReactNode;
}

const SuspenseLoader: React.FC<Props> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default SuspenseLoader;
