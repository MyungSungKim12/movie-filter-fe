'use client'

import * as Style from "./page.style";

import useMainProcessStore from "../stores/useMainProcessStore";
import useMovieListStore from "../stores/useMovieListStore";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import Option from "./components/option";
import Movie from "../movie/page";
import Loading from "./components/loading";
import Footer from "./components/footer";
import Header from "./components/header";

interface MainProps {
    params?: Promise<{ id: string }>;
}

const GRID_ITEMS = Array.from({ length: 30 });

const Main = ({ params }: MainProps) => {
    const router = useRouter();

    const { process, setProcess, isLoading } = useMainProcessStore();
    const { movieLogId, setMovieLogId } = useMovieListStore();

    const [id, setId] = useState<string | null>(null);

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
                        <div className="hero_grid">
                            {GRID_ITEMS.map((_, i) => (
                                <div className="hero_grid_item" key={i} />
                            ))}
                        </div>
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