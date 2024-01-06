import { useParams } from "react-router-dom";

export function usePathParamId(): string {
  const { id } = useParams();
  if (id === undefined) {
    throw new Error(`Id Path Parameter not found`);
  }
  return id;
}
