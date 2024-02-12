import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { styled } from "@mui/material";
import { rgba } from "polished";
import { scrollToTheTop } from "../../helpers/scrollUtils";

const StyledPostCard = styled("div")`
  box-shadow: 0 1px 3px 1px
    ${(props) => rgba(props.theme.palette.grey[800], 0.12)};

  cursor: pointer;

  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  padding: 1.6rem 1.4rem;
  margin-bottom: 1.4rem;

  &:hover {
    background-color: ${(props) =>
      rgba(props.theme.palette.success.main, 0.14)};
  }

  .post-title {
    width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
    /* overflow-wrap: break-word; */
    display: -webkit-box;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    color: ${(props) => props.theme.palette.grey[800]};
    font-size: 1.4rem;
    line-height: 1.5;
    font-weight: 600;
  }

  .post-description {
    padding: 0.4rem 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${(props) => props.theme.palette.grey[800]};
    min-height: 1rem;

    white-space: normal;
    overflow-wrap: anywhere;
    /* overflow-wrap: break-word; */
    display: -webkit-box;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${(props) => props.theme.breakpoints.up("sm")} {
    border-radius: 1rem;
    padding: 2rem 3.5rem;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: 3rem 5rem;
  }

  .post-metadata {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.85rem;
    color: ${(props) => props.theme.palette.grey[700]};
    time {
      min-width: 30%;
      max-width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;

      display: inline-flex;
      text-align: start;
      align-items: center;

      white-space: nowrap;
      svg {
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: 0.3rem;
      }
    }

    .metadata-writer {
      justify-self: end;
      margin-left: auto;
      flex-grow: 0;
      flex-shrink: 0;
      min-width: 30%;
      max-width: 50%;
      font-weight: 600;
      text-align: end;
      white-space: nowrap;
    }
  }
`;

interface PostCardProps {
  key: number;
  id: number;
  postedBy: string;
  createdAtFromNow: string;
  title: string;
  description?: string;
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
    scrollToTheTop();
    e.preventDefault();
    navigate(`/posts/${id}`, { state: { fromPage: location.search } });
  };

  return (
    <StyledPostCard onClick={handleRedirect}>
      <h1 className="post-title">{title}</h1>
      <p className="post-description">{description}</p>
      <div className="post-metadata">
        <time>
          <FaRegClock />
          {createdAtFromNow}
        </time>
        <span className="metadata-writer">PostedBy {postedBy}</span>
      </div>
    </StyledPostCard>
  );
};

export default PostCard;
