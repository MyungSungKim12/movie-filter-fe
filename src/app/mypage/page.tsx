"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as Style from "./page.style";
import Header from '../main/components/header';
import {
    Heart, Clock, BarChart3, Film,
    ChevronLeft, ChevronRight, User
} from 'lucide-react';
import useSupabaseBrowser from "../supabase/supabase-browser";
import {
    getMypageWishlistQuery,
    getMypageClickLogQuery,
    getMypagePreferenceStatsQuery,
    getProfileImageQuery,
} from "../queries/getMypageQuery";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

import Modal from "../movie/components/modal";
import Wishlist from "../movie/components/wishlist";
import Footer from '../main/components/footer';
const CARD_WIDTH = 130;
const CARD_GAP   = 12;

const GENRE_COLOR_MAP: Record<string, string> = {
    'SF':    '#10b981',
    '액션':  '#3b82f6',
    '스릴러':'#a855f7',
    '공포':  '#ef4444',
    '드라마':'#f59e0b',
    '로맨스':'#ec4899',
    '코미디':'#84cc16',
    '범죄':  '#f97316',
    '멜로':  '#ec4899',
    '미스터리':'#8b5cf6',
    '모험':  '#06b6d4',
    '애니':  '#06b6d4',
};

const EMOTION_COLOR_MAP: Record<string, string> = {
    '슬픔':  '#3b82f6',
    '분노':  '#ef4444',
    '불안':  '#f59e0b',
    '피곤':  '#8b5cf6',
    '즐거운':'#84cc16',
    '감동적인':'#E50914',
    '심오한':'#6366f1',
    '설렘':  '#ec4899',
    '무서운':'#f97316',
};

const getColor = (map: Record<string, string>, label: string) =>
    map[label] ?? '#6b7280';

