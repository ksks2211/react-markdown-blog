import styles from "./PostCard.module.scss";
import cn from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";

const cx = cn.bind(styles);

interface PostCardProps {
  key: number;
  id: number;
  postedBy: string;
  createdAtFromNow: string;
  title: string;
  description: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  description,
  createdAtFromNow,
  postedBy,
}) => {
  const navigate = useNavigate();
  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/posts/${id}`, { state: { fromPage: location.search } });
  };

  return (
    <div className={cx("PostCard")} onClick={handleRedirect}>
      <h1 className={cx("title")}>{title}</h1>
      <div className={cx("description")}>{description}</div>
      <div className={cx("metadata")}>
        <time>
          <FaRegClock className={cx("icon")} />
          {createdAtFromNow}
        </time>
        <span className={cx("writer")}>PostedBy {postedBy}</span>
      </div>
    </div>
  );
};

export default PostCard;
