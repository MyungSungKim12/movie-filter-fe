'use client'

import * as Style from "./modal.style";

import { useEffect, useRef, useState } from "react";

import CloseIcon from "./closeIcon";
import Wishlist from "./wishlist";
import { Youtube, BookOpen, ExternalLink, User, Calendar } from 'lucide-react';

interface YoutubeVideo {
    id: { videoId: string };
    snippet: {
        title: string;
        thumbnails: { high: { url: string } };
    };
}

interface NaverReview {
    title: string;
    link: string;
    description: string;
    bloggername: string;
    postdate: string;
}

interface ModalProps {
    data: {
        is_wishlist: boolean
        mi_genre: string
        mi_id: string
        mi_provider: string
        mi_release_date: string
        mi_summary: string
        mi_title: string
        mp_alt: string
        mp_backdrop: string
        mp_poster: string
        ms_imdb_score: number
        ms_meta_score: number
        ms_tmdb_score: number
        ms_tomato_score: number
    };
    onClose: () => void;
}

const decodeHtml = (html: string): string => {
    if (typeof window === 'undefined') return html;
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

const Modal = (props: ModalProps) => {

    const defaultImageUrl: string | undefined = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;

    const [isClose, setIsClose] = useState<boolean>(false);
    const [scoreList, setScoreList] = useState<{ name: string; score: number }[]>([]);

    const [activeTab, setActiveTab] = useState<'youtube' | 'naver'>('youtube');
    const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>([]);
    const [naverReviews, setNaverReviews] = useState<NaverReview[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        if (isClose) return;
        setIsClose(true);
        setTimeout(() => { props.onClose(); }, 200);
    };

    const onClickOttRedirect = (ottName: string) => {
        const urlMap: Record<string, string> = {
            NETFLIX: 'https://www.netflix.com/kr/',
            WATCHA:  'https://watcha.com/',
            AMAZON:  'https://www.primevideo.com/',
            DISNEY:  'https://www.disneyplus.com/',
            WAVVE:   'https://www.wavve.com/',
            TVING:   'https://www.tving.com/',
            COUPANG: 'https://www.coupang.com/',
        };
        const url = urlMap[ottName];
        if (url) window.open(url, '_blank');
    };

    useEffect(() => {
        const fetchReviews = async () => {
            if (!props.data.mi_title) return;
            setLoadingReviews(true);
            try {
                const [ytRes, nvRes] = await Promise.all([
                    fetch(`/local/api/movie/videos?title=${encodeURIComponent(props.data.mi_title)}`),
                    fetch(`/local/api/movie/reviews?title=${encodeURIComponent(props.data.mi_title)}`),
                ]);
                const ytData = ytRes.ok ? await ytRes.json().catch(() => ({})) : {};
                const nvData = nvRes.ok ? await nvRes.json().catch(() => ({})) : {};
                setYoutubeVideos(ytData?.items || []);
                setNaverReviews(nvData?.items || []);
            } catch (e) {
                console.error("리뷰 로딩 실패:", e);
            } finally {
                setLoadingReviews(false);
            }
        };
        fetchReviews();
    }, [props.data.mi_title]);

    const handleTabChange = (tab: 'youtube' | 'naver') => {
        setActiveTab(tab);
        setTimeout(() => {
            reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };

    useEffect(() => {
        setScoreList([
            { name: 'TMDB',       score: Number(props.data.ms_tmdb_score.toFixed(1)) },
            { name: 'IMDB',       score: props.data.ms_imdb_score },
            { name: 'METACRITIC', score: props.data.ms_meta_score },
            { name: 'TOMATO',     score: props.data.ms_tomato_score },
        ]);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [props.onClose]);

    return (
        <Style.ModalOverlay $isClosing={isClose} onClick={handleClose}>
            <Style.ModalContainer>
                <Style.ModalContent
                    $isClosing={isClose}
                    $poster={props.data.mp_poster}
                    $backdrop={props.data.mp_backdrop}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="modal_close" onClick={handleClose}><CloseIcon /></button>
                    <div className="modal_head" />

                    <div className="modal_body">
                        <div className="modal_content_bottom" />

                        <div className="modal_content_top">
                            <div className="modal_content_left">
                                <div className="left_content_top">
                                    <div className="movie_title">{props.data.mi_title}</div>
                                    <Wishlist is_wishlist={props.data.is_wishlist} mi_id={props.data.mi_id} type="M" />
                                </div>
                                <div className="movie_genres">
                                    {props.data.mi_genre.split(',').map((genre, idx) => (
                                        <div className="movie_genre" key={idx}>{genre}</div>
                                    ))}
                                </div>
                                <div className="movie_summary">{props.data.mi_summary}</div>
                                <div className="movie_shortcut">
                                    {props.data.mi_provider.split(',').filter(p => p !== 'NONE').map((platform, idx) => (
                                        <Style.PlatformBadge
                                            $image={platform.trim()}
                                            key={idx}
                                            onClick={() => onClickOttRedirect(platform.trim())}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal_ratings_row">
                            {scoreList.filter(rate => rate.score !== 0).map((rate, idx) => {
                                const score = rate.name === 'IMDB' || rate.name === 'TMDB'
                                    ? rate.score * 10
                                    : rate.score;
                                return (
                                    <Style.RatingBadge $score={score} key={idx}>
                                        <div className="rating_score">
                                            <img src={defaultImageUrl + "/platform/" + rate.name + ".svg"} alt={rate.name} />
                                            <div className="score_detail">
                                                <div className="score_view">
                                                    {rate.name === 'IMDB' || rate.name === 'TMDB' ? score / 10 : score}
                                                    {rate.name === 'TOMATO' ? '%' : ''}
                                                </div>
                                                <div className="score_title">
                                                    {rate.name === 'TOMATO'      ? 'Tomatometer'
                                                    : rate.name === 'METACRITIC' ? 'Metascore'
                                                    : rate.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rating_graph">
                                            <div className="graph_container">
                                                <div className="graph_bar">
                                                    <div className="graph_glow" />
                                                </div>
                                            </div>
                                        </div>
                                    </Style.RatingBadge>
                                );
                            })}
                        </div>

                        <Style.ReviewSection ref={reviewRef}>
                            <Style.ReviewTabs>
                                <Style.ReviewTab $active={activeTab === 'youtube'} onClick={() => handleTabChange('youtube')}>
                                    <Youtube size={15} /> YouTube 영상
                                </Style.ReviewTab>
                                <Style.ReviewTab $active={activeTab === 'naver'} onClick={() => handleTabChange('naver')}>
                                    <BookOpen size={15} /> 네이버 블로그
                                </Style.ReviewTab>
                            </Style.ReviewTabs>

                            <Style.ReviewContent>
                                {loadingReviews ? (
                                    <Style.LoadingBox>
                                        <Style.SpinIcon size={28} />
                                        <p>불러오는 중...</p>
                                    </Style.LoadingBox>
                                ) : activeTab === 'youtube' ? (
                                    /* ── YouTube ── */
                                    <Style.YoutubeGrid>
                                        {youtubeVideos.length === 0 ? (
                                            <Style.NoDataBox style={{ gridColumn: 'span 3' }}>
                                                관련 YouTube 영상이 없습니다. API 횟수 초과...
                                            </Style.NoDataBox>
                                        ) : (
                                            youtubeVideos.map((video) => (
                                                <Style.YoutubeCard
                                                    key={video.id.videoId}
                                                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Style.YoutubeThumbnailWrapper>
                                                        <Style.YoutubeThumbnail $url={video.snippet.thumbnails.high.url} />
                                                        <Style.PlayOverlay>▶</Style.PlayOverlay>
                                                    </Style.YoutubeThumbnailWrapper>
                                                    {/* decodeHtml: &quot; &amp; &#39; 등 엔티티 → 일반 문자 변환 */}
                                                    <Style.YoutubeTitle>
                                                        {decodeHtml(video.snippet.title)}
                                                    </Style.YoutubeTitle>
                                                </Style.YoutubeCard>
                                            ))
                                        )}
                                    </Style.YoutubeGrid>
                                ) : (
                                    /* ── Naver ── */
                                    <Style.NaverList>
                                        {naverReviews.length === 0 ? (
                                            <Style.NoDataBox>관련 네이버 리뷰가 없습니다.</Style.NoDataBox>
                                        ) : (
                                            naverReviews.map((review, idx) => (
                                                <Style.NaverCard
                                                    key={idx}
                                                    href={review.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Style.NaverCardTop>
                                                        <Style.NaverCardTitle dangerouslySetInnerHTML={{ __html: review.title }} />
                                                        <ExternalLink size={13} color="#666" style={{ flexShrink: 0, marginTop: 2 }} />
                                                    </Style.NaverCardTop>
                                                    <Style.NaverCardDesc dangerouslySetInnerHTML={{ __html: review.description }} />
                                                    <Style.NaverCardMeta>
                                                        <span><User size={11} /> {review.bloggername}</span>
                                                        <span><Calendar size={11} /> {review.postdate}</span>
                                                    </Style.NaverCardMeta>
                                                </Style.NaverCard>
                                            ))
                                        )}
                                    </Style.NaverList>
                                )}
                            </Style.ReviewContent>
                        </Style.ReviewSection>
                    </div>
                </Style.ModalContent>
            </Style.ModalContainer>
        </Style.ModalOverlay>
    );
};

export default Modal;
