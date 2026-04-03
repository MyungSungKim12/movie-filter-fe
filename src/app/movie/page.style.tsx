import styled, { keyframes } from 'styled-components';

const movieImageUrl: string | undefined = process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL;
const defaultImageUrl: string | undefined = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;

const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
`;

export const Movie = styled('div')`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 56px - 44px);
    padding: 48px 40px 80px;
    background: #0A0A0A;

    @media (max-width: 768px) {
        padding: 32px 16px 60px;
    }

    .movie_header {
        width: 100%;
        max-width: 1200px;
        margin-bottom: 36px;
    }

    .movie_body {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 1200px;

        .list_section {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
            width: 100%;

            @media (max-width: 1200px) { grid-template-columns: repeat(4, 1fr); }
            @media (max-width: 900px)  { grid-template-columns: repeat(3, 1fr); }
            @media (max-width: 600px)  { grid-template-columns: repeat(2, 1fr); }
        }

        .button_section {
            margin-top: 40px;
        }
    }
`;

export const MovieCard = styled('div')<{ $image: string; $idx: number }>`
    position: relative;
    aspect-ratio: 2 / 3;
    border-radius: 10px;
    background: #141414;
    overflow: hidden;
    cursor: pointer;
    animation: ${fadeInUp} 0.5s ease both;
    animation-delay: ${({ $idx }) => Math.min($idx * 0.07, 0.7)}s;
    opacity: 0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08);
        z-index: 5;
    }

    .card_container {
        position: relative;
        width: 100%;
        height: 100%;

        /* 포스터 이미지 */
        .card_head {
            position: absolute;
            inset: 0;
            overflow: hidden;

            .card_image {
                width: 100%;
                height: 100%;
                background-image: ${({ $image }) => `url('${movieImageUrl}/w500${$image}')`};
                background-size: cover;
                background-position: center;
                transition: transform 0.5s ease;
            }

            .card_effect {
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    to bottom,
                    transparent 30%,
                    rgba(10,10,10,0.5) 65%,
                    rgba(10,10,10,0.97) 100%
                );
            }
        }

        &:hover .card_image {
            transform: scale(1.08);
        }

        /* 카드 정보 */
        .card_body {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 12px 10px;
            z-index: 2;

            .card_ott {
                display: flex;
                align-items: center;
                gap: 3px;
                margin-bottom: 6px;
            }

            .card_content {
                display: flex;
                flex-direction: column;
                gap: 4px;

                .card_genres {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;

                    .card_genre {
                        padding: 2px 7px;
                        border: 1px solid rgba(255,255,255,0.12);
                        border-radius: 4px;
                        background: rgba(0,0,0,0.5);
                        backdrop-filter: blur(4px);
                        font-size: 0.95rem;
                        color: rgba(255,255,255,0.65);

                        @media (max-width: 900px) { font-size: 0.85rem; }
                    }
                }

                .card_title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #fff;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1.3;

                    @media (max-width: 900px) { font-size: 1.1rem; }
                }

                .card_year {
                    font-size: 1.1rem;
                    color: rgba(255,255,255,0.35);

                    @media (max-width: 900px) { font-size: 0.95rem; }
                }
            }
        }
    }
`;

export const PlatformBadge = styled('div')<{ $image: string }>`
    position: relative;
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: none;
    background-image: ${({ $image }) =>
        `url('${defaultImageUrl}/platform/${$image}${
            $image === 'COUPANG' ? '.webp' : $image === 'WAVVE' ? '.png' : '.svg'
        }')`};
    background-repeat: no-repeat;
    background-size: ${({ $image }) =>
        $image === 'AMAZON' || $image === 'DISNEY' ? 85 :
        $image === 'COUPANG' ? 150 : 100}%;
    background-position: center;
    background-color: ${({ $image }) =>
        $image === 'NETFLIX' || $image === 'WATCHA' ? '#000' : '#fff'};

    @media (max-width: 900px) { width: 18px; height: 18px; }

    &::after {
        content: ${({ $image }) =>
            $image === 'NETFLIX'  ? "'넷플릭스'" :
            $image === 'WATCHA'   ? "'왓챠'" :
            $image === 'AMAZON'   ? "'아마존 프라임'" :
            $image === 'DISNEY'   ? "'디즈니+'" :
            $image === 'WAVVE'    ? "'웨이브'" :
            $image === 'TVING'    ? "'티빙'" :
            $image === 'COUPANG'  ? "'쿠팡플레이'" : "''"};
        position: absolute;
        bottom: 120%;
        left: 50%;
        transform: translateX(-50%) translateY(5px);
        background: rgba(20,20,20,0.95);
        color: #fff;
        padding: 3px 8px;
        border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.1);
        font-size: 0.9rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
        z-index: 100;
        pointer-events: none;
    }

    &:hover::after {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }
`;