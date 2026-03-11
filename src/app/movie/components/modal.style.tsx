import styled, { keyframes, css } from 'styled-components';

const defaultImageUrl:string|undefined = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;
const movieImageUrl:string|undefined = process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL;

const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; } `;
const scaleUp = keyframes` 
  from { opacity: 0; transform: scale(0.95) translateY(10px); } 
  to { opacity: 1; transform: scale(1) translateY(0); } 
`;

const fadeOut = keyframes` from { opacity: 1; } to { opacity: 0; } `;
const scaleDown = keyframes` 
  from { opacity: 1; transform: scale(1) translateY(0); } 
  to { opacity: 0; transform: scale(0.95) translateY(10px); } 
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
    position: relative;
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 1024px;
    height: 90%;
    border: 1px solid rgba(128, 128, 128, 0.4);
    border-radius: 20px;
    overflow: hidden;
    background-color: #000000;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`

export const ModalContent = styled.div<{ $isClosing: boolean; $image: string}>`
    position: relative;
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 20px;
    font-size: 2rem;
    color: #FFFFFF;
    overflow-y: auto;
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: #333; border-radius: 8px; }
    animation: ${({ $isClosing }) => ($isClosing ? scaleDown : scaleUp)} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    z-index: 1000;

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

        &:hover {
            background-color: rgba(128, 128, 128, 0.4);
        }
    }

    .modal_head {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70%;
        background-color: rgb(13, 13, 18);
        background-image: linear-gradient(75deg, rgba(13, 13, 18, 1) 10%, rgba(13, 13, 18, 0.6) 20%, rgba(13, 13, 18, 0) 40%), ${({$image}) => "url('" + movieImageUrl + "/original" + $image + "')"};
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
            rgba(13, 13, 18, 0) 0%,
            rgba(13, 13, 18, 0) 10%, 
            rgba(13, 13, 18, 0.7) 20%,
            rgb(13, 13, 18) 85%
        );
        z-index: 1002;

        .modal_content_bottom {
            height: 50%;
        }

        .modal_content_top {
            display: flex;
            width: 100%;
            height: 50%;
            padding: 5px 50px;

            .modal_content_left {
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 15px;
                width: calc(100% * 2 / 3);
                height: 100%;

                .movie_title {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    font-size: 4rem;
                    font-weight: 700;
                }

                .movie_genres {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px;

                    .movie_genre {
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
                    margin-top: 15px;
                    font-size: 1.5rem;
                }

                .movie_shortcut {
                    margin-top: auto;
                    padding-bottom: 20px;
                }
            }

            .modal_content_right {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 20px 10px;
                width: calc(100% * 1 / 3);
                height: 100%;
                margin-left: 30px;
            }
        }
    }
`;

export const PlatformBadge = styled('div')<{$image:string}>`
    // mobile_view
    @media (max-width: 500px) {
    }
    position: relative;
    display: inline-block;
    width: 100px;
    height: 45px;
    margin-right: 5px;
    border: none;
    border-radius: 10px;
    background-image: ${({$image}) => "url('" + defaultImageUrl + "/shortcut/" + $image + ".svg')"  };
    background-repeat: no-repeat;
    background-size: ${({$image}) => $image === 'COUPANG' ? 90 : $image === 'WAVVE' ? 80 : 70}%;
    background-position: center;
    background-color: #FFFFFF;
    transition: all 0.5s ease-out;
    cursor: pointer;

    &:hover {
        border-color: #FFFFFF;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3);
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
        -webkit-backdrop-filter: blur(8px);
        color: #ffffff;
        padding: 3px 9px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 1.2rem;
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
            font-size: .9rem;
        }
    }
`;

const growUp = ($score: number) => keyframes`
    from {width: 0%;}
    to {width: ${$score}%;}
`;

export const RatingBadge = styled('div')<{$score:number}>`
    // mobile_view
    @media (max-width: 500px) {
    }
    position: relative;
    display: inline-block;
    width: calc(95% / 2);
    height: 120px;
    padding: 25px 10px;
    border-radius: 10px;
    background: #1a1a1a;
    color: #FFFFFF;
    transition: all 0.3s ease-out;
    box-sizing: border-box;

    &:hover {
        img {
            transform: rotate(-5deg);
        }
        .score_view {
            transform: scale(1.1);
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.8)
        }
        background: #252525;
        border-color: #fff;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.3), inset 0 0 5px rgba(255, 255, 255, 0.2);
    }

    .rating_score {
        display: flex;
        align-items: center;
        justify-content: space-around;

        img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            object-fit: contain;
            transition: all 0.5s ease-out;
            will-change: filter, transform;
        }

        .score_detail {
            display: flex;
            flex-direction: column;
            align-items: center;

            .score_view {
                padding-bottom: 3px;
                font-size: 2rem;
                font-weight: 800;
                transition: all 0.3s ease-out;
            }

            .score_title {
                font-size: 1rem;
                font-weight: 300;
                font-style: italic;
            }
        }
    }

    .rating_graph {
        clear: both;
        width: 100%;
        height: 12px;
        padding: 2px;
        margin-top: 15px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        box-sizing: border-box;

        .graph_container {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            overflow: hidden;

            .graph_bar {
                position: relative;
                width: ${({$score}) => $score}%;
                height: 100%;
                background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 100%);
                border-radius: 10px;
                animation: ${({$score}) => growUp($score)} 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;

                .graph_glow {
                    position: absolute;
                    right: -5px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 10px;
                    height: 10px;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 
                        0 0 15px #fff,
                        0 0 30px #fff,
                        0 0 45px rgba(255, 255, 255, 0.5);
                }
            }
        }
    }
`;
