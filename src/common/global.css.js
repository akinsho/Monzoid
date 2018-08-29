import { injectGlobal, css } from "styled-components";

import { fullSize } from "./styles";

export default injectGlobal`
  html, body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    ${fullSize};
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  }

  #root {
    ${fullSize};
  }
`;
