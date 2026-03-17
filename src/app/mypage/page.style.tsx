import styled, { keyframes } from "styled-components";

/* --- 애니메이션 --- */
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

/* --- 메인 레이아웃 --- */
export const PageWrapper = styled.div`
  background-color: #0d0d12; /* 팀원 소스 배경색과 통일 */
  min-height: 100vh;
  color: #ffffff;
  font-family: 'Pretendard', -apple-system, sans-serif;
`;

export const MainContent = styled.main`
  padding: 120px 4% 60px; /* 헤더 높이 고려 */
  max-width: 1400px;
  margin: 0 auto;
`;

export const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 50px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export const RightContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 30px 20px;
  border-radius: 12px;
  height: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

/* --- 섹션 공통 --- */
export const Section = styled.section`
  animation: ${fadeInUp} 0.6s cubic-bezier(0.2, 0, 0.2, 1) forwards;
`;

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  margin-bottom: 30px;
  font-weight: 700;
  color: #f5f5f7;
  
  span {
    color: #E50914; /* 강조 컬러 */
  }
`;

/* --- 위시리스트 그리드 --- */
export const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
`;

export const MovieCard = styled.div`
  position: relative; /* Wishlist 버튼 배치를 위해 필수 */
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  background-color: #1a1a1a;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
`;

export const Poster = styled.div<{ $url?: string | null }>`
  width: 100%;
  height: 100%;
  background-image: ${props => props.$url ? `url("${props.$url}")` : 'none'};
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;

  ${MovieCard}:hover & {
    transform: scale(1.1);
  }
`;

export const CardEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 1;
`;

export const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px 12px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  z-index: 2;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
`;

/* --- 차트 & 통계 --- */
export const ChartFlex = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 768px) { flex-direction: column; }
`;

export const ChartBox = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  padding: 35px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const ChartTitle = styled.h4`
  font-size: 15px;
  color: #9ca3af;
  margin-bottom: 30px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const BarWrapper = styled.div` margin-bottom: 25px; `;
export const BarLabel = styled.div` 
  display: flex; 
  justify-content: space-between; 
  font-size: 14px; 
  margin-bottom: 12px; 
  color: #d1d5db; 
  font-weight: 500;
`;
export const BarBase = styled.div` 
  width: 100%; 
  height: 6px; 
  background: rgba(255, 255, 255, 0.1); 
  border-radius: 10px; 
  overflow: hidden; 
`;
export const BarFill = styled.div<{ $width: number; $color: string }>`
  width: ${props => props.$width}%;
  height: 100%;
  background: ${props => props.$color};
  border-radius: 10px;
  box-shadow: 0 0 10px ${props => props.$color}44;
  transition: width 1.5s cubic-bezier(0.1, 0, 0, 1);
`;

/* --- 시청 기록 (우측 섹션) --- */
export const RecentGrid = styled.div` 
  display: flex;
  flex-direction: column;
  gap: 15px; 
`;

export const RecentItem = styled.div` 
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover { 
    background: rgba(255, 255, 255, 0.05);
  } 
`;

export const RecentPoster = styled.div<{ $url?: string | null }>`
  width: 60px;
  aspect-ratio: 2/3;
  background: #2f2f2f ${props => props.$url ? `url("${props.$url}")` : ''} center/cover no-repeat;
  border-radius: 4px;
  flex-shrink: 0;
`;

export const RecentTitle = styled.div` 
  font-size: 14px; 
  color: #e5e7eb; 
  font-weight: 500;
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
`;

export const SkeletonCard = styled.div` 
  aspect-ratio: 2/3; 
  background: linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  border-radius: 8px; 
  animation: loading 1.5s infinite;
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export const EmptyBox = styled.div` 
  grid-column: 1 / -1; 
  padding: 80px; 
  text-align: center; 
  color: #4b5563; 
  background: rgba(255, 255, 255, 0.02); 
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  font-size: 16px;
`;