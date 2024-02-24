import Header, { HeaderProps } from "../layouts/Header";
import useGlobal from "../../hooks/useGlobal";
import { capitalizeFirst } from "../../helpers/stringUtils";
import useBreakpoints from "../../hooks/useBreakPoints";
import { useHeaderTitle } from "../../hooks/useHeaderTitle";
import { isEmpty } from "lodash-es";
import { useNavigate } from "react-router-dom";
import Menu from "../../contexts/Menu.enum";

export type HeaderContainerProps = Omit<
  HeaderProps,
  "title" | "isLg" | "handleSearch"
>;

export default function HeaderContainer(props: HeaderContainerProps) {
  const { isLg } = useBreakpoints();
  const { selectedMenu } = useGlobal();
  const { title } = useHeaderTitle();
  const navigate = useNavigate();
  const headerTitle = !isEmpty(title) ? title : capitalizeFirst(selectedMenu);

  const handleSearch = () => {
    navigate("/tags");
  };

  return (
    <Header
      {...props}
      isLg={isLg}
      title={headerTitle}
      handleSearch={handleSearch}
      searchIconVisibility={selectedMenu !== Menu.TAGS}
    ></Header>
  );
}
