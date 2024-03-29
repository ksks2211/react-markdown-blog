import { css, styled } from "@mui/material";

interface CircleProps {
  color: string;
  size: number;
  animation: "moveFromTopLeft" | "moveFromBottomRight";
  direction: "normal" | "reverse";
  delay?: boolean;
}

const StyledCircle = styled("div")<CircleProps>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.size / 2}rem;
  opacity: 0.3;
  margin: 0;
  box-sizing: border-box;
  animation: ${(props) => props.animation} 6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: ${(props) => props.direction};
  animation-delay: ${(props) => (props.delay === undefined ? 0 : -1.5)}s;
  position: absolute;
  z-index: 999;

  @keyframes moveFromTopLeft {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(${(props) => props.size}rem, 0);
    }
    50% {
      transform: translate(
        ${(props) => props.size}rem,
        ${(props) => props.size}rem
      );
    }
    75% {
      transform: translate(0, ${(props) => props.size}rem);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes moveFromBottomRight {
    0% {
      transform: translate(
        ${(props) => props.size}rem,
        ${(props) => props.size}rem
      );
    }
    25% {
      transform: translate(${(props) => props.size}rem, 0);
    }
    50% {
      transform: translate(0, 0);
    }
    75% {
      transform: translate(0, ${(props) => props.size}rem);
    }

    100% {
      transform: translate(
        ${(props) => props.size}rem,
        ${(props) => props.size}rem
      );
    }
  }
`;

interface LoaderProps {
  size: number;
}

// Base styles for the card
const basedLoaderStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  z-index: 999;
`;

const StyledLoader = styled("div")<LoaderProps>`
  ${basedLoaderStyles};

  .circles-wrapper {
    position: relative;
    transform: translateX(-${(props) => props.size}rem)
      translateY(-${(props) => props.size}rem);
  }
`;

const Loader = ({ width = 4 }: { width?: number }) => {
  const size = width / 2;

  return (
    <StyledLoader size={size}>
      <div className="circles-wrapper">
        <StyledCircle
          size={size}
          color="tomato"
          direction="normal"
          animation="moveFromTopLeft"
        />
        <StyledCircle
          size={size}
          color="dodgerblue"
          direction="reverse"
          animation="moveFromTopLeft"
        />

        <StyledCircle
          size={size}
          color="yellow"
          direction="normal"
          animation="moveFromBottomRight"
        />
        <StyledCircle
          size={size}
          color="green"
          direction="reverse"
          animation="moveFromBottomRight"
        />

        <StyledCircle
          size={size}
          color="orange"
          direction="normal"
          animation="moveFromTopLeft"
          delay
        />
        <StyledCircle
          size={size}
          color="purple"
          direction="reverse"
          animation="moveFromTopLeft"
          delay
        />

        <StyledCircle
          size={size}
          color="skyblue"
          direction="normal"
          animation="moveFromBottomRight"
          delay
        />
        <StyledCircle
          size={size}
          color="red"
          direction="reverse"
          animation="moveFromBottomRight"
          delay
        />
      </div>
    </StyledLoader>
  );
};

export default Loader;
