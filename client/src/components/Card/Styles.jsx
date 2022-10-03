import styled from 'styled-components';

export const Card = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid orange; */
    border-radius: 1rem;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1)
    );
    backdrop-filter: blur(21px);
    -webkit-backdrop-filter: blur(21px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 24px;
`
