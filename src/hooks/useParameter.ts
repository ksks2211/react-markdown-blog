import { useLocation, useParams } from "react-router-dom";

export function useSearchParams(): URLSearchParams {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export function usePathParamId(): string {
  const { id } = useParams();
  if (id === undefined) {
    throw new Error(`Id Path Parameter not found`);
  }
  return id;
}
