import Footer, { FooterProps } from "../layouts/Footer";

export const FooterContainer: React.FC<FooterProps> = (props) => {
  const currentYear = new Date().getFullYear();
  const footerText = `© ${currentYear} MyBlog. All rights reserved.`;
  return <Footer {...props}>{footerText}</Footer>;
};
