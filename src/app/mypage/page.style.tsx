import styled, { keyframes, css } from "styled-components";

export const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;

const shimmer = keyframes`
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
`;

const growBar = keyframes`
    from { width: 0%; }
    to   { width: 100%; }
`;

const countUp = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
`;

/* ─── 레이아웃 ─────────────────────────────────────────────────────────── */
export const PageWrapper = styled.div`
    background: #0A0A0A;
    min-height: 100vh;
    color: #ffffff;
`;

export const MainContent = styled.main`
    position: relative;
    z-index: 1;
    padding: 80px 48px 80px;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 1200px) { padding: 80px 28px 60px; }
    @media (max-width: 768px)  { padding: 70px 16px 50px; }
`;

export const DashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 28px;
    align-items: start;

    @media (max-width: 1100px) { grid-template-columns: 1fr 260px; gap: 20px; }
    @media (max-width: 900px)  { grid-template-columns: 1fr; }
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    min-width: 0;
`;

/* ─── 섹션 ─────────────────────────────────────────────────────────────── */
export const Section = styled.section<{ $delay?: number }>`
    background: #111111;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 28px;
    animation: ${fadeInUp} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: ${p => p.$delay ?? 0}ms;

    @media (max-width: 768px) { padding: 20px; }
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
`;

export const SectionTitle = styled.h3`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.35rem;
    font-weight: 700;
    color: #f0f0f0;
    letter-spacing: 0.02em;
`;

export const SectionCount = styled.span`
    font-size: 1.1rem;
    color: rgba(255,255,255,0.25);
    font-weight: 400;
`;

/* ─── 캐러셀 ────────────────────────────────────────────────────────────── */
export const CarouselOuter = styled.div`
    position: relative;
    width: 100%;
`;

export const CarouselBtn = styled.button<{ $dir: 'left' | 'right'; $visible: boolean }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${p => p.$dir === 'left' ? 'left: -16px;' : 'right: -16px;'}
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    background: #1a1a1a;
    color: #fff;
    cursor: pointer;
    opacity: ${p => p.$visible ? 1 : 0};
    pointer-events: ${p => p.$visible ? 'auto' : 'none'};
    transition: all 0.2s ease;

    &:hover {
        background: #E50914;
        border-color: #E50914;
        transform: translateY(-50%) scale(1.08);
    }

    @media (max-width: 768px) {
        width: 30px; height: 30px;
        ${p => p.$dir === 'left' ? 'left: -10px;' : 'right: -10px;'}
    }
`;

export const CarouselViewport = styled.div<{ $peek: boolean }>`
    overflow: hidden;
    border-radius: 10px;
    mask-image: ${p => p.$peek
        ? 'linear-gradient(to right, black 87%, transparent 100%)'
        : 'none'};
`;

export const CarouselTrack = styled.div<{ $offset: number }>`
    display: flex;
    gap: 10px;
    transform: translateX(${p => p.$offset}px);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
`;

export const MovieCard = styled.div`
    position: relative;
    flex: 0 0 130px;
    aspect-ratio: 2 / 3;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    background: #1a1a1a;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    @media (max-width: 1100px) { flex: 0 0 110px; }
    @media (max-width: 768px)  { flex: 0 0 90px; }

    &:hover {
        transform: translateY(-8px) scale(1.03);
        box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        z-index: 5;
    }
`;

export const Poster = styled.div<{ $url?: string | null }>`
    width: 100%;
    height: 100%;
    background: #1a1a1a ${p => p.$url ? `url("${p.$url}")` : ''} center / cover no-repeat;
    transition: transform 0.4s ease;

    ${MovieCard}:hover & { transform: scale(1.06); }
`;

export const CardOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%);
    z-index: 1;
`;

export const CardTitle = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px 8px 8px;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 2;
    text-shadow: 0 1px 4px rgba(0,0,0,0.9);
`;

export const CarouselDots = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 14px;
`;

export const Dot = styled.button<{ $active: boolean }>`
    width: ${p => p.$active ? 18 : 5}px;
    height: 5px;
    border-radius: 3px;
    border: none;
    padding: 0;
    background: ${p => p.$active ? '#E50914' : 'rgba(255,255,255,0.12)'};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover { background: ${p => p.$active ? '#E50914' : 'rgba(255,255,255,0.3)'}; }
`;

export const EmptyBox = styled.div`
    padding: 48px 0;
    text-align: center;
    color: rgba(255,255,255,0.2);
    font-size: 1.3rem;
    border: 1px dashed rgba(255,255,255,0.07);
    border-radius: 10px;
`;

