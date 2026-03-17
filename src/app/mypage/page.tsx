"use client";

import React, { useState, useEffect } from 'react';
import * as Style from "./page.style";
import Header from '../main/components/header';
import { Heart, Clock, BarChart3, Film } from 'lucide-react';
import useSupabaseBrowser from "../supabase/supabase-browser";
import { getMypageWishlistQuery } from "../queries/getMypageQuery";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import axios from "axios";

import Modal from "../movie/components/modal"; 
import Wishlist from "../movie/components/wishlist";

const MyPage = () => {
  const supabase = useSupabaseBrowser();
  const [modalData, setModalData] = useState<any>(null); 
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : "1";
  
const { data: wishlist, error, isLoading } = useQuery(
  getMypageWishlistQuery(supabase, "1"), // 테스트를 위해 "1" 전달
  { 
    enabled: isMounted,
    retry: false 
  }
);
// 에러확인용
//if (error) console.error("RPC Error 상세:", error);

  const handleMovieClick = (movie: any) => {
  console.log("새 쿼리로 가져온 데이터:", movie); 
  
  const formattedData = {
    ...movie,
    mi_genre: movie.mi_genre || "",
    mi_provider: movie.mi_provider || "NONE"
  };

  setModalData(formattedData);
};

  if (!isMounted) return null;

  // 통계 데이터
  const stats = {
    emotions: [
      { label: '감동적인', value: 80, color: '#E50914' },
      { label: '즐거운', value: 65, color: '#f5f5f1' },
      { label: '심오한', value: 45, color: '#545454' },
    ],
    genres: [
      { label: 'SF', value: 90, color: '#E50914' },
      { label: '액션', value: 70, color: '#f5f5f1' },
      { label: '스릴러', value: 50, color: '#545454' },
    ]
  };

  return (
    <Style.PageWrapper>
      <Header />
      <Style.MainContent>
        <Style.DashboardLayout>
          <Style.LeftContainer>
            <Style.Section>
              <Style.SectionTitle>
                <Heart size={22} fill="#E50914" color="#E50914" />
                내가 찜한 콘텐츠 ({wishlist?.length || 0})
              </Style.SectionTitle>
              
              <Style.WishlistGrid>
                {isLoading ? (
                  [...Array(10)].map((_, i) => <Style.SkeletonCard key={i} />)
                ) : wishlist && wishlist.length > 0 ? (
                  wishlist.map((movie: any) => (
                    <Style.MovieCard key={movie.mi_id} onClick={() => handleMovieClick(movie)}>
                      <Wishlist is_wishlist={true} mi_id={movie.mi_id} type="L" />
                      
                      <Style.Poster $url={movie.mp_poster ? `https://image.tmdb.org/t/p/w500${movie.mp_poster}` : null}>
                        {!movie.mp_poster && <Film size={30} color="#333" />}
                      </Style.Poster>
                      <Style.CardEffect />
                      <Style.TitleOverlay>{movie.mi_title}</Style.TitleOverlay>
                    </Style.MovieCard>
                  ))
                ) : (
                  <Style.EmptyBox>찜한 영화가 없습니다.</Style.EmptyBox>
                )}
              </Style.WishlistGrid>
            </Style.Section>

            {/* 통계 섹션 (기존 유지) */}
            <Style.Section>
              <Style.SectionTitle><BarChart3 size={22} color="#E50914" /> 나의 영화 취향 리포트</Style.SectionTitle>
              <Style.ChartFlex>
                <Style.ChartBox>
                  <Style.ChartTitle>주요 감정 키워드</Style.ChartTitle>
                  {stats.emotions.map(item => (
                    <Style.BarWrapper key={item.label}>
                      <Style.BarLabel><span>{item.label}</span><span>{item.value}%</span></Style.BarLabel>
                      <Style.BarBase><Style.BarFill $width={item.value} $color={item.color} /></Style.BarBase>
                    </Style.BarWrapper>
                  ))}
                </Style.ChartBox>
                <Style.ChartBox>
                  <Style.ChartTitle>선호 장르 비중</Style.ChartTitle>
                  {stats.genres.map(item => (
                    <Style.BarWrapper key={item.label}>
                      <Style.BarLabel><span>{item.label}</span><span>{item.value}%</span></Style.BarLabel>
                      <Style.BarBase><Style.BarFill $width={item.value} $color={item.color} /></Style.BarBase>
                    </Style.BarWrapper>
                  ))}
                </Style.ChartBox>
              </Style.ChartFlex>
            </Style.Section>
          </Style.LeftContainer>

          <Style.RightContainer>
            <Style.SectionTitle><Clock size={18} color="#aaa" /> 최근 본 콘텐츠</Style.SectionTitle>
            <Style.RecentGrid>
              {wishlist?.slice(0, 6).map((movie: any) => (
                <Style.RecentItem key={movie.mi_id} onClick={() => handleMovieClick(movie)}>
                  <Style.RecentPoster $url={movie.mp_poster ? `https://image.tmdb.org/t/p/w500${movie.mp_poster}` : null} />
                  <Style.RecentTitle>{movie.mi_title}</Style.RecentTitle>
                </Style.RecentItem>
              ))}
            </Style.RecentGrid>
          </Style.RightContainer>
        </Style.DashboardLayout>

        {modalData && (
          <Modal 
            data={modalData} 
            onClose={() => setModalData(null)} 
          />
        )}
      </Style.MainContent>
    </Style.PageWrapper>
  );
};

export default MyPage;