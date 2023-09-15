import { useLocation } from "react-router-dom";

export default function useSearchParams() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
