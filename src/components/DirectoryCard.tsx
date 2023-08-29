import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  useEffect,
  useState,
} from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

import styles from "./DirectoryCard.module.scss";
import cn from "classnames/bind";
import { capitalizeFirst } from "../common/stringUtils";
import { Link } from "react-router-dom";
const cx = cn.bind(styles);

interface Directory {
  directories: { [key: string]: Directory };
  files: number;
}

interface RootDirectory {
  [key: string]: Directory;
}

interface DirectoryRowProps extends ComponentPropsWithRef<"div"> {
  dirname: string;
  parentDirname: string;
  depth: number;
  fileCount: number;
  dirCount: number;
  closed: boolean;
}

const DirectoryRow: React.FC<DirectoryRowProps> = ({
  dirname,
  fileCount,
  children,
  depth,
  dirCount,
  parentDirname,
  closed,
  onClick,
  ...props
}) => {
  const fullDirname = `${parentDirname}/${dirname}`;
  const root = depth === 1;

  return (
    <div {...props} className={cx("row")}>
      <div
        onClick={dirCount !== 0 ? onClick : undefined}
        className={cx("row-wrapper", { closed, root })}
      >
        <div
          style={{
            display: "inline-block",
            width: `${depth}rem`,
            height: "100%",
          }}
        />
        {<FaRegFolderOpen className={cx("icon", "open")} />}
        {<FaRegFolder className={cx("icon", "closed")} />}

        <Link className={cx("dirname")} to={fullDirname}>
          {capitalizeFirst(dirname)}
        </Link>

        <span
          className={cx("details")}
        >{`${fileCount} files, ${dirCount} folders`}</span>

        {dirCount !== 0 && (
          <div className={cx("dropdown")}>
            <RiArrowDropDownLine className={cx("dropdown-icon")} />
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

interface NestedDirProps extends ComponentPropsWithoutRef<"div"> {
  dirname: string;
  directory: Directory;
  depth: number;
  parentDirname?: string;
  closed?: boolean;
}

const NestedDir: React.FC<NestedDirProps> = ({
  parentDirname = "",
  dirname,
  directory,
  depth,
  closed = true,
}) => {
  const directories = directory.directories;

  const dirCount = Object.keys(directories).length;
  const fileCount = directory.files;

  const fullDirname = `${parentDirname}/${dirname}`;

  return (
    <DirectoryRow
      closed={closed}
      parentDirname={parentDirname}
      dirname={dirname}
      depth={depth}
      fileCount={fileCount}
      dirCount={dirCount}
      onClick={(e) => {
        e.preventDefault();
        const dir = e.target as HTMLDivElement;
        dir.classList.toggle(cx("closed"));
        e.stopPropagation();
      }}
    >
      {Object.keys(directories).map((dir) => (
        <NestedDir
          parentDirname={fullDirname}
          depth={depth + 1}
          key={`${fullDirname}/${dir}`}
          dirname={dir}
          directory={directories[dir]}
        />
      ))}
    </DirectoryRow>
  );
};

const DirectoryCard = () => {
  const [root, setDirectories] = useState<RootDirectory | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/directories.json")
      .then((response) => response.json())
      .then((data: RootDirectory) => {
        setDirectories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching json : ", error);
        setLoading(true);
      });
  }, []);

  if (loading || root === undefined) {
    return <div>Loading .... </div>;
  }

  return (
    <div className={cx("DirectoryCard")}>
      {Object.keys(root).map((dirname) => {
        return (
          <NestedDir
            closed={false}
            depth={1}
            key={"root-dir"}
            dirname={dirname}
            directory={root[dirname]}
          />
        );
      })}
    </div>
  );
};

export default DirectoryCard;
