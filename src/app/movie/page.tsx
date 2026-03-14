'use client'

import * as Style from "./page.style";

import { useEffect, useState } from "react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getRecommendMovieListQuery } from "../queries/getMovieQuery";
import useSupabaseBrowser from "../supabase/supabase-browser";

import useMainProcessStore from "../stores/useMainProcessStore";

import Modal from "./components/modal";
import Wishlist from "./components/wishlist";
import Loading from "../main/components/loading";

const Movie = (props:{movieLogId:string}) => {
    const supabase = useSupabaseBrowser();

    const {setIsLoading} = useMainProcessStore();
    const [userId, setUserId] = useState<string | null>(null);

    const { data: movieList, isLoading: loading, isError: dataError, error: errorMsg } = useQuery(getRecommendMovieListQuery(supabase, props.movieLogId, userId));

    const [modalData, setModalData] = useState<{
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
    } | null>();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsLoading(false); 
        setIsMounted(true);
        const id = localStorage.getItem('user_id');
        setUserId(id || null);
    }, []);

    return (
        <Style.Movie>
            <div className="movie_header">
                
            </div>
            {
                !isMounted ? <Loading /> : loading ? <Loading /> :
                    <>
                        <div className="movie_body">
                            {modalData && (<Modal data={modalData} onClose={() => setModalData(null)} />)}
                            <div className="list_section">
                                {isMounted && movieList?.map((item, idx1) => {
                                    return (
                                        <Style.MovieCard $image={item.mp_poster} $idx={idx1} key={idx1} onClick={() => setModalData(item)}>
                                            <div className="card_container">
                                                <Wishlist is_wishlist={item.is_wishlist} mi_id={item.mi_id} type={"L"} />
                                                <div className="card_head">
                                                    <div className="card_image" />
                                                    <div className="card_effect" />
                                                </div>
                                                <div className="card_body">
                                                    <div className="card_ott">
                                                        {item.mi_provider.split(',').filter((p) => p !== 'NONE').map((platform, idx2) => {
                                                            return (
                                                                <Style.PlatformBadge $image={platform.trim()} key={platform + idx2} />
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="card_content">
                                                        <div className="card_genres">
                                                            {item.mi_genre.split(',').map((genre, idx3) => {
                                                                return (
                                                                    <div className="card_genre" key={"genre_" + idx3}>{genre}</div>
                                                                )
                                                            })}
                                                        </div>
                                                        <div className="card_title">{item.mi_title}</div>
                                                        <div className="card_year">{item.mi_release_date.split('-')[0]}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Style.MovieCard>
                                    )
                                })}
                            </div>
                            <div className="button_section">

                            </div>
                        </div>
                    </>
            }
        </Style.Movie>
    )
}

export default Movie;
