import { ReactElement } from "react";
import { Container } from "reactstrap";

interface ComponentProps {
  children: ReactElement;
  fluid?: boolean;
}

const Layout = ({ children, fluid }: ComponentProps) => {
  return <Container fluid={fluid}>{children}</Container>;
};

export default Layout;