// ─── Main Page ────────────────────────────────────────────────────────────────
const MyPage = () => {
    const supabase = useSupabaseBrowser();
    const [modalData, setModalData]   = useState<any>(null);
    const [isMounted, setIsMounted]   = useState(false);
    const [profileUrl, setProfileUrl] = useState<string | null>(null);
    const [userName, setUserName]     = useState<string | null>(null);
    const [userEmail, setUserEmail]   = useState('');
    const [userId, setUserId]         = useState('');

    // 캐러셀 상태
    const viewportRef                         = useRef<HTMLDivElement>(null);
    const [offset, setOffset]                 = useState(0);
    const [canPrev, setCanPrev]               = useState(false);
    const [canNext, setCanNext]               = useState(false);
    const [pageIndex, setPageIndex]           = useState(0);
    const [totalPages, setTotalPages]         = useState(1);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window === 'undefined') return;

        const uid = localStorage.getItem('user_id') ?? '';
        setUserId(uid);

        // 이미지·이름·이메일 모두 Supabase에서 직접 조회 (토큰 파싱 불필요)
        if (uid) {
            (async () => {
                try {
                    const { data, error } = await getProfileImageQuery(supabase, uid);
                    if (error || !data) return;
                    setProfileUrl(data.ui_image || null);
                    setUserName(data.ui_name || null);
                    setUserEmail(data.ui_email || '');
                } catch {
                    setProfileUrl(null);
                    setUserName(null);
                }
            })();
        }
    }, []);
    
    const enabled = isMounted && userId.length > 0;

    const { data: wishlist, isLoading: wishlistLoading } = useQuery(
        getMypageWishlistQuery(supabase, userId),
        { enabled, retry: false }
    );

    const { data: clickLogRaw, isLoading: clickLoading } = useQuery(
        getMypageClickLogQuery(supabase, userId),
        { enabled, retry: false }
    );

    const { data: statsRaw, isLoading: statsLoading } = useQuery(
        getMypagePreferenceStatsQuery(supabase, userId),
        { enabled, retry: false }
    );

    const emotionStats = useMemo(() => {
        if (!statsRaw) return [];
        const emotions = (statsRaw as any[]).filter(r => r.category === 'emotion');
        const total    = emotions.reduce((s, r) => s + Number(r.cnt), 0) || 1;
        return emotions
            .slice(0, 4)
            .map(r => ({
                label: r.label,
                value: Math.round((Number(r.cnt) / total) * 100),
                color: getColor(EMOTION_COLOR_MAP, r.label),
            }));
    }, [statsRaw]);

    const genreStats = useMemo(() => {
        if (!statsRaw) return [];
        const genres = (statsRaw as any[]).filter(r => r.category === 'genre');
        const total  = genres.reduce((s, r) => s + Number(r.cnt), 0) || 1;
        return genres
            .slice(0, 4)
            .map(r => ({
                label: r.label,
                value: Math.round((Number(r.cnt) / total) * 100),
                color: getColor(GENRE_COLOR_MAP, r.label),
            }));
    }, [statsRaw]);

    /* ── 상단 요약 통계 ───────────────────────────────────────────────────── */
    const topGenre   = genreStats[0]?.label   ?? '-';
    const topEmotion = emotionStats[0]?.label ?? '-';
    const totalCount = (wishlist as any[])?.length ?? 0;

    /* ── 클릭 로그 ────────────────────────────────────────────────────────── */
    const clickLog = (clickLogRaw as any[]) ?? [];

    /* ── 캐러셀 로직 ──────────────────────────────────────────────────────── */
    const calcPerPage = useCallback(() => {
        if (!viewportRef.current) return 1;
        const vw = viewportRef.current.clientWidth;
        return Math.max(1, Math.floor((vw + CARD_GAP) / (CARD_WIDTH + CARD_GAP)));
    }, []);

    const updateNav = useCallback((currentOffset: number, perPage: number) => {
        const maxOffset = -(Math.max(0, totalCount - perPage)) * (CARD_WIDTH + CARD_GAP);
        setCanPrev(currentOffset < 0);
        setCanNext(currentOffset > maxOffset);
        setPageIndex(Math.round(Math.abs(currentOffset) / (perPage * (CARD_WIDTH + CARD_GAP))));
        setTotalPages(Math.ceil(totalCount / perPage));
    }, [totalCount]);

    useEffect(() => {
        if (!viewportRef.current) return;
        const handleResize = () => {
            const perPage   = calcPerPage();
            const stepPx    = perPage * (CARD_WIDTH + CARD_GAP);
            const newOffset = -(pageIndex * stepPx);
            setOffset(newOffset);
            updateNav(newOffset, perPage);
        };
        const obs = new ResizeObserver(handleResize);
        obs.observe(viewportRef.current);
        handleResize();
        return () => obs.disconnect();
    }, [calcPerPage, updateNav, pageIndex, totalCount]);

    const goPrev = useCallback(() => {
        const perPage   = calcPerPage();
        const stepPx    = perPage * (CARD_WIDTH + CARD_GAP);
        const newOffset = Math.min(0, offset + stepPx);
        setOffset(newOffset);
        updateNav(newOffset, perPage);
    }, [offset, calcPerPage, updateNav]);

    const goNext = useCallback(() => {
        const perPage   = calcPerPage();
        const stepPx    = perPage * (CARD_WIDTH + CARD_GAP);
        const maxOffset = -(Math.max(0, totalCount - perPage)) * (CARD_WIDTH + CARD_GAP);
        const newOffset = Math.max(maxOffset, offset - stepPx);
        setOffset(newOffset);
        updateNav(newOffset, perPage);
    }, [offset, calcPerPage, updateNav, totalCount]);

    const goToPage = useCallback((idx: number) => {
        const perPage   = calcPerPage();
        const stepPx    = perPage * (CARD_WIDTH + CARD_GAP);
        const maxOffset = -(Math.max(0, totalCount - perPage)) * (CARD_WIDTH + CARD_GAP);
        const newOffset = Math.max(maxOffset, -(idx * stepPx));
        setOffset(newOffset);
        updateNav(newOffset, perPage);
    }, [calcPerPage, updateNav, totalCount]);

    /* ── 모달 열기 ────────────────────────────────────────────────────────── */
    const handleMovieClick = (movie: any) => {
        setModalData({
            ...movie,
            mi_genre:        movie.mi_genre        || "",
            mi_provider:     movie.mi_provider      || "",
            mp_backdrop:     movie.mp_backdrop      || movie.mp_poster || "",
            ms_tmdb_score:   movie.ms_tmdb_score    || "",
            ms_imdb_score:   movie.ms_imdb_score    || "",
            ms_meta_score:   movie.ms_meta_score    || "",
            ms_tomato_score: movie.ms_tomato_score  || "",
        });
    };

    if (!isMounted) return null;

    const hasStats = emotionStats.length > 0 || genreStats.length > 0;

    return (
        <>
        <Style.PageWrapper>
            <Header />
            <Style.MainContent>
                <Style.DashboardLayout>

                    {/* ════════ 왼쪽 메인 ════════ */}
                    <Style.LeftContainer>

                        {/* ── 찜 목록 캐러셀 ── */}
                        <Style.Section $delay={0}>
                            <Style.SectionHeader>
                                <Style.SectionTitle>
                                    <Heart size={14} fill="#E50914" color="#E50914" />
                                    찜한 콘텐츠
                                    <Style.SectionCount>{totalCount}개</Style.SectionCount>
                                </Style.SectionTitle>
                            </Style.SectionHeader>

                            {wishlistLoading ? (
                                <Style.CarouselOuter>
                                    <Style.CarouselViewport $peek={false} ref={viewportRef}>
                                        <Style.CarouselTrack $offset={0}>
                                            {[...Array(8)].map((_, i) => <Style.SkeletonCard key={i} />)}
                                        </Style.CarouselTrack>
                                    </Style.CarouselViewport>
                                </Style.CarouselOuter>
                            ) : !wishlist || (wishlist as any[]).length === 0 ? (
                                <Style.EmptyBox>찜한 영화가 없습니다.</Style.EmptyBox>
                            ) : (
                                <Style.CarouselOuter>
                                    <Style.CarouselBtn $dir="left" $visible={canPrev} onClick={goPrev} aria-label="이전">
                                        <ChevronLeft size={16} />
                                    </Style.CarouselBtn>

                                    <Style.CarouselViewport $peek={canNext} ref={viewportRef}>
                                        <Style.CarouselTrack $offset={offset}>
                                            {(wishlist as any[]).map((movie: any) => (
                                                <Style.MovieCard key={movie.mi_id} onClick={() => handleMovieClick(movie)}>
                                                    <Wishlist is_wishlist={true} mi_id={movie.mi_id} type="L" />
                                                    <Style.Poster
                                                        $url={movie.mp_poster
                                                            ? `https://image.tmdb.org/t/p/w500${movie.mp_poster}`
                                                            : null}
                                                    >
                                                        {!movie.mp_poster && (
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                                <Film size={22} color="#333" />
                                                            </div>
                                                        )}
                                                    </Style.Poster>
                                                    <Style.CardOverlay />
                                                    <Style.CardTitle>{movie.mi_title}</Style.CardTitle>
                                                </Style.MovieCard>
                                            ))}
                                        </Style.CarouselTrack>
                                    </Style.CarouselViewport>

                                    <Style.CarouselBtn $dir="right" $visible={canNext} onClick={goNext} aria-label="다음">
                                        <ChevronRight size={16} />
                                    </Style.CarouselBtn>

                                    {totalPages > 1 && (
                                        <Style.CarouselDots>
                                            {[...Array(totalPages)].map((_, i) => (
                                                <Style.Dot key={i} $active={i === pageIndex} onClick={() => goToPage(i)} />
                                            ))}
                                        </Style.CarouselDots>
                                    )}
                                </Style.CarouselOuter>
                            )}
                        </Style.Section>

                        {/* ── 취향 리포트 ── */}
                        <Style.Section $delay={100}>
                            <Style.SectionHeader>
                                <Style.SectionTitle>
                                    <BarChart3 size={14} color="#E50914" />
                                    취향 리포트
                                </Style.SectionTitle>
                            </Style.SectionHeader>

                            {/* 숫자 요약 */}
                            <Style.StatGrid>
                                <Style.StatCard>
                                    <Style.StatLabel>찜한 작품</Style.StatLabel>
                                    <Style.StatValue>{totalCount}</Style.StatValue>
                                    <Style.StatSub>총 콘텐츠</Style.StatSub>
                                </Style.StatCard>
                                <Style.StatCard>
                                    <Style.StatLabel>선호 장르</Style.StatLabel>
                                    <Style.StatValue style={{ fontSize: topGenre.length > 3 ? 16 : 22 }}>
                                        {statsLoading ? '—' : topGenre}
                                    </Style.StatValue>
                                    <Style.StatSub>
                                        {genreStats[0] ? `${genreStats[0].value}% 비중` : '데이터 부족'}
                                    </Style.StatSub>
                                </Style.StatCard>
                                <Style.StatCard>
                                    <Style.StatLabel>주요 감정</Style.StatLabel>
                                    <Style.StatValue style={{ fontSize: topEmotion.length > 3 ? 16 : 22 }}>
                                        {statsLoading ? '—' : topEmotion}
                                    </Style.StatValue>
                                    <Style.StatSub>
                                        {emotionStats[0] ? `${emotionStats[0].value}% 빈도` : '데이터 부족'}
                                    </Style.StatSub>
                                </Style.StatCard>
                            </Style.StatGrid>

                            {/* 바 차트 */}
                            {statsLoading ? (
                                <Style.ChartGrid>
                                    {[0, 1].map(i => (
                                        <Style.ChartBox key={i}>
                                            <Style.ChartLabel>{i === 0 ? '감정 키워드' : '선호 장르'}</Style.ChartLabel>
                                            {[...Array(3)].map((_, j) => (
                                                <Style.BarRow key={j}>
                                                    <Style.BarMeta>
                                                        <span style={{ background: '#1a1a1a', borderRadius: 4, width: 60, display: 'inline-block' }}>&nbsp;</span>
                                                        <span>—</span>
                                                    </Style.BarMeta>
                                                    <Style.BarTrack>
                                                        <Style.BarFill $width={0} $color="#2a2a2a" />
                                                    </Style.BarTrack>
                                                </Style.BarRow>
                                            ))}
                                        </Style.ChartBox>
                                    ))}
                                </Style.ChartGrid>
                            ) : !hasStats ? (
                                <Style.EmptyBox style={{ margin: 0 }}>
                                    영화를 추천받으면 취향 데이터가 쌓여요 😊
                                </Style.EmptyBox>
                            ) : (
                                <Style.ChartGrid>
                                    {/* 감정 */}
                                    <Style.ChartBox>
                                        <Style.ChartLabel>감정 키워드</Style.ChartLabel>
                                        {emotionStats.length > 0 ? (
                                            emotionStats.map((item, i) => (
                                                <Style.BarRow key={item.label}>
                                                    <Style.BarMeta>
                                                        <span>{item.label}</span>
                                                        <span style={{ color: item.color }}>{item.value}%</span>
                                                    </Style.BarMeta>
                                                    <Style.BarTrack>
                                                        <Style.BarFill $width={item.value} $color={item.color} $delay={i * 120} />
                                                    </Style.BarTrack>
                                                </Style.BarRow>
                                            ))
                                        ) : (
                                            <div style={{ color: '#444', fontSize: 13 }}>데이터 없음</div>
                                        )}
                                    </Style.ChartBox>

                                    {/* 장르 */}
                                    <Style.ChartBox>
                                        <Style.ChartLabel>선호 장르</Style.ChartLabel>
                                        {genreStats.length > 0 ? (
                                            genreStats.map((item, i) => (
                                                <Style.BarRow key={item.label}>
                                                    <Style.BarMeta>
                                                        <span>{item.label}</span>
                                                        <span style={{ color: item.color }}>{item.value}%</span>
                                                    </Style.BarMeta>
                                                    <Style.BarTrack>
                                                        <Style.BarFill $width={item.value} $color={item.color} $delay={i * 120} />
                                                    </Style.BarTrack>
                                                </Style.BarRow>
                                            ))
                                        ) : (
                                            <div style={{ color: '#444', fontSize: 13 }}>데이터 없음</div>
                                        )}
                                    </Style.ChartBox>
                                </Style.ChartGrid>
                            )}
                        </Style.Section>

                    </Style.LeftContainer>

                    {/* ════════ 우측 사이드바 ════════ */}
                    <Style.Sidebar>

                        {/* 프로필 카드 */}
                        <Style.ProfileCard>
                            <Style.ProfileAvatar $url={profileUrl}>
                                {!profileUrl && <User size={26} color="#444" />}
                            </Style.ProfileAvatar>
                            <div>
                                <Style.ProfileName>
                                    {userName ?? (userEmail ? userEmail.split('@')[0] : '사용자')}
                                </Style.ProfileName>
                                <Style.ProfileMeta>{userEmail}</Style.ProfileMeta>
                            </div>
                            <Style.ProfileStatRow>
                                <Style.ProfileStat>
                                    <Style.ProfileStatNum>{totalCount}</Style.ProfileStatNum>
                                    <Style.ProfileStatLabel>찜</Style.ProfileStatLabel>
                                </Style.ProfileStat>
                                <Style.ProfileStat>
                                    <Style.ProfileStatNum>{clickLog.length}</Style.ProfileStatNum>
                                    <Style.ProfileStatLabel>클릭</Style.ProfileStatLabel>
                                </Style.ProfileStat>
                                <Style.ProfileStat>
                                    <Style.ProfileStatNum>{genreStats.length}</Style.ProfileStatNum>
                                    <Style.ProfileStatLabel>장르</Style.ProfileStatLabel>
                                </Style.ProfileStat>
                            </Style.ProfileStatRow>
                        </Style.ProfileCard>

                        {/* 최근 클릭 영화 (클릭 횟수 순) */}
                        <Style.RecentPanel>
                            <Style.RecentPanelHeader>
                                <Clock size={12} />
                                많이 본 영화
                            </Style.RecentPanelHeader>

                            <Style.RecentList>
                                {clickLoading ? (
                                    <div style={{ padding: '20px 16px', color: '#333', fontSize: 12, textAlign: 'center' }}>
                                        불러오는 중...
                                    </div>
                                ) : clickLog.length === 0 ? (
                                    <div style={{ padding: '24px 16px', textAlign: 'center', color: '#333', fontSize: 12 }}>
                                        클릭 기록이 없습니다
                                    </div>
                                ) : (
                                    clickLog.map((movie: any, idx: number) => {
                                        const genre = movie.mi_genre?.split(',')[0]?.trim() ?? '';
                                        const year  = movie.mi_release_date?.slice(0, 4) ?? '';
                                        const color = getColor(GENRE_COLOR_MAP, genre);
                                        return (
                                            <Style.RecentItem
                                                key={movie.mi_id}
                                                onClick={() => handleMovieClick(movie)}
                                            >
                                                <Style.RecentRank>{idx + 1}</Style.RecentRank>
                                                <Style.RecentPoster
                                                    $url={movie.mp_poster
                                                        ? `https://image.tmdb.org/t/p/w500${movie.mp_poster}`
                                                        : null
                                                    }
                                                />
                                                <Style.RecentInfo>
                                                    <Style.RecentTitle>{movie.mi_title}</Style.RecentTitle>
                                                    <Style.RecentMeta>
                                                        {genre}{year ? ` · ${year}` : ''}
                                                        {` · ${movie.cl_click_count}회`}
                                                    </Style.RecentMeta>
                                                </Style.RecentInfo>
                                                <Style.RecentBadge $color={color} />
                                            </Style.RecentItem>
                                        );
                                    })
                                )}
                            </Style.RecentList>
                        </Style.RecentPanel>

                    </Style.Sidebar>

                </Style.DashboardLayout>

                {modalData && (
                    <Modal data={modalData} onClose={() => setModalData(null)} />
                )}
            </Style.MainContent>
        </Style.PageWrapper>
        <Footer />
        </>
    );
};

export default MyPage;
