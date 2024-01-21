import { ComponentPropsWithoutRef } from "react";
import { useChangeMenu } from "../hooks/useGlobal";
import { Link } from "react-router-dom";
import Menu from "../contexts/Menu.enum";
import { useLoginWithRefreshToken } from "../hooks/useToken";
import withLayout from "../hoc/withLayout";

interface HomeProps extends ComponentPropsWithoutRef<"div"> {}

const Home: React.FC<HomeProps> = () => {
  useChangeMenu(Menu.HOME);

  const tokenMutation = useLoginWithRefreshToken();

  const handleRefresh = async () => {
    await tokenMutation.mutateAsync();
  };

  return (
    <div>
      This is home -- Selected Menu
      <Link to="/login">Log In</Link>
      {/* <TextInputModal
        prompt={"what is it?"}
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        label={"Hello World"}
      /> */}
      <div onClick={handleRefresh}>Refresh</div>
    </div>
  );
};

const HomeWithLayout = withLayout(Home);

export default HomeWithLayout;
