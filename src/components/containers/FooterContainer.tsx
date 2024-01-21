import Footer, { FooterProps } from "../layouts/Footer";

export const FooterContainer: React.FC<FooterProps> = (props) => {
  const footerText = "© 2023 MyBlog. All rights reserved.";
  return <Footer {...props}>{footerText}</Footer>;
};