export const SkeletonCard = styled.div`
    flex: 0 0 130px;
    aspect-ratio: 2 / 3;
    border-radius: 10px;
    background: linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.8s infinite;

    @media (max-width: 1100px) { flex: 0 0 110px; }
    @media (max-width: 768px)  { flex: 0 0 90px; }
`;

/* ─── 통계 ──────────────────────────────────────────────────────────────── */
export const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 20px;

    @media (max-width: 480px) { grid-template-columns: repeat(3, 1fr); }
`;

export const StatCard = styled.div`
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 18px 16px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    animation: ${countUp} 0.5s ease both;
    transition: border-color 0.2s ease;

    &:hover { border-color: rgba(229,9,20,0.3); }
`;

export const StatLabel = styled.div`
    font-size: 1.05rem;
    color: rgba(255,255,255,0.3);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
`;

export const StatValue = styled.div`
    font-size: 2.6rem;
    font-weight: 900;
    color: #fff;
    line-height: 1;
    letter-spacing: -1px;
`;

export const StatSub = styled.div`
    font-size: 1.05rem;
    color: rgba(255,255,255,0.2);
`;

export const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const ChartBox = styled.div`
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px;
    padding: 20px;
`;

export const ChartLabel = styled.div`
    font-size: 1.05rem;
    color: rgba(255,255,255,0.3);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 16px;
`;

export const BarRow = styled.div`
    margin-bottom: 14px;
    &:last-child { margin-bottom: 0; }
`;

export const BarMeta = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    color: rgba(255,255,255,0.7);
    font-weight: 500;
    margin-bottom: 6px;
`;

export const BarTrack = styled.div`
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.05);
    border-radius: 3px;
    overflow: hidden;
`;

export const BarFill = styled.div<{ $width: number; $color: string; $delay?: number }>`
    height: 100%;
    width: ${p => p.$width}%;
    background: ${p => p.$color};
    border-radius: 3px;
    animation: ${p => css`${growBar}`} 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${p => p.$delay ?? 0}ms both;
`;

/* ─── 사이드바 ──────────────────────────────────────────────────────────── */
export const Sidebar = styled.aside`
    position: sticky;
    top: 80px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: ${fadeIn} 0.5s ease 0.15s both;

    @media (max-width: 900px) { position: static; }
`;

export const ProfileCard = styled.div`
    background: #111111;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 28px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
`;

export const ProfileAvatarWrap = styled.div`
    position: relative;
    margin-bottom: 4px;
`;

export const ProfileAvatar = styled.div<{ $url?: string | null }>`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #1e1e1e ${p => p.$url ? `url("${p.$url}")` : ''} center / cover no-repeat;
    border: 2px solid rgba(229,9,20,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444;
`;

export const ProfileName = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: #f0f0f0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const ProfileMeta = styled.div`
    font-size: 1.1rem;
    color: rgba(255,255,255,0.25);
`;

export const ProfileStatRow = styled.div`
    display: flex;
    width: 100%;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding-top: 16px;
    margin-top: 6px;
    gap: 0;
`;

export const ProfileStat = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    & + & { border-left: 1px solid rgba(255,255,255,0.05); }
`;

export const ProfileStatNum = styled.div`
    font-size: 1.9rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.5px;
`;

export const ProfileStatLabel = styled.div`
    font-size: 1rem;
    color: rgba(255,255,255,0.25);
    text-transform: uppercase;
    letter-spacing: 0.06em;
`;

export const RecentPanel = styled.div`
    background: #111111;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
`;

export const RecentPanelHeader = styled.div`
    padding: 16px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 700;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const RecentList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RecentItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    transition: background 0.2s ease;

    &:last-child { border-bottom: none; }
    &:hover { background: rgba(255,255,255,0.04); }
`;

export const RecentRank = styled.div`
    font-size: 1.1rem;
    font-weight: 700;
    color: rgba(255,255,255,0.15);
    width: 16px;
    text-align: center;
    flex-shrink: 0;
`;

export const RecentPoster = styled.div<{ $url?: string | null }>`
    flex-shrink: 0;
    width: 38px;
    aspect-ratio: 2 / 3;
    border-radius: 5px;
    background: #1a1a1a ${p => p.$url ? `url("${p.$url}")` : ''} center / cover no-repeat;
`;

export const RecentInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

export const RecentTitle = styled.div.attrs({ className: 'recent-title' })`
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
    transition: color 0.2s ease;

    ${RecentItem}:hover & { color: #fff; }
`;

export const RecentMeta = styled.div`
    font-size: 1rem;
    color: rgba(255,255,255,0.2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const RecentBadge = styled.div<{ $color?: string }>`
    flex-shrink: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${p => p.$color || '#E50914'};
    opacity: 0.5;
`;