import styled, { keyframes, css } from 'styled-components';
import { Loader } from 'lucide-react';

const defaultImageUrl: string | undefined = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;
const movieImageUrl: string | undefined = process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL;

// ─── 공통 애니메이션 ──────────────────────────────────────────────────────────
const fadeIn  = keyframes` from { opacity: 0; } to { opacity: 1; } `;
const fadeOut = keyframes` from { opacity: 1; } to { opacity: 0; } `;

const scaleUp = keyframes`
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);    }
`;
const scaleDown = keyframes`
    from { opacity: 1; transform: scale(1)    translateY(0);    }
    to   { opacity: 0; transform: scale(0.95) translateY(10px); }
`;

export const spin = keyframes`
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
`;

export const ModalOverlay = styled.div<{ $isClosing: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out forwards;
`;

export const ModalContainer = styled.div`
    @media (max-width: 1024px) { max-height: 800px; }
    @media (max-width: 480px)  { max-height: 650px; }
    position: relative;
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 1024px;
    height: 90%;
    border: 1px solid rgba(128, 128, 128, 0.4);
    border-radius: 20px;
    overflow: hidden;
    background-color: rgb(13, 13, 18);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div<{ $isClosing: boolean; $poster: string; $backdrop: string }>`
    position: relative;
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 20px;
    font-size: 2rem;
    color: #FFFFFF;
    overflow-y: auto;
    &::-webkit-scrollbar       { width: 4px; }
    &::-webkit-scrollbar-thumb { background: #333; border-radius: 8px; }
    animation: ${({ $isClosing }) => ($isClosing ? scaleDown : scaleUp)} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    z-index: 1000;

    /* 닫기 버튼 */
    .modal_close {
        position: absolute;
        top: 15px;
        right: 15px;
        display: flex;
        align-items: center;
        padding: 10px;
        border: none;
        border-radius: 50%;
        background: none;
        z-index: 1003;
        cursor: pointer;
        &:hover { background-color: rgba(128, 128, 128, 0.4); }
    }

    /* 배경 포스터 */
    .modal_head {
        @media (max-width: 1024px) {
            background-size: cover;
            background-position: center;
        }
        @media (max-width: 480px) {
            background-image:
                linear-gradient(75deg, rgba(13,13,18,1) 10%, rgba(13,13,18,0.6) 20%, rgba(13,13,18,0) 40%),
                ${({ $poster }) => `url('${movieImageUrl}/w500${$poster}')`};
        }
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70%;
        background-color: rgb(13, 13, 18);
        background-image:
            linear-gradient(75deg, rgba(13,13,18,1) 10%, rgba(13,13,18,0.6) 20%, rgba(13,13,18,0) 40%),
            ${({ $backdrop }) => `url('${movieImageUrl}/original${$backdrop}')`};
        background-repeat: no-repeat;
        background-position: right top;
        background-size: 95%;
        z-index: 1001;
        -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
        mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
    }

    .modal_body {
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        min-height: 100%;
        background-image: linear-gradient(
            to bottom,
            rgba(13,13,18,0)   0%,
            rgba(13,13,18,0)   10%,
            rgba(13,13,18,0.7) 20%,
            rgb(13,13,18)      85%
        );
        z-index: 1002;

        .modal_content_bottom {
            height: 50%;
        }

        .modal_content_top {
            @media (max-width: 1024px) { padding: 310px 0 5px 35px; }
            @media (max-width: 480px)  { justify-content: center; padding: 200px 5px 5px; }
            display: flex;
            width: 100%;
            padding: 390px 0 5px 50px;

            .modal_content_left {
                @media (max-width: 480px) { width: 90%; }
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 15px;
                width: 80%;
                height: 100%;

                .left_content_top {
                    @media (max-width: 480px) { margin-top: 60px; }
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    width: 100%;

                    .movie_title {
                        @media (max-width: 1024px) { font-size: 3rem; }
                        @media (max-width: 480px)  { font-size: 2rem; }
                        max-width: 85%;
                        font-size: 4rem;
                        font-weight: 700;
                    }
                }

                .movie_genres {
                    @media (max-width: 480px) { gap: 3px; }
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px;

                    .movie_genre {
                        @media (max-width: 768px) { font-size: 1.3rem; }
                        @media (max-width: 480px) { font-size: .9rem; }
                        padding: 2px 8px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 7px;
                        background-color: #414141;
                        backdrop-filter: blur(4px);
                        color: #FFFFFFB3;
                        font-size: 1.4rem;
                        line-height: 1.2;
                    }
                }

                .movie_summary {
                    @media (max-width: 768px) { font-size: 1.4rem; }
                    @media (max-width: 480px) { margin: 0; font-size: 1rem; }
                    margin-top: 5px;
                    font-size: 1.5rem;
                }

                .movie_shortcut {
                    padding-bottom: 10px;
                }
            }

            .modal_content_right {
                display: none;
            }
        }

        .modal_ratings_row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            padding: 0 50px 24px;

            @media (max-width: 1024px) { padding: 0 35px 20px; }
            @media (max-width: 480px)  { padding: 0 10px 15px; gap: 8px; }
        }
    }
`;

// ─── OTT 플랫폼 바로가기 버튼 ──────
export const PlatformBadge = styled('div')<{ $image: string }>`
    @media (max-width: 480px) { width: 70px; height: 30px; }
    position: relative;
    display: inline-block;
    width: 100px;
    height: 45px;
    margin-right: 5px;
    border: none;
    border-radius: 10px;
    background-image: ${({ $image }) => `url('${defaultImageUrl}/shortcut/${$image}.svg')`};
    background-repeat: no-repeat;
    background-size: ${({ $image }) =>
        $image === 'COUPANG' ? 90
      : $image === 'WAVVE'   ? 80
      : $image === 'AMAZON'  ? 50
      : 70}%;
    background-position: center;
    background-color: #FFFFFF;
    transition: all 0.5s ease-out;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3);
        filter: brightness(1.2);
    }

    &::after {
        content: "바로가기";
        position: absolute;
        bottom: 110%;
        left: 50%;
        transform: translateX(-50%) translateY(5px);
        background: rgba(43, 43, 48, 0.9);
        backdrop-filter: blur(8px);
        color: #ffffff;
        padding: 3px 9px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1);
        font-size: 1.2rem;
        font-weight: 500;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease-in-out;
        z-index: 100;
    }

    &:hover::after {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }
`;

// ─── 평점 배지 ────
const growUp = ($score: number) => keyframes`
    from { width: 0%; }
    to   { width: ${$score}%; }
`;

export const RatingBadge = styled('div')<{ $score: number }>`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: 160px;
    padding: 12px 14px;
    margin-top: 15px;
    border-radius: 10px;
    background: #1a1a1a;
    color: #FFFFFF;
    transition: all 0.3s ease-out;
    box-sizing: border-box;

    @media (max-width: 768px) { width: 130px; padding: 10px 12px; }
    @media (max-width: 480px) { width: 110px; padding: 8px 10px; }

    &:hover {
        img { transform: rotate(-5deg); }
        .score_view { transform: scale(1.1); text-shadow: 0 0 15px rgba(255,255,255,0.8); }
        background: #252525;
        box-shadow: 0 0 10px rgba(255,255,255,0.3), inset 0 0 5px rgba(255,255,255,0.2);
    }

    .rating_score {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            object-fit: contain;
            transition: all 0.5s ease-out;
            @media (max-width: 768px) { width: 28px; height: 28px; }
            @media (max-width: 480px) { width: 22px; height: 22px; }
        }

        .score_detail {
            display: flex;
            flex-direction: column;

            .score_view {
                font-size: 1.9rem;
                font-weight: 800;
                padding-bottom: 2px;
                transition: all 0.3s ease-out;
                @media (max-width: 768px) { font-size: 1.5rem; }
                @media (max-width: 480px) { font-size: 1.2rem; }
            }

            .score_title {
                font-size: 1rem;
                font-weight: 300;
                font-style: italic;
                color: #aaa;
                @media (max-width: 768px) { font-size: .85rem; }
                @media (max-width: 480px) { font-size: .75rem; }
            }
        }
    }

    .rating_graph {
        width: 100%;
        height: 6px;
        padding: 1px;
        margin-top: 10px;
        border-radius: 10px;
        background: rgba(0,0,0,0.5);
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        box-sizing: border-box;
        @media (max-width: 480px) { margin-top: 6px; }

        .graph_container {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            overflow: hidden;

            .graph_bar {
                position: relative;
                width: ${({ $score }) => $score}%;
                height: 100%;
                background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 100%);
                border-radius: 10px;
                animation: ${({ $score }) => growUp($score)} 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;

                .graph_glow {
                    position: absolute;
                    right: -4px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 8px;
                    height: 8px;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 35px rgba(255,255,255,0.5);
                }
            }
        }
    }
`;

// ─── 리뷰 섹션 ────────
export const ReviewSection = styled.div`
    padding: 0 40px 40px;
    margin-top: 10px;
`;

export const ReviewTabs = styled.div`
    display: flex;
    gap: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 24px;
`;

export const ReviewTab = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px 20px;
    border: none;
    border-bottom: 2px solid ${p => p.$active ? '#ACE5FF' : 'transparent'};
    margin-bottom: -1px;
    background: none;
    color: ${p => p.$active ? '#ffffff' : '#555'};
    font-size: 1.4rem;
    font-weight: ${p => p.$active ? '700' : '400'};
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover { color: #fff; }
`;

export const ReviewContent = styled.div``;

export const SpinIcon = styled(Loader)`
    animation: ${spin} 1s linear infinite;
    color: #ACE5FF;
`;

export const LoadingBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 50px 0;
    color: #555;
    font-size: 1.3rem;
`;

export const NoDataBox = styled.div`
    padding: 40px;
    text-align: center;
    color: #444;
    border: 1px dashed #2a2a2a;
    border-radius: 12px;
    font-size: 1.3rem;
`;

// ─── YouTube ─────────
export const YoutubeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
`;

export const YoutubeCard = styled.a`
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    color: white;
    transition: 0.25s ease;
    &:hover {
        border-color: rgba(172, 229, 255, 0.4);
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(172, 229, 255, 0.08);
    }
`;

export const YoutubeThumbnailWrapper = styled.div`
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
`;

export const YoutubeThumbnail = styled.div<{ $url: string }>`
    width: 100%;
    height: 100%;
    background: #111 url("${p => p.$url}") center / cover no-repeat;
`;

export const PlayOverlay = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.45);
    font-size: 32px;
    color: white;
    opacity: 0;
    transition: opacity 0.2s;
    ${YoutubeCard}:hover & { opacity: 1; }
`;

export const YoutubeTitle = styled.div`
    padding: 10px 12px;
    font-size: 1.2rem;
    line-height: 1.5;
    color: #bbb;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

// ─── Naver ────
export const NaverList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const NaverCard = styled.a`
    display: block;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px 20px;
    text-decoration: none;
    color: white;
    transition: 0.2s ease;
    &:hover {
        border-color: rgba(3, 199, 90, 0.4);
        transform: translateX(3px);
    }
`;

export const NaverCardTop = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
`;

export const NaverCardTitle = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    color: #eee;
    line-height: 1.4;
    b { color: #03c75a; font-weight: 700; }
`;

export const NaverCardDesc = styled.div`
    font-size: 1.2rem;
    line-height: 1.7;
    color: #666;
    margin-bottom: 10px;
    b { color: #888; font-weight: 500; }
`;

export const NaverCardMeta = styled.div`
    display: flex;
    gap: 16px;
    font-size: 1.1rem;
    color: #444;
    span {
        display: flex;
        align-items: center;
        gap: 4px;
    }
`;
