import styled from "styled-components";

export const SideNavbarContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(60px, min(5vw, 200px)) 1fr; /* Sidebar and content */
  grid-template-rows: 100vh; /* Full height */
  width: 100vw;
`;