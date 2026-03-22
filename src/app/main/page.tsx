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

const Main = ({ params }: MainProps) => {
    const router = useRouter();

    const { process, setProcess, isLoading, setIsLoading } = useMainProcessStore();
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
                {
                    isLoading ?
                        <Loading />
                        :
                    process === 0 ?
                        <div className="main_start">
                            <button className="main_button" onClick={() => setProcess(1)}>시작하기</button>
                        </div>
                        :
                    process > 0 && process < 4 ?
                        <Option />
                        :
                    process === 4 && id !== null ?
                        <Movie movieLogId={id} />
                        :
                        <></>
                }
            </Style.Main>
            <Footer />
        </>
    );
};

export default Main;
