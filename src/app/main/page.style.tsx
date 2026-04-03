import styled, { keyframes } from "styled-components";

const scrollUp = keyframes`
    0%   { transform: translateY(0); }
    100% { transform: translateY(-50%); }
`;

const scrollDown = keyframes`
    0%   { transform: translateY(-50%); }
    100% { transform: translateY(0); }
`;

const scrollLeft = keyframes`
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
`;

export const Main = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: #0A0A0A;
    color: white;
    padding-top: 56px;
    padding-bottom: 44px;

    /* ── 히어로 ───────────────────── */
    .hero {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        min-height: calc(100vh - 56px - 44px);
        padding: 0 80px;
        overflow: hidden;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            padding: 40px 24px 48px;
            min-height: auto;
            gap: 0;
        }
    }

    .hero_bg {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 65% 50%, rgba(229,9,20,0.07) 0%, transparent 65%);
        pointer-events: none;

        @media (max-width: 768px) {
            background: radial-gradient(ellipse at 50% 30%, rgba(229,9,20,0.06) 0%, transparent 70%);
        }
    }

    /* ── 데스크탑 포스터 그리드 ────── */
    .hero_poster_grid {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 52%;
        display: flex;
        gap: 12px;
        padding: 0 16px;
        pointer-events: none;
        mask-image: linear-gradient(
            to left,
            black 0%,
            black 40%,
            transparent 100%
        );
        overflow: hidden;

        @media (max-width: 1024px) {
            width: 44%;
        }

        @media (max-width: 768px) {
            display: none;
        }
    }

    .poster_col {
        display: flex;
        flex-direction: column;
        gap: 12px;
        flex-shrink: 0;
    }

    .poster_col_up {
        animation: ${scrollUp} 35s linear infinite;
    }

    .poster_col_down {
        animation: ${scrollDown} 45s linear infinite;
    }

    .poster_col_up2 {
        animation: ${scrollUp} 55s linear infinite;

        @media (max-width: 1024px) {
            display: none;
        }
    }

    .poster_card {
        width: 140px;
        aspect-ratio: 2/3;
        border-radius: 8px;
        background: #1c1c1c;
        background-size: cover;
        background-position: center;
        flex-shrink: 0;

        @media (max-width: 1024px) {
            width: 120px;
        }
    }

    /* ── 모바일 포스터 배너 ─────────── */
    .hero_poster_mobile {
        display: none;
        width: calc(100% + 48px);
        margin: 0 -24px 32px;
        overflow: hidden;
        mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
        );

        @media (max-width: 768px) {
            display: block;
        }
    }

    .poster_row {
        display: flex;
        gap: 10px;
        width: max-content;
        animation: ${scrollLeft} 30s linear infinite;
    }

    .poster_card_mobile {
        width: 90px;
        aspect-ratio: 2/3;
        border-radius: 8px;
        background: #1c1c1c;
        background-size: cover;
        background-position: center;
        flex-shrink: 0;
    }

    /* ── 히어로 콘텐츠 ─────────────── */
    .hero_content {
        position: relative;
        z-index: 2;
        max-width: 560px;
        display: flex;
        flex-direction: column;

        @media (max-width: 768px) {
            max-width: 100%;
        }
    }

    .hero_badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 5px 14px;
        border-radius: 20px;
        background: rgba(229,9,20,0.12);
        border: 1px solid rgba(229,9,20,0.25);
        color: #ff6b6b;
        font-size: 1.15rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        margin-bottom: 24px;
        width: fit-content;

        .badge_dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #E50914;
        }
    }

    .hero_title {
        font-size: clamp(3.2rem, 5vw, 5.2rem);
        font-weight: 900;
        line-height: 1.08;
        letter-spacing: -2px;
        margin-bottom: 20px;
        color: #fff;

        span { color: #E50914; }

        @media (max-width: 768px) {
            font-size: 3.6rem;
            letter-spacing: -1.5px;
        }
    }

    .hero_sub {
        font-size: 1.55rem;
        color: rgba(255,255,255,0.5);
        line-height: 1.75;
        margin-bottom: 40px;
        max-width: 440px;

        @media (max-width: 768px) {
            font-size: 1.45rem;
            max-width: 100%;
        }
    }

    .hero_cta {
        display: flex;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
    }

    .cta_primary {
        padding: 16px 36px;
        background: #E50914;
        border: none;
        border-radius: 6px;
        color: #fff;
        font-size: 1.5rem;
        font-weight: 700;
        cursor: pointer;
        letter-spacing: -0.2px;
        transition: background 0.2s ease, transform 0.15s ease;

        &:hover {
            background: #c1070f;
            transform: translateY(-1px);
        }
        &:active {
            transform: translateY(0);
        }

        @media (max-width: 768px) {
            width: 100%;
            text-align: center;
            padding: 18px;
        }
    }

    .hero_stats {
        display: flex;
        gap: 36px;
        margin-top: 52px;
        padding-top: 36px;
        border-top: 1px solid rgba(255,255,255,0.07);

        @media (max-width: 768px) {
            gap: 24px;
            margin-top: 36px;
            padding-top: 28px;
        }

        @media (max-width: 480px) {
            gap: 16px;
        }
    }

    .stat_item {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .stat_num {
        font-size: 2.4rem;
        font-weight: 900;
        color: #fff;
        letter-spacing: -1px;

        @media (max-width: 768px) {
            font-size: 2rem;
        }
    }

    .stat_label {
        font-size: 1.1rem;
        color: rgba(255,255,255,0.35);
        letter-spacing: 0.03em;
    }
`