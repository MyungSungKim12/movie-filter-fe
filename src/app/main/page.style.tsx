import styled from "styled-components";

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

    .hero {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        min-height: calc(100vh - 56px - 44px);
        padding: 0 80px;
        overflow: hidden;

        @media (max-width: 768px) {
            padding: 0 28px;
            min-height: auto;
            padding-top: 60px;
            padding-bottom: 60px;
        }
    }

    .hero_bg {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 65% 50%, rgba(229,9,20,0.07) 0%, transparent 65%);
        pointer-events: none;
    }

    .hero_grid {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 52%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: 4px;
        opacity: 0.15;
        pointer-events: none;
        mask-image: linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%);

        @media (max-width: 768px) {
            display: none;
        }
    }

    .hero_grid_item {
        border-radius: 4px;
        background: #1c1c1c;
    }

    .hero_grid_item:nth-child(3n) { background: #242424; }
    .hero_grid_item:nth-child(5n) { background: #181818; }

    .hero_content {
        position: relative;
        z-index: 2;
        max-width: 560px;
        display: flex;
        flex-direction: column;
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
    }

    .hero_sub {
        font-size: 1.55rem;
        color: rgba(255,255,255,0.5);
        line-height: 1.75;
        margin-bottom: 40px;
        max-width: 440px;
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
    }

    .hero_stats {
        display: flex;
        gap: 36px;
        margin-top: 52px;
        padding-top: 36px;
        border-top: 1px solid rgba(255,255,255,0.07);

        @media (max-width: 480px) {
            gap: 20px;
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
    }

    .stat_label {
        font-size: 1.1rem;
        color: rgba(255,255,255,0.35);
        letter-spacing: 0.03em;
    }
`