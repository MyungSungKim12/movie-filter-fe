"use client";

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";
import Header from '../main/components/header';
import { Heart, Clock, ArrowLeft, BarChart3, Film, Star } from 'lucide-react'; // Star 아이콘 추가
import useSupabaseBrowser from "../supabase/supabase-browser";
import { getMypageWishlistQuery } from "../queries/getMypageQuery";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MyPage = () => {
  const supabase = useSupabaseBrowser();
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const userId = typeof window !== 'undefined' 
  //   ? (localStorage.getItem('ui_id') || localStorage.getItem('user_id')) 
  //   : null;
  // 테스트
  const userId = "1";
  const { data: wishlist, isLoading } = useQuery(
    //getMypageWishlistQuery(supabase, userId || ""),
    getMypageWishlistQuery(supabase, userId),
    {
      //enabled: !!userId && isMounted,
      enabled: isMounted,
    }
  );

  if (!isMounted) {
    return null; // 혹은 로딩 바
  }

  // 임시 통계 데이터 (추후 로직 연결 가능)
  const stats = {
    emotions: [
      { label: '감동적인', value: 80, color: '#ff4d4d' },
      { label: '즐거운', value: 65, color: '#ff9f43' },
      { label: '심오한', value: 45, color: '#6366f1' },
    ],
    genres: [
      { label: 'SF', value: 90, color: '#43e97b' },
      { label: '액션', value: 70, color: '#00d2ff' },
      { label: '스릴러', value: 50, color: '#a855f7' },
    ]
  };

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        {!selectedMovie ? (
          <DashboardLayout>
            {/* 왼쪽 영역: 찜 목록 + 통계 */}
            <LeftContainer>
              <Section>
                <SectionTitle>
                  <Heart size={20} fill="#ff4d4d" color="#ff4d4d" />
                  찜한 영화 ({wishlist?.length || 0})
                </SectionTitle>
                <WishlistGrid>
                  {isLoading ? (
                    [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
                  ) : wishlist && wishlist.length > 0 ? (
                    wishlist.slice(0, 10).map((movie: any) => (
                      <MovieCard key={movie.mi_id} onClick={() => setSelectedMovie(movie)}>
                        {/* mp_poster 필드 사용 */}
                        <Poster $url={movie.mp_poster ? `${TMDB_IMAGE_BASE}${movie.mp_poster}` : null}>
                          {!movie.mp_poster && <Film size={30} color="#333" />}
                        </Poster>
                        <TitleOverlay>{movie.mi_title}</TitleOverlay>
                      </MovieCard>
                    ))
                  ) : (
                    <EmptyBox>찜한 영화가 없습니다.</EmptyBox>
                  )}
                </WishlistGrid>
              </Section>

              <Section>
                <SectionTitle><BarChart3 size={20} color="#6366f1" /> 나의 영화 취향 통계</SectionTitle>
                <ChartFlex>
                  <ChartBox>
                    <ChartTitle>주요 감정 키워드</ChartTitle>
                    {stats.emotions.map(item => (
                      <BarWrapper key={item.label}>
                        <BarLabel><span>{item.label}</span><span>{item.value}%</span></BarLabel>
                        <BarBase><BarFill $width={item.value} $color={item.color} /></BarBase>
                      </BarWrapper>
                    ))}
                  </ChartBox>
                  <ChartBox>
                    <ChartTitle>선호 장르 비중</ChartTitle>
                    {stats.genres.map(item => (
                      <BarWrapper key={item.label}>
                        <BarLabel><span>{item.label}</span><span>{item.value}%</span></BarLabel>
                        <BarBase><BarFill $width={item.value} $color={item.color} /></BarBase>
                      </BarWrapper>
                    ))}
                  </ChartBox>
                </ChartFlex>
              </Section>
            </LeftContainer>

            {/* 오른쪽 영역: 최근 본 영화 (찜 목록 데이터 재활용) */}
            <RightContainer>
              <SectionTitle><Clock size={18} color="#aaa" /> 최근 찜한 리스트</SectionTitle>
              <RecentGrid>
                {wishlist?.slice(0, 6).map((movie: any) => (
                  <RecentItem key={movie.mi_id} onClick={() => setSelectedMovie(movie)}>
                    <RecentPoster $url={movie.mp_poster ? `${TMDB_IMAGE_BASE}${movie.mp_poster}` : null} />
                    <RecentTitle>{movie.mi_title}</RecentTitle>
                  </RecentItem>
                ))}
              </RecentGrid>
            </RightContainer>
          </DashboardLayout>
        ) : (
          <DetailView movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </MainContent>
    </PageWrapper>
  );
};

/* --- 상세 페이지 (DetailView) --- */
const DetailView = ({ movie, onClose }: any) => (
  <DetailWrapper>
    <BackButton onClick={onClose}><ArrowLeft size={18} /> 목록으로 돌아가기</BackButton>
    <DetailFlexContainer>
      <DetailPoster $url={movie.mp_poster ? `${TMDB_IMAGE_BASE}${movie.mp_poster}` : null}>
        {!movie.mp_poster && <Film size={100} color="#333" />}
      </DetailPoster>
      <DetailInfo>
        <div className="title-section">
          <h1>{movie.mi_title}</h1>
          <MetaInfo>
            <span>{movie.mi_release_date}년 개봉</span>
            {movie.is_wishlist && <Heart size={20} fill="#ff4d4d" color="#ff4d4d" />}
          </MetaInfo>
        </div>
        <div className="overview">
          <h4>줄거리</h4>
          <p>{movie.mi_summary || "상세 정보가 없습니다."}</p>
        </div>
      </DetailInfo>
    </DetailFlexContainer>
  </DetailWrapper>
);

/* --- Styled Components (기존 유지 및 일부 추가) --- */

const EmptyBox = styled.div`
  grid-column: span 5;
  padding: 50px;
  text-align: center;
  color: #555;
  border: 1px dashed #333;
  border-radius: 12px;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  color: #888;
`;

const DetailFlexContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div` background-color: #0d0d0d; min-height: 100vh; color: white; `;
const MainContent = styled.main` padding: 120px 40px 40px; max-width: 1400px; margin: 0 auto; `;
const DashboardLayout = styled.div` display: grid; grid-template-columns: 1fr 300px; gap: 40px; `;
const LeftContainer = styled.div` display: flex; flex-direction: column; gap: 50px; `;
const RightContainer = styled.div` background: #161616; padding: 25px; border-radius: 20px; height: fit-content; border: 1px solid #222; `;
const Section = styled.section``;
const SectionTitle = styled.h3` display: flex; align-items: center; gap: 10px; font-size: 18px; margin-bottom: 25px; font-weight: 700; `;
const WishlistGrid = styled.div` display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; `;
const MovieCard = styled.div` position: relative; aspect-ratio: 2/3; border-radius: 12px; overflow: hidden; cursor: pointer; transition: 0.3s; background: #1a1a1a; &:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.5); } `;
const Poster = styled.div<{ $url?: string | null }>` width: 100%; height: 100%; background: #222 url("${props => props.$url}") center/cover no-repeat; display: flex; align-items: center; justify-content: center; `;
const TitleOverlay = styled.div` position: absolute; bottom: 0; width: 100%; padding: 20px 10px 10px; background: linear-gradient(transparent, rgba(0,0,0,0.95)); font-size: 13px; font-weight: 600; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; `;
const ChartFlex = styled.div` display: flex; gap: 20px; `;
const ChartBox = styled.div` flex: 1; background: #161616; padding: 25px; border-radius: 20px; border: 1px solid #222; `;
const ChartTitle = styled.h4` font-size: 14px; color: #6366f1; margin-bottom: 20px; font-weight: 700; `;
const BarWrapper = styled.div` margin-bottom: 15px; `;
const BarLabel = styled.div` display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; color: #ccc; `;
const BarBase = styled.div` width: 100%; height: 6px; background: #222; border-radius: 3px; overflow: hidden; `;
const BarFill = styled.div<{ $width: number; $color: string }>` width: ${props => props.$width}%; height: 100%; background: ${props => props.$color}; border-radius: 3px; transition: width 1s ease-in-out; `;
const RecentGrid = styled.div` display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; `;
const RecentItem = styled.div` cursor: pointer; transition: 0.2s; &:hover { opacity: 0.8; } `;
const RecentPoster = styled.div<{ $url?: string | null }>` aspect-ratio: 2/3; background: #222 url("${props => props.$url}") center/cover no-repeat; border-radius: 6px; margin-bottom: 6px; `;
const RecentTitle = styled.div` font-size: 11px; color: #aaa; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; `;
const DetailWrapper = styled.div` animation: ${fadeIn} 0.4s ease; `;
const BackButton = styled.button` background: #1a1a1a; border: 1px solid #333; color: #fff; padding: 8px 16px; border-radius: 30px; cursor: pointer; margin-bottom: 25px; display: flex; align-items: center; gap: 8px; font-size: 14px; &:hover { background: #333; } `;
const DetailPoster = styled.div<{ $url?: string | null }>` flex-shrink: 0; width: 300px; height: 450px; background: #1a1a1a url("${props => props.$url}") center/cover no-repeat; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; `;
const DetailInfo = styled.div` flex: 1; h1 { font-size: 42px; font-weight: 800; margin: 0 0 10px 0; } .overview { background: #161616; padding: 30px; border-radius: 20px; border: 1px solid #222; h4 { color: #6366f1; font-size: 18px; margin-bottom: 15px; font-weight: 700; } p { font-size: 16px; line-height: 1.8; color: #ddd; margin: 0; } } `;
const SkeletonCard = styled.div` aspect-ratio: 2/3; background: #1a1a1a; border-radius: 12px; animation: pulse 1.5s infinite ease-in-out; @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 0.3; } 100% { opacity: 0.6; } } `;

export default MyPage;