import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const OverlayStyle = styled('div')<{$process:number}>`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0.5px); 
    z-index: ${({$process}) => $process > 0 ? 1000 : -1};
`

export const OptionStyle = styled('div')<{$process:number}>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-height: 500px) {
        height: 360px;
    }
    @media (max-width: 768px) {
        width: 370px;
        height: 360px;
    }
    // mobile_view
    @media (max-width: 500px) {
        width: 370px;
    }
    width: 470px;
    height: 430px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    background: rgba(30, 30, 30, 0.9);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    color: #e0e0e0;
    text-align: center;
    z-index: 9999;
    opacity: ${({$process}) => $process > 0 ? 1 : 0};
    transition: opacity .5s ease-in-out;

    .modal_close {
        position: absolute;
        top: 7px;
        right: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border: 1px solid rgba(172, 229, 255, 0.2);
        border-radius: 8px;
        background: rgba(172, 229, 255, 0.1);
        font-size: 1rem;
        color: #ACE5FF;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background: rgba(172, 229, 255, 0.2);
            border-color: #ACE5FF;
            box-shadow: 0 0 10px rgba(172, 229, 255, 0.3);
        }
    }

    .option_progress {
        position: absolute;
        top: 35px;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        .progress_item {

            .item_title {

            }
        }
    }

    .option_view {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
        padding-bottom: 20px;

        .option_item {
        }
    }

    .option_next {
        position: absolute;
        bottom: 35px;
        left: 0;
        width: 100%;
    
        button {
            width: ${({$process}) => $process > 1 ? 30 : 50}%;
            padding: 12px 28px;
            margin: 0 15px;
            border: 1px solid rgba(135, 206, 250, 0.5);
            border-radius: 8px;
            color: #ACE5FF; 
            background: rgba(0, 150, 255, 0.15); 
            backdrop-filter: blur(4px);
            box-shadow: 0 0 15px rgba(0, 150, 255, 0.1);
            transition: background box-shadow color 0.3s ease;
            cursor: pointer;

            &:hover {
                background: rgba(0, 150, 255, 0.3);
                box-shadow: 0 0 20px rgba(0, 150, 255, 0.3);
                color: #ffffff;
            }
        }
    }
`

export const OptionItem = styled('div')<{$process:number, $select:boolean}>`
    @media (max-height: 500px) {
        height: ${({$process}) => $process === 1 ? 60 : 40}px;
    }
    @media (max-width: 768px) {
        width: ${({$process}) => $process === 1 ? 100 : 75}px;
        height: ${({$process}) => $process === 1 ? 50 : 40}px;
        margin: 5px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${({$process}) => $process === 1 ? 120 : 105}px;
    height: ${({$process}) => $process === 1 ? 70 : 50}px;
    padding: 10px;
    margin: 10px;
    border: 1px solid ${({$select}) => $select ? '#ACE5FF' : 'transparent'};
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    animation: ${fadeIn} 1s ease-out .2s forwards;

    .option_icon {
        @media (max-width: 768px) {
            font-size: 1.2rem;
        }
        padding-bottom: 2px;
        font-size: 1.7rem;
    }

    .option_title {
        @media (max-width: 768px) {
            font-size: 1rem;
        }
        font-size: 1.5rem;
    }
    
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #ACE5FF;
    }
`

export const ProgressBar = styled('div')`
    position: relative;
    width: 120px;
    height: 2px;
    margin-bottom: 20px;
    background-color: #062033;
`

export const ProgressGauge = styled('div')<{$process:boolean}>`
    width: ${({$process}) => $process ? 120 : 0}px;
    height: 2px;
    background-color: #ACE5FF;
    transition: width 1s ease;
`

export const ProgressItem = styled('div')<{$process:boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;

    .item_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        margin-bottom: 5px;
        border: 1px solid rgba(135, 206, 250, 0.5);
        border-radius: 50%;
        background: rgba(0, 150, 255, 0.15); 
        backdrop-filter: blur(4px);
        box-shadow: 0 0 15px rgba(0, 150, 255, 0.1);
        overflow: hidden;

        ${({ $process }) => $process && css`
            &::before {
                content: '';
                position: absolute;
                width: 101%;
                height: 101%;
                background: conic-gradient(
                    transparent, 
                    rgba(135, 206, 250, 0.8), 
                    transparent 30%
                );
                animation: ${rotate} 2s linear infinite;
            }
        `}

        &::after {
            content: '';
            position: absolute;
            inset: 1px;
            background: rgba(0, 10, 30, .9);
            border-radius: 50%;
            z-index: 1;
        }

        .progress_icon {
            padding: 0;
            font-size: 1.3rem;
            color: #ACE5FF; 
            z-index: 2;
        }
    }

`