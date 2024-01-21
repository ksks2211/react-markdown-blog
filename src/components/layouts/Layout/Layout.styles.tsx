/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

interface SidebarOpenProps {
  sidebarOpen: boolean;
}
export const StyledOverlay = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;

  animation: fade-in 0.5s forwards;
  @keyframes fade-in {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;
export const StyledPageWrapper = styled.div<SidebarOpenProps>`
  background-color: var(--header-color);
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
`;

type RightPartitionProps = SidebarOpenProps & { isDesktop: boolean };

export const StyledRightPartitionWrapper = styled.div<RightPartitionProps>`
  background-color: var(--header-color);
  transition: margin-right 0.3s ease;
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
`;
export const StyledLowerPartitionWrapper = styled.main`
  background-color: var(--right-sidebar-color);
  display: flex;
  flex-direction: row;
  position: relative;
`;
export const StyledMainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
