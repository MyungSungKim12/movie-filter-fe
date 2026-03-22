import styled, { keyframes, css } from "styled-components";

/* ─── 애니메이션 ──────────────────────────────────────────────────────────────*/
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
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

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

const growBar = keyframes`
  from { width: 0%; }
  to   { width: 100%; }
`;

const countUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── 메인 레이아웃 ───────────────────────────────────────────────────────────*/
export const PageWrapper = styled.div`
  background-color: #080810;
  min-height: 100vh;
  color: #ffffff;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  /* 배경에 미세한 그레인 텍스처 */
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }
`;

export const MainContent = styled.main`
  position: relative;
  z-index: 1;
  padding: 80px 40px 80px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 1200px) { padding: 80px 28px 60px; }
  @media (max-width: 768px)  { padding: 70px 16px 50px; }
`;

/* 전체 그리드: 메인 콘텐츠 | 우측 사이드바 */
export const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  align-items: start;

  @media (max-width: 1100px) { grid-template-columns: 1fr 260px; gap: 24px; }
  @media (max-width: 900px)  { grid-template-columns: 1fr; }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  min-width: 0;
`;

/* ─── 섹션 타이틀 ─────────────────────────────────────────────────────────────*/
export const Section = styled.section<{ $delay?: number }>`
  animation: ${fadeInUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: ${p => (p.$delay ?? 0)}ms;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #f0f0f0;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const SectionCount = styled.span`
  font-size: 12px;
  color: #444;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
`;

/* ─── 찜목록 캐러셀 ───────────────────────────────────────────────────────────*/
export const CarouselOuter = styled.div`
  position: relative;
  width: 100%;
`;

export const CarouselBtn = styled.button<{ $dir: 'left' | 'right'; $visible: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${p => p.$dir === 'left' ? 'left: -18px;' : 'right: -18px;'}
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 10, 18, 0.92);
  backdrop-filter: blur(10px);
  color: #fff;
  cursor: pointer;
  opacity: ${p => (p.$visible ? 1 : 0)};
  pointer-events: ${p => (p.$visible ? 'auto' : 'none')};
  transition: opacity 0.2s, background 0.2s, transform 0.2s, border-color 0.2s;

  &:hover {
    background: #E50914;
    border-color: #E50914;
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 32px; height: 32px;
    ${p => p.$dir === 'left' ? 'left: -12px;' : 'right: -12px;'}
  }
`;

export const CarouselViewport = styled.div<{ $peek: boolean }>`
  overflow: hidden;
  border-radius: 12px;
  -webkit-mask-image: ${p => p.$peek
    ? 'linear-gradient(to right, black 87%, transparent 100%)'
    : 'none'};
  mask-image: ${p => p.$peek
    ? 'linear-gradient(to right, black 87%, transparent 100%)'
    : 'none'};
`;

export const CarouselTrack = styled.div<{ $offset: number }>`
  display: flex;
  gap: 12px;
  transform: translateX(${p => p.$offset}px);
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
`;

/* 개별 카드 */
export const MovieCard = styled.div`
  position: relative;
  flex: 0 0 130px;
  aspect-ratio: 2 / 3;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #111;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s ease;

  @media (max-width: 1100px) { flex: 0 0 112px; }
  @media (max-width: 768px)  { flex: 0 0 96px; }

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.08);
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
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(0, 0, 0, 0.92) 100%
  );
  z-index: 1;
`;

export const CardTitle = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 12px 8px 8px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
`;

/* 도트 */
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
  background: ${p => p.$active ? '#E50914' : 'rgba(255,255,255,0.15)'};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { background: ${p => p.$active ? '#E50914' : 'rgba(255,255,255,0.35)'}; }
`;

export const EmptyBox = styled.div`
  padding: 60px 0;
  text-align: center;
  color: #333;
  font-size: 14px;
  border: 1px dashed #1e1e1e;
  border-radius: 12px;
`;

export const SkeletonCard = styled.div`
  flex: 0 0 130px;
  aspect-ratio: 2 / 3;
  border-radius: 10px;
  background: linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s infinite;
  @media (max-width: 1100px) { flex: 0 0 112px; }
  @media (max-width: 768px)  { flex: 0 0 96px; }
`;

/* ─── 통계 섹션 ───────────────────────────────────────────────────────────────*/

/* 상단 숫자 요약 카드 3개 */
export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

export const StatCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: background 0.2s ease, border-color 0.2s ease;
  animation: ${countUp} 0.6s ease both;

  &:hover {
    background: rgba(255,255,255,0.055);
    border-color: rgba(255,255,255,0.12);
  }
`;

export const StatLabel = styled.div`
  font-size: 11px;
  color: #555;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #f0f0f0;
  line-height: 1;
`;

export const StatSub = styled.div`
  font-size: 11px;
  color: #444;
`;

/* 바 차트 영역 */
export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

export const ChartBox = styled.div`
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 24px;
`;

export const ChartLabel = styled.div`
  font-size: 11px;
  color: #555;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
`;

export const BarRow = styled.div`
  margin-bottom: 16px;
  &:last-child { margin-bottom: 0; }
`;

export const BarMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #bbb;
  font-weight: 500;
  margin-bottom: 7px;
`;

export const BarTrack = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.06);
  border-radius: 4px;
  overflow: hidden;
