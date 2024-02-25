import { ComponentPropsWithoutRef, useCallback } from "react";
import { useChangeMenu } from "../hooks/useGlobal";
import Menu from "../contexts/Menu.enum";
import withLayout from "../hoc/withLayout";
import { Grid, Paper, Theme, styled } from "@mui/material";
import { MdHomeFilled } from "react-icons/md";
import { FaFile } from "react-icons/fa6";
import { FaFolder, FaTag } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { lighten, rgba } from "polished";
import { capitalizeFirst } from "../helpers/stringUtils";

interface HomeProps extends ComponentPropsWithoutRef<"div"> {}

const StyledWrapper = styled("div")`
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.theme.breakpoints.up("md")} {
    min-height: calc(70vh);
  }
`;

interface PageItemProps {
  name: string;
  Icon: IconType;
  description: string;
}

const pages: PageItemProps[] = [
  {
    name: "home",
    Icon: MdHomeFilled,
    description: "Home page",
  },
  {
    name: "posts",
    Icon: FaFile,
    description: "Create & Read Posts",
  },
  {
    name: "categories",
    Icon: FaFolder,
    description: "Create & Explore Categories",
  },
  {
    name: "tags",
    Icon: FaTag,
    description: "Search Posts with Tags",
  },
];

const StyledPageDescription = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  gap: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  .title {
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #f7f5fa;
    transition: 0.5s;
  }
  .icon {
    fill: #f7f5fa;
    flex-grow: 0;
    flex-shrink: 0;
    width: 3.2rem;
    height: 3.2rem;
    transition: 0.5s;
  }

  .description {
    text-align: center;
    font-size: 0.8rem;
    font-weight: 500;
    color: ${(props) => props.theme.palette.grey[200]};
    transition: 0.5s;
  }

  &:hover {
    .title {
      color: ${(props) => props.theme.palette.success.main};
    }

    .icon {
      fill: ${(props) => props.theme.palette.success.main};
    }

    .description {
      color: ${(props) => props.theme.palette.success.dark};
    }
  }
`;

const Home: React.FC<HomeProps> = () => {
  useChangeMenu(Menu.HOME);
  const navigate = useNavigate();

  const handleRedirect = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const value = e.currentTarget.dataset.pageValue || "home";
      navigate(`/${value}`);
    },
    [navigate]
  );

  const gridSx = useCallback(
    (theme: Theme) => ({
      [theme.breakpoints.up("xs")]: {
        margin: ".5rem .5rem",
      },

      [theme.breakpoints.up("md")]: {
        margin: "4rem",
      },

      [theme.breakpoints.up("lg")]: {
        margin: "0",
        padding: "0 1rem",
      },
    }),
    []
  );

  const paperSx = useCallback(
    (theme: Theme) => ({
      height: "10rem",
      minHeight: "8rem",
      display: "flex",
      width: "100%",
      minWidth: "10rem",
      alignItems: "center",
      justifyContent: "start",
      boxSizing: "border-box",
      backgroundColor: lighten(0.1, theme.palette.success.light),
      transition: ".5s",

      "&:hover": {
        backgroundColor: rgba(theme.palette.success.light, 0.1),
      },

      [theme.breakpoints.up("sm")]: { width: "70%" },

      [theme.breakpoints.up("md")]: {
        height: "12rem",
        minHeight: "8rem",
        width: "100%",
        minWidth: "15rem",
      },

      [theme.breakpoints.up("lg")]: {
        minWidth: "9rem",
        height: "14rem",
        minHeight: "12rem",
      },
    }),
    []
  );

  return (
    <StyledWrapper>
      <Grid container spacing={0} pb={1} flexGrow={0} sx={gridSx}>
        {pages.map(({ name, Icon, description }) => (
          <Grid
            item
            container
            flexShrink={0}
            flexGrow={0}
            xs={12}
            md={6}
            lg={3}
            key={name}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            padding=".5rem"
          >
            <Paper
              data-page-value={name}
              onClick={handleRedirect}
              sx={paperSx}
              variant="outlined"
            >
              <StyledPageDescription>
                <div className="title">{capitalizeFirst(name)}</div>
                <Icon className="icon" />
                <div className="description">{description}</div>
              </StyledPageDescription>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </StyledWrapper>
  );
};

const HomeWithLayout = withLayout(Home);

export default HomeWithLayout;
