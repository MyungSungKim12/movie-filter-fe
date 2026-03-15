import styled, { keyframes, css } from 'styled-components';

export const WishlistStyle = styled.button<{$isLoading:boolean; $type:string}>`
    @media (max-width: 1024px) {
        width: ${({$type}) => $type === 'L' ? 20 : 25}px;
        height: ${({$type}) => $type === 'L' ? 20 : 25}px;
        font-size: ${({$type}) => $type === 'L' ? 1 : 1.3}rem;
    }
    @media (max-width: 768px) {
        top: 7px;
        right: 7px;
    }
    // mobile_view
    @media (max-width: 480px) {
        width: 19px;
        height: 19px;
        margin-bottom: 10px;
        font-size: 1rem;
    }
    position: ${({$type}) => $type === 'L' ? 'absolute' : 'relative'};
    top: 5px;
    right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({$type}) => $type === 'L' ? 25 : 33}px;
    height: ${({$type}) => $type === 'L' ? 25 : 33}px;
    padding: 0;
    margin-bottom: 3px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    font-size: ${({$type}) => $type === 'L' ? 1.3 : 1.6}rem;
    line-height: 0;
    background: rgba(255, 255, 255, 0.2); 
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    cursor: ${({$isLoading}) => $isLoading ? 'default' : 'pointer'};
    transition: all 0.3s ease;
    z-index: 100;

    .icon_on {
        filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
        color: #FF4D4D;
    }

    .icon_off {
        filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
        color: #FFFFFF;

        &:hover {
            color: #FF4D4D;
        }
    }
`;