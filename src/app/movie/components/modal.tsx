'use client'

import * as Style from "./modal.style";

import { useEffect, useState } from "react";

import CloseIcon from "./closeIcon";
import Wishlist from "./wishlist";

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

const Modal = (props : ModalProps) => {

    const defaultImageUrl:string|undefined = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;

    const [isClose, setIsClose] = useState<boolean>(false);
    const [scoreList, setScoreList] = useState<{name: string, score: number}[]>([]);

    const handleClose = () => {
        if(isClose) return;
        setIsClose(true);
        setTimeout(() => {
            props.onClose();
        }, 200)
    }

    const onClickOttRedirect = (ottName:string) => {
        let url:string = '';
        if(ottName === 'NETFLIX') {
            url = 'https://www.netflix.com/kr/';
        } else if(ottName === 'WATCHA') {
            url = 'https://watcha.com/';
        } else if(ottName === 'AMAZON') {
            url = 'https://www.primevideo.com/';
        } else if(ottName === 'DISNEY') {
            url = 'https://www.disneyplus.com/';
        } else if(ottName === 'WAVVE') {
            url = 'https://www.wavve.com/';
        } else if(ottName === 'TVING') {
            url = 'https://www.tving.com/';
        } else if(ottName === 'COUPANG') {
            url = 'https://www.coupang.com/';
        } 
        window.open(url, '_blank');
    }

    useEffect(() => {
        const setScore = [
            { name: 'TMDB', score: Number(props.data.ms_tmdb_score.toFixed(1)) },
            { name: 'IMDB', score: props.data.ms_imdb_score },
            { name: 'METACRITIC', score: props.data.ms_meta_score },
            { name: 'TOMATO', score: props.data.ms_tomato_score }
        ];
        setScoreList(setScore);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        // document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [props.onClose]);

    return (
        <Style.ModalOverlay $isClosing={isClose} onClick={handleClose}>
            <Style.ModalContainer>
                <Style.ModalContent $isClosing={isClose} $poster={props.data.mp_poster} $backdrop={props.data.mp_backdrop} onClick={(e) => e.stopPropagation()}>
                    <button className="modal_close" onClick={() => handleClose()}><CloseIcon /></button>
                    <div className="modal_head" />
                    <div className="modal_body">
                        <div className="modal_content_bottom"></div>
                        <div className="modal_content_top">
                            <div className="modal_content_left">
                                <div className="left_content_top">
                                    <div className="movie_title">
                                        {props.data.mi_title}
                                    </div>
                                    <Wishlist is_wishlist={props.data.is_wishlist} mi_id={props.data.mi_id} type={"M"} />
                                </div>
                                <div className="movie_genres">
                                    {props.data.mi_genre.split(',').map((genre, idx) => {
                                        return (
                                            <div className="movie_genre" key={"genre_" + idx}>{genre}</div>
                                        )
                                    })} 
                                </div>
                                <div className="movie_summary">
                                    {props.data.mi_summary}
                                </div>
                                <div className="movie_shortcut">
                                    {props.data.mi_provider.split(',').filter((p) => p !== 'NONE').map((platform, idx) => {
                                        const ottName:string = platform.trim();
                                        return (
                                            <Style.PlatformBadge $image={ottName} key={"ott_" + idx} onClick={() => onClickOttRedirect(ottName)} />
                                        )
                                    })} 
                                </div>
                            </div>
                            <div className="modal_content_right">
                                {scoreList.filter(rate => rate.score !== 0).map((rate, idx) => {
                                    const score = rate.name === 'IMDB' || rate.name === 'TMDB' ? rate.score * 10 : rate.score;
                                    return (
                                        <Style.RatingBadge $score={score} key={"ott_" + idx}>
                                            <div className="rating_score">
                                                <img src={defaultImageUrl + "/platform/" + rate.name + ".svg"} alt="rating_platform" />
                                                <div className="score_detail">
                                                    <div className="score_view">
                                                        {rate.name === 'IMDB' || rate.name === 'TMDB' ? score / 10 : score}{rate.name === 'TOMATO' ? '%' : ''}
                                                    </div>
                                                    <div className="score_title">
                                                        {rate.name === 'TOMATO' ? 'Tomatometer' : rate.name === 'METACRITIC' ? 'Metascore' : rate.name}
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
                                    )
                                })} 
                            </div>
                        </div>
                    </div>
                </Style.ModalContent>
            </Style.ModalContainer>
        </Style.ModalOverlay>
    )
}

export default Modal;
