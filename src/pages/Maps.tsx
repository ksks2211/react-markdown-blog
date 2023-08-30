import { useEffect, useState } from "react";
import withLayout from "../hoc/withLayout";
import useGlobal from "../hooks/useGlobal";
import { RootDirectory } from "../components/common/DirectoryCard";
import FolderCard from "../components/common/FolderCard";

export interface FileList {
  [dirname: string]: string[];
}

const Maps: React.FC = () => {
  const [rootDir, setDirectories] = useState<RootDirectory | undefined>(
    undefined
  );
  const [fileList, setFileList] = useState<FileList | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true);

  const { changeMenu } = useGlobal();
  useEffect(() => {
    changeMenu("MAPS");

    const dirRes = fetch("/maps-directories.json").then((res) => res.json());
    const fileRes = fetch("/maps-files.json").then((res) => res.json());

    Promise.all([dirRes, fileRes])
      .then((res) => {
        const res1: RootDirectory = res[0];
        const res2: FileList = res[1];

        setDirectories(res1);
        setFileList(res2);

        setLoading(false);

        console.log(JSON.stringify(res1));
        console.log(JSON.stringify(res2));
      })
      .catch((error) => {
        console.error("Error fetching json : ", error);
        setLoading(true);
      });
  }, [changeMenu]);

  if (loading || rootDir === undefined || fileList === undefined) {
    return <div>Loading .... </div>;
  }

  const pathname = location.pathname;

  const closed = false;

  if (fileList[pathname] !== undefined) {
    console.log(`pathname : ${pathname} is directory`);
  } else {
    console.log(`pathname : ${pathname} is file`);
  }

  return (
    <>
      <FolderCard rootDir={rootDir} fileList={fileList} closed={closed} />
    </>
  );
};

const MapsWithLayout = withLayout(Maps);

export default MapsWithLayout;
