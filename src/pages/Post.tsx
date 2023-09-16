import { useEffect } from "react";
import useGlobal from "../hooks/useGlobal";
import usePost from "../hooks/usePost";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import withLayout from "../hoc/withLayout";
import { formatDate } from "../helpers/dateUtils";
import MarkdownRenderer from "../components/common/MarkdownRenderer";
import styles from "./Post.module.scss";
import cn from "classnames/bind";
import { MdArrowBack } from "react-icons/md";
import UtterancesComments from "../components/common/UtterancesComments";

const cx = cn.bind(styles);

const Post: React.FC = () => {
  const { changeMenu } = useGlobal();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    // If you have the state and it has fromPage
    if (location.state && location.state.fromPage) {
      navigate(`/posts${location.state.fromPage}`);
    } else {
      // Else, navigate to default
      navigate("/posts?page=1");
    }
  };

  useEffect(() => {
    changeMenu("POSTS");
  }, [changeMenu]);

  const { data, isLoading, error } = usePost(id || 0);

  if (isLoading) return <div>Loading...</div>;

  if (error || data === undefined || id === undefined) {
    if (error) throw error;
    else throw new Error(`Failed To Get Post ${id}`);
  }

  const createdAt = formatDate(data.createdAt);
  const updatedAt = formatDate(data.updatedAt);

  console.log(data.content);

  return (
    <>
      <div className={cx("Post")}>
        <div className={cx("back-btn")} onClick={goBack}>
          <MdArrowBack className={cx("back-icon")} />
        </div>

        <div className={cx("post-metadata")}>
          <h1 className={cx("title")}>{data.title}</h1>

          <div className={cx("meta", "time")}>
            <time>
              <label>Posted</label>
              {createdAt}
            </time>
            <time>
              <label>Last Update</label>
              {updatedAt}
            </time>
          </div>

          <div className={cx("meta", "writer")}>
            <span>
              <label>Writer</label>
              {data.writer}
            </span>
          </div>
        </div>

        <div>
          <MarkdownRenderer content={data.content} />
        </div>

        <div>
          Category : {data.category}
          <div>Tags : {data.tags}</div>
        </div>
      </div>
      <UtterancesComments />
    </>
  );
};

const PostWithLayout = withLayout(Post);

export default PostWithLayout;
