import Header, { HeaderProps } from "../layouts/Header";
import useGlobal from "../../hooks/useGlobal";
import { capitalizeFirst } from "../../helpers/stringUtils";
import useBreakpoints from "../../hooks/useBreakPoints";
import { useHeaderTitle } from "../../hooks/useHeaderTitle";
import { isEmpty } from "lodash-es";

export type HeaderContainerProps = Omit<HeaderProps, "title" | "isLg">;

export default function HeaderContainer(props: HeaderContainerProps) {
  const { isLg } = useBreakpoints();
  const { selectedMenu } = useGlobal();
  const { title } = useHeaderTitle();
  const headerTitle = !isEmpty(title) ? title : capitalizeFirst(selectedMenu);

  return <Header isLg={isLg} title={headerTitle} {...props}></Header>;
}
