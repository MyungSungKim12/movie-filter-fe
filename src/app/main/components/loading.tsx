'use client'

import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/app/supabase/supabase-browser";
import { getHeroPosterQuery } from "@/app/queries/getMovieQuery";

const TMDB_BASE = "https://image.tmdb.org/t/p/w300";

const MESSAGES = [
    "AI가 취향을 분석 중입니다...",
    "선택하신 감정을 살펴보고 있어요...",
    "완벽한 영화를 찾고 있어요...",
    "거의 다 됐어요, 조금만 기다려주세요!",
    "곧 영화 목록을 보여드릴게요 🎬",
];

const fadeIn = keyframes`
    from { opacity: 0; transform: scale(1.04); }
    to   { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
    from { opacity: 1; }
    to   { opacity: 0; }
`;

const slideUp = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const progressAnim = keyframes`
    from { width: 0%; }
    to   { width: 100%; }
`;

const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
`;

const LoadingOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: #0A0A0A;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

const PosterBg = styled.div<{ $url: string; $visible: boolean }>`
    position: absolute;
    inset: 0;
    background-image: url(${p => p.$url});
    background-size: cover;
    background-position: center;
    opacity: ${p => p.$visible ? 0.12 : 0};
    transition: opacity 1.2s ease;
    filter: blur(24px);
    transform: scale(1.08);
`;

const PosterSlide = styled.div<{ $visible: boolean }>`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 38%;
    opacity: ${p => p.$visible ? 1 : 0};
    transition: opacity 1s ease;
    mask-image: linear-gradient(to left, black 40%, transparent 100%);

    @media (max-width: 768px) {
        display: none;
    }
`;

const PosterImg = styled.div<{ $url: string }>`
    width: 100%;
    height: 100%;
    background-image: url(${p => p.$url});
    background-size: cover;
    background-position: center;
`;

const Content = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 480px;
    width: 100%;
    padding: 0 40px;

    @media (max-width: 768px) {
        align-items: center;
        text-align: center;
        padding: 0 24px;
    }
`;

const LogoArea = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 48px;
`;

const LogoIcon = styled.div`
    width: 32px;
    height: 32px;
    background: #E50914;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: -1px;
`;

const LogoText = styled.span`
    font-size: 1.6rem;
    font-weight: 800;
    color: #fff;
    span { color: #E50914; }
`;

const Label = styled.div`
    font-size: 1.1rem;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 16px;
`;

const Message = styled.div<{ $key: number }>`
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.25;
    letter-spacing: -0.5px;
    min-height: 80px;
    animation: ${slideUp} 0.5s ease forwards;
    key: ${p => p.$key};

    span { color: #E50914; }

    @media (max-width: 768px) {
        font-size: 2.2rem;
        min-height: 70px;
    }
`;

const ProgressWrap = styled.div`
    width: 100%;
    max-width: 320px;
    margin-top: 40px;
`;

const ProgressTrack = styled.div`
    width: 100%;
    height: 2px;
    background: rgba(255,255,255,0.08);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 12px;
`;

const ProgressBar = styled.div<{ $duration: number }>`
    height: 100%;
    background: #E50914;
    border-radius: 2px;
    animation: ${progressAnim} ${p => p.$duration}ms linear forwards;
`;

const StepDots = styled.div`
    display: flex;
    gap: 6px;
`;

const StepDot = styled.div<{ $active: boolean; $done: boolean }>`
    width: ${p => p.$active ? 20 : 6}px;
    height: 6px;
    border-radius: 3px;
    background: ${p => p.$done ? '#E50914' : p.$active ? '#E50914' : 'rgba(255,255,255,0.12)'};
    opacity: ${p => p.$active ? 1 : p.$done ? 0.6 : 1};
    transition: all 0.4s ease;
`;

const Spinner = styled.div`
    position: absolute;
    bottom: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.2rem;
    color: rgba(255,255,255,0.25);

    &::before {
        content: '';
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255,255,255,0.1);
        border-top-color: rgba(255,255,255,0.4);
        border-radius: 50%;
        animation: ${pulse} 1s linear infinite;
    }
`;

const MSG_INTERVAL = 3500;

const Loading = () => {
    const supabase = useSupabaseBrowser();
    const [msgIdx, setMsgIdx] = useState(0);
    const [posterIdx, setPosterIdx] = useState(0);
    const [visible, setVisible] = useState(true);

    const { data: posterData } = useQuery(
        getHeroPosterQuery(supabase),
        { staleTime: Infinity, gcTime: 1000 * 60 * 60 }
    );

    const posters = posterData?.map((p: any) => p.mp_poster).filter(Boolean) ?? [];

    // 메시지 순환
    useEffect(() => {
        const timer = setInterval(() => {
            setMsgIdx(prev => Math.min(prev + 1, MESSAGES.length - 1));
        }, MSG_INTERVAL);
        return () => clearInterval(timer);
    }, []);

    // 포스터 순환
    useEffect(() => {
        if (posters.length === 0) return;
        const timer = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setPosterIdx(prev => (prev + 1) % posters.length);
                setVisible(true);
            }, 600);
        }, MSG_INTERVAL);
        return () => clearInterval(timer);
    }, [posters.length]);

    const currentPoster = posters.length > 0 ? `${TMDB_BASE}${posters[posterIdx]}` : '';

    return (
        <LoadingOverlay>
            {/* 블러 배경 */}
            {currentPoster && <PosterBg $url={currentPoster} $visible={visible} />}

            {/* 우측 포스터 (데스크탑) */}
            {currentPoster && (
                <PosterSlide $visible={visible}>
                    <PosterImg $url={`https://image.tmdb.org/t/p/w500${posters[posterIdx]}`} />
                </PosterSlide>
            )}

            {/* 메인 콘텐츠 */}
            <Content>
                <LogoArea>
                    <LogoIcon>MF</LogoIcon>
                    <LogoText>Movie<span>Filter</span></LogoText>
                </LogoArea>

                <Label>AI 분석 중</Label>
                <Message key={msgIdx} $key={msgIdx}>
                    {MESSAGES[msgIdx]}
                </Message>

                <ProgressWrap>
                    <ProgressTrack>
                        <ProgressBar
                            key={msgIdx}
                            $duration={MSG_INTERVAL}
                        />
                    </ProgressTrack>
                    <StepDots>
                        {MESSAGES.map((_, i) => (
                            <StepDot
                                key={i}
                                $active={i === msgIdx}
                                $done={i < msgIdx}
                            />
                        ))}
                    </StepDots>
                </ProgressWrap>
            </Content>

            <Spinner>분석 중</Spinner>
        </LoadingOverlay>
    );
};

export default Loading;