`;

export const BarFill = styled.div<{ $width: number; $color: string; $delay?: number }>`
  height: 100%;
  width: ${p => p.$width}%;
  background: ${p => p.$color};
  border-radius: 4px;
  box-shadow: 0 0 8px ${p => p.$color}66;
  animation: ${p => css`${growBar}`} 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${p => p.$delay ?? 0}ms both;
`;

/* ─── 우측 사이드바 ───────────────────────────────────────────────────────────*/
export const Sidebar = styled.aside`
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeIn} 0.5s ease 0.2s both;

  @media (max-width: 900px) { position: static; }
`;

/* 프로필 카드 */
export const ProfileCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

export const ProfileAvatar = styled.div<{ $url?: string | null }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #1a1a1a ${p => p.$url ? `url("${p.$url}")` : ''} center / cover no-repeat;
  border: 2px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 24px;
`;

export const ProfileName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #f0f0f0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProfileMeta = styled.div`
  font-size: 11px;
  color: #444;
`;

export const ProfileStatRow = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 14px;
  margin-top: 2px;
`;

export const ProfileStat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  
  & + & {
    border-left: 1px solid rgba(255,255,255,0.05);
  }
`;

export const ProfileStatNum = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #f0f0f0;
`;

export const ProfileStatLabel = styled.div`
  font-size: 10px;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

/* 최근 본 콘텐츠 패널 */
export const RecentPanel = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  overflow: hidden;
`;

export const RecentPanelHeader = styled.div`
  padding: 16px 18px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #666;
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
  padding: 11px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid rgba(255,255,255,0.03);

  &:last-child { border-bottom: none; }

  &:hover {
    background: rgba(255,255,255,0.04);
    .recent-title { color: #fff; }
  }
`;

export const RecentRank = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #2a2a2a;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
`;

export const RecentPoster = styled.div<{ $url?: string | null }>`
  flex-shrink: 0;
  width: 40px;
  aspect-ratio: 2 / 3;
  border-radius: 5px;
  background: #1a1a1a ${p => p.$url ? `url("${p.$url}")` : ''} center / cover no-repeat;
`;

export const RecentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RecentTitle = styled.div.attrs({ className: 'recent-title' })`
  font-size: 12px;
  font-weight: 600;
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
  margin-bottom: 3px;
`;

export const RecentMeta = styled.div`
  font-size: 10px;
  color: #3a3a3a;
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
  opacity: 0.6;
`;
