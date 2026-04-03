'use client'

import * as Style from "./page.style";

import useMainProcessStore from "../stores/useMainProcessStore";
import useMovieListStore from "../stores/useMovieListStore";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "../supabase/supabase-browser";
import { getHeroPosterQuery } from "../queries/getMovieQuery";

import Option from "./components/option";
import Movie from "../movie/page";
import Loading from "./components/loading";
import Footer from "./components/footer";
import Header from "./components/header";

const TMDB_BASE = "https://image.tmdb.org/t/p/w300";

interface MainProps {
    params?: Promise<{ id: string }>;
}

const Main = ({ params }: MainProps) => {
    const router = useRouter();
    const supabase = useSupabaseBrowser();

    const { process, setProcess, isLoading } = useMainProcessStore();
    const { movieLogId } = useMovieListStore();

    const [id, setId] = useState<string | null>(null);

    // Supabase에서 포스터 가져오기
    const { data: posterData } = useQuery(
        getHeroPosterQuery(supabase),
        { staleTime: Infinity, gcTime: 1000 * 60 * 60 }
    );

    // 포스터 경로 배열
    const posters = useMemo(() => {
        if (!posterData) return [];
        return posterData
            .map((p: any) => p.mp_poster)
            .filter(Boolean) as string[];
    }, [posterData]);

    // 3열로 나누기
    const col1 = useMemo(() => posters.filter((_, i) => i % 3 === 0), [posters]);
    const col2 = useMemo(() => posters.filter((_, i) => i % 3 === 1), [posters]);
    const col3 = useMemo(() => posters.filter((_, i) => i % 3 === 2), [posters]);

    useEffect(() => {
        if (process === 4 && movieLogId && !id) {
            router.push(`/movieLogId/${movieLogId}`);
        }
    }, [process, movieLogId, router, id]);

    useEffect(() => {
        if (params) {
            params.then(resolved => {
                if (resolved && resolved.id) {
                    setId(resolved.id);
                    setProcess(4);
                }
            });
        }
    }, [params]);

    return (
        <>
            <Header />
            <Style.Main>
                {isLoading ? (
                    <Loading />
                ) : process === 0 ? (
                    <div className="hero">
                        <div className="hero_bg" />

                        {/* 데스크탑: 세로 스크롤 포스터 3열 */}
                        {posters.length > 0 && (
                            <div className="hero_poster_grid">
                                <div className="poster_col poster_col_up">
                                    {[...col1, ...col1].map((path, i) => (
                                        <div
                                            key={i}
                                            className="poster_card"
                                            style={{ backgroundImage: `url(${TMDB_BASE}${path})` }}
                                        />
                                    ))}
                                </div>
                                <div className="poster_col poster_col_down">
                                    {[...col2, ...col2].map((path, i) => (
                                        <div
                                            key={i}
                                            className="poster_card"
                                            style={{ backgroundImage: `url(${TMDB_BASE}${path})` }}
                                        />
                                    ))}
                                </div>
                                <div className="poster_col poster_col_up2">
                                    {[...col3, ...col3].map((path, i) => (
                                        <div
                                            key={i}
                                            className="poster_card"
                                            style={{ backgroundImage: `url(${TMDB_BASE}${path})` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 모바일: 가로 슬라이드 포스터 배너 */}
                        {posters.length > 0 && (
                            <div className="hero_poster_mobile">
                                <div className="poster_row">
                                    {[...posters, ...posters].map((path, i) => (
                                        <div
                                            key={i}
                                            className="poster_card_mobile"
                                            style={{ backgroundImage: `url(${TMDB_BASE}${path})` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 히어로 콘텐츠 */}
                        <div className="hero_content">
                            <div className="hero_badge">
                                <div className="badge_dot" />
                                AI 기반 영화 추천
                            </div>
                            <h1 className="hero_title">
                                오늘 기분에 맞는<br />영화를 <span>찾아드려요</span>
                            </h1>
                            <p className="hero_sub">
                                감정과 장르를 선택하면 나에게 딱 맞는<br />
                                영화를 AI가 추천해드립니다.
                            </p>
                            <div className="hero_cta">
                                <button className="cta_primary" onClick={() => setProcess(1)}>
                                    지금 시작하기
                                </button>
                            </div>
                            <div className="hero_stats">
                                <div className="stat_item">
                                    <span className="stat_num">200+</span>
                                    <span className="stat_label">큐레이션 영화</span>
                                </div>
                                <div className="stat_item">
                                    <span className="stat_num">4개</span>
                                    <span className="stat_label">평점 지표 연동</span>
                                </div>
                                <div className="stat_item">
                                    <span className="stat_num">6개</span>
                                    <span className="stat_label">OTT 플랫폼</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : process > 0 && process < 4 ? (
                    <Option />
                ) : process === 4 && id !== null ? (
                    <Movie movieLogId={id} />
                ) : (
                    <></>
                )}
            </Style.Main>
            <Footer />
        </>
    );
};

export default Main;