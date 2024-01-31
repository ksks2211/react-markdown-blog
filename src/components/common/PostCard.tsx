import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { styled } from "@mui/material";
import { rgba } from "polished";
import { scrollToTheTop } from "../../helpers/scrollUtils";

const StyledPostCard = styled("div")`
  position: relative;
  overflow: hidden;
  cursor: pointer;

  box-sizing: content-box;

  padding: 2.2rem;
  display: flex;

  justify-content: center;
  flex-flow: column;
  border-radius: 1.2rem;

  margin-bottom: 1rem;
  box-shadow: 0 1px 1px 0.5px
      ${(props) => rgba(props.theme.palette.grey[800], 0.12)},
    1px 0 1px 0.5px ${(props) => rgba(props.theme.palette.grey[800], 0.12)};

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 10;

  ${(props) => props.theme.breakpoints.up("md")} {
    margin: 1rem;
    padding: 2.2rem 4rem;
  }

  &:last-child {
    margin-bottom: 4rem !important;
  }

  &:hover {
    opacity: 0.7;
    background-color: ${(props) => rgba(props.theme.palette.grey[400], 0.14)};
  }

  h1 {
    width: 100%;
    color: ${(props) => props.theme.palette.grey[800]};
    font-size: 1.4rem;
    font-weight: 600;
  }

  p {
    padding: 0.4rem 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${(props) => props.theme.palette.grey[800]};
    min-height: 1rem;
  }

  .post-metadata {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.85rem;
    color: rgba(100, 100, 100);

    time {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      svg {
        margin-right: 0.3rem;
      }
    }

    .metadata-writer {
      font-weight: 600;
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
      <h1>{title}</h1>
      <p>{description}</p>
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
