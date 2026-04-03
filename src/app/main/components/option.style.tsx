import styled, { css, keyframes } from "styled-components";

const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
`;

export const OverlayStyle = styled('div')<{$process:number}>`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(8px);
    z-index: ${({$process}) => $process > 0 ? 1000 : -1};
    opacity: ${({$process}) => $process > 0 ? 1 : 0};
    transition: opacity 0.3s ease;
`

export const OptionStyle = styled('div')<{$process:number}>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 520px;
    padding: 40px 40px 36px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    background: #141414;
    box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
    color: #fff;
    z-index: 9999;

    @media (max-width: 580px) {
        width: calc(100vw - 32px);
        padding: 32px 24px 28px;
    }

    .modal_close {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px;
        background: rgba(255,255,255,0.05);
        font-size: 1.2rem;
        color: rgba(255,255,255,0.4);
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(255,255,255,0.1);
            color: #fff;
        }
    }

    .option_progress {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 32px;
    }

    .option_step_title {
        font-size: 2.2rem;
        font-weight: 800;
        letter-spacing: -0.5px;
        margin-bottom: 6px;
        color: #fff;
    }

    .option_step_sub {
        font-size: 1.3rem;
        color: rgba(255,255,255,0.4);
        margin-bottom: 24px;
    }

    .option_view {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 32px;
        min-height: 140px;
        align-content: flex-start;
    }

    .option_next {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }
`

export const ProgressStep = styled('div')<{$active: boolean; $done: boolean}>`
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: ${({$done}) => $done ? '#E50914' : 'rgba(255,255,255,0.1)'};
    position: relative;
    overflow: hidden;

    ${({$active}) => $active && css`
        background: rgba(229,9,20,0.3);
        &::after {
            content: '';
            position: absolute;
            left: 0; top: 0;
            height: 100%;
            width: 60%;
            background: #E50914;
            border-radius: 2px;
            animation: none;
        }
    `}
`

export const OptionItem = styled('div')<{$process:number; $select:boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.08)'};
    background: ${({$select}) => $select ? 'rgba(229,9,20,0.1)' : 'rgba(255,255,255,0.03)'};
    min-width: ${({$process}) => $process === 1 ? '110px' : '90px'};
    cursor: pointer;
    opacity: 0;
    animation: ${fadeInUp} 0.4s ease forwards;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;

    &:hover {
        border-color: ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.2)'};
        background: ${({$select}) => $select ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.06)'};
        transform: translateY(-2px);
    }

    .option_icon {
        font-size: ${({$process}) => $process === 1 ? '2.2rem' : '1.8rem'};
    }

    .option_title {
        font-size: 1.25rem;
        color: ${({$select}) => $select ? '#ff6b6b' : 'rgba(255,255,255,0.65)'};
        font-weight: ${({$select}) => $select ? '600' : '400'};
        transition: color 0.2s ease;
    }
`

export const NavBtn = styled('button')<{$primary?: boolean}>`
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    ${({$primary}) => $primary ? css`
        background: #E50914;
        border: none;
        color: #fff;

        &:hover {
            background: #c1070f;
        }
    ` : css`
        background: transparent;
        border: 1px solid rgba(255,255,255,0.15);
        color: rgba(255,255,255,0.6);

        &:hover {
            border-color: rgba(255,255,255,0.3);
            color: #fff;
        }
    `}
`