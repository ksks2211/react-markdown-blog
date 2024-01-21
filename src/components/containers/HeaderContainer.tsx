import Header, { HeaderProps } from "../layouts/Header";
import useGlobal from "../../hooks/useGlobal";
import { capitalizeFirst } from "../../helpers/stringUtils";
import useBreakpoints from "../../hooks/useBreakPoints";

export type HeaderContainerProps = Omit<HeaderProps, "title" | "isLg">;

export default function HeaderContainer(props: HeaderContainerProps) {
  const { isLg } = useBreakpoints();
  const { selectedMenu } = useGlobal();
  const title = capitalizeFirst(selectedMenu);
  return <Header isLg={isLg} title={title} {...props}></Header>;
}
