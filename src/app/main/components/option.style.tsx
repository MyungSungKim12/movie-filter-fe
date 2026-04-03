import styled, { css, keyframes } from "styled-components";

const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
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
    padding: 16px;
`

export const OptionStyle = styled('div')<{$process:number}>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: ${({$process}) => $process === 1 ? '420px' : '520px'};
    padding: 40px 36px 32px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    background: #141414;
    box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
    color: #fff;
    z-index: 9999;

    @media (max-width: 480px) {
        padding: 32px 20px 28px;
        border-radius: 12px;
    }

    .modal_close {
        position: absolute;
        top: 14px;
        right: 14px;
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
        margin-bottom: 28px;
        padding-right: 36px;
    }

    .option_step_title {
        font-size: 2.2rem;
        font-weight: 800;
        letter-spacing: -0.5px;
        margin-bottom: 6px;
        color: #fff;

        @media (max-width: 480px) {
            font-size: 1.9rem;
        }
    }

    .option_step_sub {
        font-size: 1.25rem;
        color: rgba(255,255,255,0.4);
        margin-bottom: 20px;
    }

    /* 인원(1단계): 2×2 그리드 */
    .option_view_personnel {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-bottom: 28px;
    }

    /* 감정(2단계) / 장르(3단계): 3×3 그리드 */
    .option_view_grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 28px;

        @media (max-width: 360px) {
            grid-template-columns: repeat(2, 1fr);
        }
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
        background: rgba(229,9,20,0.25);
        &::after {
            content: '';
            position: absolute;
            left: 0; top: 0;
            height: 100%;
            width: 55%;
            background: #E50914;
            border-radius: 2px;
        }
    `}
`

/* 인원 아이템 - 아이콘 + 텍스트, 더 큰 카드 */
export const PersonnelItem = styled('div')<{$select: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 24px 12px;
    border-radius: 10px;
    border: 1px solid ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.08)'};
    background: ${({$select}) => $select ? 'rgba(229,9,20,0.1)' : 'rgba(255,255,255,0.03)'};
    cursor: pointer;
    opacity: 0;
    animation: ${fadeInUp} 0.35s ease forwards;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;

    &:hover {
        border-color: ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.2)'};
        background: ${({$select}) => $select ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.06)'};
        transform: translateY(-2px);
    }

    .option_icon {
        font-size: 2.4rem;
        color: ${({$select}) => $select ? '#ff6b6b' : 'rgba(255,255,255,0.7)'};
    }

    .option_title {
        font-size: 1.4rem;
        font-weight: ${({$select}) => $select ? '600' : '400'};
        color: ${({$select}) => $select ? '#ff6b6b' : 'rgba(255,255,255,0.7)'};
        transition: color 0.2s ease;
    }
`

/* 감정 아이템 - 아이콘 + 텍스트 */
export const MotionItem = styled('div')<{$select: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 8px;
    border-radius: 10px;
    border: 1px solid ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.08)'};
    background: ${({$select}) => $select ? 'rgba(229,9,20,0.1)' : 'rgba(255,255,255,0.03)'};
    cursor: pointer;
    opacity: 0;
    animation: ${fadeInUp} 0.35s ease forwards;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;

    &:hover {
        border-color: ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.2)'};
        background: ${({$select}) => $select ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.06)'};
        transform: translateY(-2px);
    }

    .option_icon {
        font-size: 1.9rem;
        color: ${({$select}) => $select ? '#ff6b6b' : 'rgba(255,255,255,0.7)'};
    }

    .option_title {
        font-size: 1.2rem;
        font-weight: ${({$select}) => $select ? '600' : '400'};
        color: ${({$select}) => $select ? '#ff6b6b' : 'rgba(255,255,255,0.6)'};
        transition: color 0.2s ease;
    }
`

/* 장르 아이템 - 텍스트 배지 스타일 */
export const GenreItem = styled('div')<{$select: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 8px;
    border-radius: 8px;
    border: 1px solid ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.08)'};
    background: ${({$select}) => $select ? 'rgba(229,9,20,0.1)' : 'rgba(255,255,255,0.03)'};
    cursor: pointer;
    opacity: 0;
    animation: ${fadeInUp} 0.35s ease forwards;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;

    &:hover {
        border-color: ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.2)'};
        background: ${({$select}) => $select ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.06)'};
        transform: translateY(-2px);
    }

    .option_title {
        font-size: 1.35rem;
        font-weight: ${({$select}) => $select ? '600' : '400'};
        color: ${({$select}) => $select ? '#ff6b6b' : 'rgba(255,255,255,0.65)'};
        transition: color 0.2s ease;
        letter-spacing: 0.02em;
    }
`

export const NavBtn = styled('button')<{$primary?: boolean}>`
    padding: 12px 28px;
    border-radius: 6px;
    font-size: 1.35rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    ${({$primary}) => $primary ? css`
        background: #E50914;
        border: none;
        color: #fff;

        &:hover { background: #c1070f; }
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

export const PlatformGrid = styled('div')`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 28px;
`

export const PlatformItem = styled('div')<{$select: boolean; $isAll: boolean}>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.08)'};
    background: ${({$select}) => $select ? 'rgba(229,9,20,0.1)' : 'rgba(255,255,255,0.03)'};
    cursor: pointer;
    opacity: 0;
    animation: ${fadeInUp} 0.35s ease forwards;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;

    ${({$isAll}) => $isAll && `
        grid-column: 1 / -1;
        justify-content: center;
    `}

    &:hover {
        border-color: ${({$select}) => $select ? '#E50914' : 'rgba(255,255,255,0.2)'};
        background: ${({$select}) => $select ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.06)'};
        transform: translateY(-2px);
    }

    .platform_logo {
        width: 28px;
        height: 28px;
        border-radius: 6px;
        background-size: cover;
        background-position: center;
        flex-shrink: 0;
    }

    .platform_name {
        font-size: 1.35rem;
        font-weight: ${({$select}) => $select ? '600' : '400'};
        color: ${({$select}) => $select ? '#ff6b6b' : 'rgba(255,255,255,0.7)'};
        transition: color 0.2s ease;
    }
`