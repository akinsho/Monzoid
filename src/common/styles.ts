import { css } from "styled-components";

export const boxShadow = css`
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const borderRadius = css`
    border-radius: 0.2rem;
`;

export const fullSize = css`
    width: 100%;
    height: 100%;
`;

export const flexCenter = css`
    justify-content: center;
    align-items: center;
`;

export const flexRow = css`
    display: flex;
    flex-direction: row;
    ${flexCenter};
`;

export const flexColumn = css`
    display: flex;
    flex-direction: column;
    ${flexCenter};
`;
