import { ComponentPropsWithRef, ComponentPropsWithoutRef, useRef } from "react";
import { FaRegFolder, FaRegFolderOpen, FaRegFileAlt } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

import styles from "./FolderCard.module.scss";
import cn from "classnames/bind";
import { Link } from "react-router-dom";
import { FileList } from "../../pages/Maps";
import { removeDash } from "../../helpers/stringUtils";
import { useLocation } from "react-router-dom";

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
  files: string[];
}

const DirectoryRow: React.FC<DirectoryRowProps> = ({
  dirname,
  fileCount,
  children,
  depth,
  dirCount,
  parentDirname,
  closed,
  files,
  // ...props
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  const fullDirname = `${parentDirname}/${dirname}`;

  const canToggle = dirCount + fileCount !== 0;

  const marked = depth === 1;

  const rowRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    rowRef.current?.classList.toggle(cx("closed"));
  };

  return (
    <div className={cx("row")}>
      <div
        className={cx("row-wrapper", { closed, marked })}
        ref={rowRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div
          style={{
            display: "inline-block",
            width: `${depth}rem`,
            height: "100%",
          }}
        />
        {<FaRegFolderOpen className={cx("icon", "open-folder")} />}
        {<FaRegFolder className={cx("icon", "closed-folder")} />}

        <Link
          className={cx("dirname", { bold: pathname === fullDirname })}
          to={fullDirname}
          onClick={(e) => e.stopPropagation()}
        >
          {removeDash(dirname)}
        </Link>

        <span
          className={cx("details")}
        >{`${fileCount} files, ${dirCount} folders`}</span>

        {canToggle && (
          <div className={cx("dropdown")} onClick={onClick}>
            <RiArrowDropDownLine className={cx("dropdown-icon")} />
          </div>
        )}
      </div>

      {files.map((file, index) => {
        const fileFullName = `${fullDirname}/${index + 1}`;

        return (
          <div key={fileFullName} className={cx("row")}>
            <div className={cx("row-wrapper")}>
              <div
                style={{
                  display: "inline-block",
                  width: `${depth + 1}rem`,
                  height: "100%",
                }}
              />
              {<FaRegFileAlt className={cx("icon")} />}
              <Link
                className={cx("dirname", { bold: pathname === fileFullName })}
                to={fileFullName}
                onClick={(e) => e.stopPropagation()}
              >
                {`${index + 1}. ${file}`}
              </Link>
            </div>
          </div>
        );
      })}

      {children}
    </div>
  );
};

interface NestedDirProps extends ComponentPropsWithoutRef<"div"> {
  dirname: string;
  directory: Directory;
  depth: number;
  fileList?: FileList | undefined;
  parentDirname?: string;
  closed?: boolean;
}

const NestedDir: React.FC<NestedDirProps> = ({
  parentDirname = "",
  dirname,
  directory,
  depth,
  fileList,
  closed = true,
}) => {
  const directories = directory.directories;

  const dirCount = Object.keys(directories).length;
  const fileCount = directory.files;

  const fullDirname = `${parentDirname}/${dirname}`;

  const files = fileList !== undefined ? fileList[fullDirname] : [];

  return (
    <DirectoryRow
      files={files}
      closed={closed}
      parentDirname={parentDirname}
      dirname={dirname}
      depth={depth}
      fileCount={fileCount}
      dirCount={dirCount}
    >
      {Object.keys(directories).map((dir) => (
        <NestedDir
          closed={closed}
          parentDirname={fullDirname}
          depth={depth + 1}
          key={`${fullDirname}/${dir}`}
          dirname={dir}
          directory={directories[dir]}
          fileList={fileList}
        />
      ))}
    </DirectoryRow>
  );
};

interface DirectoryCardProps {
  rootDir: RootDirectory;
  fileList: FileList;
  closed?: boolean;
}

const DirectoryCard = ({
  rootDir,
  fileList,
  closed = true,
}: DirectoryCardProps) => {
  return (
    <div className={cx("DirectoryCard")}>
      {Object.keys(rootDir).map((dirname) => {
        return (
          <NestedDir
            fileList={fileList}
            closed={closed}
            depth={1}
            key={"root"}
            dirname={dirname}
            directory={rootDir[dirname]}
          />
        );
      })}
    </div>
  );
};

export default DirectoryCard;
