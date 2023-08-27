import { ComponentPropsWithoutRef } from "react";
import Layout from "../components/Layout";

interface HomeProps extends ComponentPropsWithoutRef<"div"> {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Layout>
      <p>This is home</p>
    </Layout>
  );
};

export default Home;
