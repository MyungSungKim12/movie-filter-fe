"use client";

import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { 
  Camera, Heart, Youtube, MessageCircle, Star, X, Home, 
  Search, Film, User, PieChart, TrendingUp, Clock, Settings, LogOut, ChevronRight, ArrowLeft 
} from 'lucide-react';

const MyPage = () => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const favoriteMovies = [
    { id: 1, title: "인셉션", rating: 8.8, date: "2010", color: "#4facfe", overview: "타인의 꿈에 접속해 생각을 심는 거대한 작전..." },
    { id: 2, title: "라라랜드", rating: 8.5, date: "2016", color: "#f093fb", overview: "꿈을 꾸는 사람들을 위한 별들의 도시 라라랜드..." },
    { id: 3, title: "엘리멘탈", rating: 7.7, date: "2023", color: "#43e97b", overview: "불, 물, 공기, 흙 4원소가 살고 있는 엘리멘트 시티..." },
    { id: 4, title: "어바웃 타임", rating: 9.1, date: "2013", color: "#fa709a", overview: "시간을 되돌릴 수 있는 능력을 가진 가문의 이야기..." },
    { id: 5, title: "기생충", rating: 8.6, date: "2019", color: "#667eea", overview: "전원백수로 살 길 막막한 기택 가족의 이야기..." },
  ];

  return (
    <MainLayout>
      <SidebarNav>
        <Logo>MovieFilter</Logo>
        <NavGroup>
          <NavItem><Home size={20} /> 홈</NavItem>
          <NavItem><Search size={20} /> 영화 추천</NavItem>
          <NavItem $active={true}><User size={20} /> 마이페이지</NavItem>
          <NavItem><Film size={20} /> 보관함</NavItem>
        </NavGroup>
        <BottomNavGroup>
          <NavItem><Settings size={20} /> 설정</NavItem>
          <NavItem><LogOut size={20} /> 로그아웃</NavItem>
        </BottomNavGroup>
      </SidebarNav>

      <ContentArea>
        {!selectedMovie ? (
          <>
            <HeaderSection>
              <ProfileBox>
                <div style={{ position: 'relative' }}>
                  <ProfileCircle>M</ProfileCircle>
                  <CameraButton onClick={() => fileInputRef.current?.click()}><Camera size={14} /></CameraButton>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <UserName>김명성님</UserName>
                  <UserBadge>VVIP 시네필</UserBadge>
                </div>
              </ProfileBox>
            </HeaderSection>

            <DashboardGrid>
              <MainSection>
                <SectionHeader>
                  <SectionTitle><Heart size={20} fill="#ff4d4d" color="#ff4d4d" /> 찜한 영화 (5)</SectionTitle>
                </SectionHeader>
                <MovieCardContainer>
                  {favoriteMovies.map(movie => (
                    <ColorMovieCard key={movie.id} $bgColor={movie.color} onClick={() => setSelectedMovie(movie)}>
                      <CardIcon><Film size={32} opacity={0.3} /></CardIcon>
                      <CardInfo>
                        <CardTitle>{movie.title}</CardTitle>
                        <CardMeta>{movie.date} · ⭐{movie.rating}</CardMeta>
                      </CardInfo>
                    </ColorMovieCard>
                  ))}
                </MovieCardContainer>
              </MainSection>

              <StatsSection>
                <SectionTitle><PieChart size={20} color="#6366f1" /> 취향 분석</SectionTitle>
                <PreferenceCard>
                  <GenreTag>#로맨스</GenreTag>
                  <GenreTag>#SF</GenreTag>
                  <TimeText>24시간 감상</TimeText>
                </PreferenceCard>
              </StatsSection>

              <BottomSection>
                <SectionTitle><Clock size={20} color="#ff9f43" /> 최근 시청 기록</SectionTitle>
                <RecentHistoryList>
                  {[1, 2, 3].map(i => (
                    <HistoryItem key={i}>
                      <HistoryThumb />
                      <HistoryInfo>
                        <p className="title">최근 본 영화 제목 {i}</p>
                        <p className="time">2시간 전 시청함</p>
                      </HistoryInfo>
                    </HistoryItem>
                  ))}
                </RecentHistoryList>
              </BottomSection>

              <BottomSection>
                <SectionTitle><TrendingUp size={20} color="#43e97b" /> 나의 활동 리포트</SectionTitle>
                <ReportGrid>
                  <ReportBox><span>리뷰</span><strong>12</strong></ReportBox>
                  <ReportBox><span>평점</span><strong>48</strong></ReportBox>
                </ReportGrid>
              </BottomSection>
            </DashboardGrid>
          </>
        ) : (
          <DetailView selectedMovie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </ContentArea>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </MainLayout>
  );
};

// --- 상세 페이지 컴포넌트 ---
const DetailView = ({ selectedMovie, onClose }: any) => {
  const [viewMore, setViewMore] = useState<string | null>(null); // 'youtube' | 'naver' | null

  return (
    <DetailWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <CloseButton onClick={onClose}><ArrowLeft size={20} /> 목록으로 돌아가기</CloseButton>
        {viewMore && (
           <CloseButton onClick={() => setViewMore(null)}><X size={20} /> 닫기</CloseButton>
        )}
      </div>

      <DetailFlex>
        {!viewMore && (
          <DetailMain>
            <BigPosterCard $bgColor={selectedMovie.color}>
              <Film size={80} opacity={0.2} />
            </BigPosterCard>
            <DetailTextContent>
              <DetailTitle>{selectedMovie.title}</DetailTitle>
              <DetailRating><Star size={20} fill="gold" color="gold" /> {selectedMovie.rating}</DetailRating>
              <DetailOverviewTitle>줄거리</DetailOverviewTitle>
              <DetailOverviewText>{selectedMovie.overview}</DetailOverviewText>
            </DetailTextContent>
          </DetailMain>
        )}

        <DetailSidebar $fullWidth={!!viewMore}>
          <SidebarInner>
            {(!viewMore || viewMore === 'youtube') && (
              <section style={{ marginBottom: '30px' }}>
                <SidebarHeader>
                  <SidebarTitle><Youtube size={18} color="red" /> 유튜브 관련 영상</SidebarTitle>
                  {!viewMore && <MoreBtn onClick={() => setViewMore('youtube')}>더보기 <ChevronRight size={14}/></MoreBtn>}
                </SidebarHeader>
                <VideoGrid $expanded={viewMore === 'youtube'}>
                   <SidebarPlaceholder>영상 1</SidebarPlaceholder>
                   <SidebarPlaceholder>영상 2</SidebarPlaceholder>
                   {viewMore === 'youtube' && (
                     <>
                       <SidebarPlaceholder>영상 3</SidebarPlaceholder>
                       <SidebarPlaceholder>영상 4</SidebarPlaceholder>
                     </>
                   )}
                </VideoGrid>
              </section>
            )}

            {(!viewMore || viewMore === 'naver') && (
              <section>
                <SidebarHeader>
                  <SidebarTitle><MessageCircle size={18} color="#03C75A" /> 네이버 평점/리뷰</SidebarTitle>
                  {!viewMore && <MoreBtn onClick={() => setViewMore('naver')}>더보기 <ChevronRight size={14}/></MoreBtn>}
                </SidebarHeader>
                <ReviewGrid $expanded={viewMore === 'naver'}>
                   <DetailReviewBox>명성님 취향 저격 영화네요!</DetailReviewBox>
                   <DetailReviewBox>다시 봐도 여운이 남는 작품입니다.</DetailReviewBox>
                   {viewMore === 'naver' && (
                     <>
                       <DetailReviewBox>배우들의 연기력이 미쳤습니다.</DetailReviewBox>
                       <DetailReviewBox>네이버에서 가장 핫한 리뷰 내용입니다.</DetailReviewBox>
                       <DetailReviewBox>주말에 보기 딱 좋은 영화네요.</DetailReviewBox>
                     </>
                   )}
                </ReviewGrid>
              </section>
            )}
          </SidebarInner>
        </DetailSidebar>
      </DetailFlex>
    </DetailWrapper>
  );
};

// --- Styled Components

const MainLayout = styled.div` display: flex; min-height: 100vh; background-color: #0d0d0d; color: #fff; `;
const SidebarNav = styled.nav` width: 240px; background-color: #1a1a1a; padding: 30px 20px; display: flex; flex-direction: column; position: fixed; height: 100vh; `;
const NavGroup = styled.div` display: flex; flex-direction: column; gap: 8px; margin-top: 10px; `;
const BottomNavGroup = styled.div` margin-top: auto; padding-bottom: 20px; `;
const Logo = styled.div` font-size: 22px; font-weight: 800; color: #6366f1; margin-bottom: 40px; letter-spacing: -1px; `;
const NavItem = styled.div<{ $active?: boolean }>` display: flex; align-items: center; gap: 12px; padding: 12px 15px; border-radius: 12px; cursor: pointer; color: ${props => props.$active ? '#fff' : '#777'}; background: ${props => props.$active ? '#6366f1' : 'transparent'}; margin-bottom: 5px; &:hover { background: #252525; color: #fff; } `;
const ContentArea = styled.main` flex: 1; margin-left: 240px; padding: 40px 50px; `;
const ProfileCircle = styled.div` width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #a855f7); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; `;
const DashboardGrid = styled.div` display: grid; grid-template-columns: 2fr 1fr; gap: 25px; `;
const MovieCardContainer = styled.div` display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; `;
const ColorMovieCard = styled.div<{ $bgColor: string }>` aspect-ratio: 2/3; background: ${props => props.$bgColor}; border-radius: 15px; position: relative; cursor: pointer; transition: 0.3s; overflow: hidden; &:hover { transform: translateY(-8px); filter: brightness(1.1); } `;
const CardIcon = styled.div` position: absolute; top: 20px; left: 20px; `;
const CardInfo = styled.div` position: absolute; bottom: 0; left: 0; right: 0; padding: 15px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); `;
const CardTitle = styled.div` font-weight: bold; font-size: 14px; margin-bottom: 4px; `;
const CardMeta = styled.div` font-size: 11px; opacity: 0.8; `;
const BottomSection = styled.div` background: #1a1a1a; padding: 25px; border-radius: 20px; margin-top: 5px; `;
const RecentHistoryList = styled.div` margin-top: 15px; `;
const HistoryItem = styled.div` display: flex; align-items: center; gap: 15px; margin-bottom: 12px; padding: 10px; border-radius: 10px; &:hover { background: #252525; } `;
const HistoryThumb = styled.div` width: 50px; height: 50px; background: #333; border-radius: 8px; `;
const HistoryInfo = styled.div` .title { font-size: 14px; margin: 0; } .time { font-size: 12px; color: #555; } `;
const ReportGrid = styled.div` display: flex; gap: 15px; margin-top: 15px; `;
const ReportBox = styled.div` flex: 1; background: #252525; padding: 20px; border-radius: 15px; text-align: center; span { display: block; color: #777; font-size: 13px; } strong { font-size: 24px; color: #6366f1; } `;
const HeaderSection = styled.section` margin-bottom: 40px; `;
const ProfileBox = styled.div` display: flex; align-items: center; `;
const CameraButton = styled.button` position: absolute; bottom: 0; right: 0; background: #6366f1; border: none; border-radius: 50%; width: 28px; height: 28px; color: white; cursor: pointer; `;
const UserName = styled.h1` font-size: 28px; margin: 0; `;
const UserBadge = styled.span` background: #222; color: #6366f1; font-size: 12px; padding: 4px 10px; border-radius: 5px; margin-top: 5px; display: inline-block; `;
const MainSection = styled.div` background: #1a1a1a; padding: 25px; border-radius: 20px; `;
const SectionHeader = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; `;
const SectionTitle = styled.h3` display: flex; align-items: center; gap: 10px; margin: 0; font-size: 17px; `;
const StatsSection = styled.div` background: #1a1a1a; padding: 25px; border-radius: 20px; `;
const PreferenceCard = styled.div` background: #252525; padding: 20px; border-radius: 15px; margin-top: 15px; `;
const GenreTag = styled.span` background: #6366f133; color: #6366f1; padding: 5px 12px; border-radius: 20px; font-size: 12px; margin-right: 5px; `;
const TimeText = styled.div` font-size: 20px; font-weight: bold; margin-top: 10px; `;

const DetailWrapper = styled.div` animation: fadeIn 0.4s ease-out; `;
const CloseButton = styled.button` background: none; border: none; color: #888; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 16px; &:hover { color: #fff; } `;
const DetailFlex = styled.div` display: flex; gap: 40px; `;
const DetailMain = styled.div` flex: 1.5; display: flex; gap: 30px; animation: fadeIn 0.3s; `;
const BigPosterCard = styled.div<{ $bgColor: string }>` min-width: 300px; height: 450px; background: ${props => props.$bgColor}; border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); `;
const DetailTextContent = styled.div` flex: 1; `;
const DetailTitle = styled.h2` font-size: 40px; margin-bottom: 10px; `;
const DetailRating = styled.div` background: #1a1a1a; padding: 10px 20px; border-radius: 12px; width: fit-content; display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: bold; margin-bottom: 20px; `;
const DetailOverviewTitle = styled.h4` color: #6366f1; margin-bottom: 10px; font-size: 18px; `;
const DetailOverviewText = styled.p` line-height: 1.8; color: #ccc; font-size: 16px; `;

const DetailSidebar = styled.div<{ $fullWidth: boolean }>` 
  flex: ${props => props.$fullWidth ? '1' : '0.8'};
  transition: all 0.3s ease;
`;

const SidebarInner = styled.div` background: #1a1a1a; padding: 25px; border-radius: 20px; `;
const SidebarHeader = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; `;
const SidebarTitle = styled.h4` display: flex; align-items: center; gap: 8px; font-size: 16px; margin: 0; `;
const MoreBtn = styled.button` background: none; border: none; color: #6366f1; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 2px; &:hover { text-decoration: underline; } `;

const VideoGrid = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.$expanded ? 'repeat(2, 1fr)' : '1fr'};
  gap: 15px;
`;

const ReviewGrid = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.$expanded ? 'repeat(2, 1fr)' : '1fr'};
  gap: 10px;
`;

const SidebarPlaceholder = styled.div` height: 150px; background: #252525; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #555; font-size: 14px; border: 1px dashed #333; `;
const DetailReviewBox = styled.div` background: #252525; padding: 15px; border-radius: 12px; font-size: 14px; border-left: 4px solid #03C75A; `;

export default MyPage;