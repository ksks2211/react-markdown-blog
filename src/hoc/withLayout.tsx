import { ComponentType, FunctionComponent } from "react";
import Layout from "../components/layout/Layout";

/**
 * This is a higher-order component (HOC) that wraps a given component with the Layout.
 *
 * @param WrappedComponent - The component to wrap.
 * @returns The wrapped component.
 */
function withLayout<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
): FunctionComponent<T> {
  return function WrappedWithLayout(props: T) {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };
}

export default withLayout;
