import styled, { keyframes, css } from 'styled-components';

const defaultImageUrl:string|undefined = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;
const movieImageUrl:string|undefined = process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Movie = styled('div')`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 80px 25px;

    .movie_header {

    }

    .movie_body {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;

        .list_section {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            gap: 15px;
            width: 80%;
            height: auto;
        }
        .button_section {
            height: 20px;
            padding: 50px;
        }
    }
`

export const MovieCard = styled('div')<{$image:string; $idx:number}>`
    position: relative;
    @media (max-width: 1440px) {
        width: calc(90% / 4);
    }
    @media (max-width: 768px) {
        width: 100%;
        aspect-ratio: 4 / 2;
    }
    width: calc(90% / 5);
    aspect-ratio: 3 / 5;
    border-radius: 10px;
    background-color: rgb(43 43 48 / 1);
    animation: ${fadeInUp} 0.5s ease-out forwards;
    animation-delay: ${({$idx}) => $idx * 0.1}s;
    opacity: 0;
    cursor: pointer;

    .card_container {
        @media (max-width: 768px) {
            flex-direction: row;
        }
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;

        &:hover > .card_head > .card_image {
            transition: transform .4s ease-in-out;
            transform: translate(0, 0) rotate(0) skewX(0) skewY(0) scaleX(1.1) scaleY(1.1);
        }

        &:not(:hover) > .card_head > .card_image {
            transition: transform .4s ease-in-out;
        }

        .card_head {
            @media (max-width: 768px) {
                width: 50%;
                height: 100%;
            }
            position: relative;
            width: 100%;
            height: 95%;
            border-radius: 10px;
            overflow: hidden;

            .card_image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 99%;
                background-image: ${({$image}) => "url('" + movieImageUrl + "/w500" + $image + "')"};
                background-size: 100%;
                background-repeat: no-repeat;
            }

            .card_effect {
                @media (max-width: 768px) {
                    background-image: linear-gradient(rgba(43, 43, 48, 0) 40%, rgb(43, 43, 48) 95%);
                }
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(rgba(43, 43, 48, 0) 30%, rgb(43, 43, 48) 90%);
            }
        }

        .card_body {
            @media (max-width: 768px) {
                position: relative;
                justify-content: flex-start;
                padding: 5px;
            }
            position: absolute;
            bottom: 0;
            display: flex; 
            flex-direction: column; 
            justify-content: space-between;
            width: 100%;
            height: 97%;

            .card_ott {
                @media (max-width: 1024px) {
                    margin-top: 3px;
                }
                @media (max-width: 768px) {
                    position: absolute;
                    bottom: 8px;
                    left: 13px;
                }
                display: flex;
                align-items: center;
                z-index: 99;
            }

            .card_content {
                @media (max-width: 768px) {
                    align-items: flex-start;
                }
                position: relative;
                bottom: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #FFFFFF;

                .card_title {
                    @media (max-width: 1024px) {
                        font-size: 1.2rem;
                    }
                    @media (max-width: 768px) {
                        font-size: 1.8rem;
                    }
                    // mobile_view
                    @media (max-width: 500px) {
                        font-size: 1.3rem;
                    }
                    padding: 0 10px;
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .card_year {
                    @media (max-width: 1024px) {
                        font-size: 1rem;
                    }
                    @media (max-width: 768px) {
                        font-size: 1.2rem;
                    }
                    // mobile_view
                    @media (max-width: 500px) {
                        font-size: 1rem;
                    }
                    padding: 5px 10px;
                    font-size: 1.2rem;
                }

                .card_genres {
                    // mobile_view
                    @media (max-width: 500px) {
                        justify-content: left;
                        width: 85%;
                    }
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    gap: 1px;
                    padding: 5px 7px;

                    .card_genre {
                        @media (max-width: 1024px) {
                            font-size: .8rem;
                        }
                        @media (max-width: 768px) {
                            font-size: 1rem;
                        }
                        // mobile_view
                        @media (max-width: 500px) {
                            font-size: .8rem;
                        }
                        padding: 2px 7px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 7px;
                        background-color: rgba(0, 0, 0, 0.4);
                        backdrop-filter: blur(4px);
                        font-size: 1rem;
                        line-height: 1.7;
                    }
                }
            }
        }
    }
`

export const PlatformBadge = styled('div')<{$image:string}>`
    @media (max-width: 1024px) {
        width: 20px;
        height: 20px;
    }
    @media (max-width: 768px) {
        width: 30px;
        height: 30px;
        margin-left: 5px;
        border-radius: 10px;
    }
    // mobile_view
    @media (max-width: 500px) {
        width: 22px;
        height: 22px;
        border-radius: 5px;
    }
    position: relative;
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-left: 3px;
    border: none;
    border-radius: 50%;
    background-image: ${({$image}) => "url('" + defaultImageUrl + "/platform/" + $image + ($image === 'COUPANG' ? ".webp')" : $image === 'WAVVE' ? ".png')" : ".svg')") };
    background-repeat: no-repeat;
    background-size: ${({$image}) => $image === 'AMAZON' || $image === 'DISNEY' ? 85 : $image === 'COUPANG' ? 150 : 100}%;
    background-position: center;
    background-color: ${({$image}) => $image === 'NETFLIX' || $image === 'WATCHA' ? '#000000' : '#FFFFFF' };

    &::after {
        content: ${({$image}) => $image === 'NETFLIX' ? "'넷플릭스'" :
                                 $image === 'WATCHA' ? "'왓챠'" :
                                 $image === 'AMAZON' ? "'아마존 프라임'" : 
                                 $image === 'DISNEY' ? "'디즈니+'" :
                                 $image === 'WAVVE' ? "'웨이브'" :
                                 $image === 'TVING' ? "'티빙'" :
                                 $image === 'COUPANG' ? "'쿠팡플레이'" : "''" };
        position: absolute;
        bottom: 120%;
        left: 50%;
        transform: translateX(-50%) translateY(5px);
        background: rgba(43, 43, 48, 0.9);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: #ffffff;
        padding: 3px 6px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: .9rem;
        font-weight: 500;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
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

    @media (max-width: 768px) {
        &::after {
            font-size: 0.9rem;
        }
    }
`
