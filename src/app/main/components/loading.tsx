'use client'

import styled, { keyframes, css } from "styled-components";
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

const MSG_INTERVAL = 3500;

/* ── 애니메이션 ──────────────────────────────── */
const slideUp = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
`;

// 마지막 단계 이후: 0→100% 후 다시 루프
const progressLoop = keyframes`
    0%   { width: 0%;   opacity: 1;   }
    85%  { width: 100%; opacity: 1;   }
    100% { width: 100%; opacity: 0.2; }
`;

// 일반 단계: 0→100% 1회
const progressOnce = keyframes`
    from { width: 0%; }
    to   { width: 100%; }
`;

// 커서 깜빡임
const blink = keyframes`
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
`;

// 로딩 점 바운스
const dotBounce = keyframes`
    0%, 80%, 100% { transform: translateY(0);   opacity: 0.3; }
    40%           { transform: translateY(-6px); opacity: 1;   }
`;

const spin = keyframes`
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
`;

const glowPulse = keyframes`
    0%, 100% { box-shadow: 0 0 0 0 rgba(229,9,20,0); }
    50%       { box-shadow: 0 0 16px 4px rgba(229,9,20,0.35); }
`;

/* ── Styled Components ───────────────────────── */
const LoadingOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: #0A0A0A;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    overflow: hidden;
`;

const PosterBg = styled.div<{ $url: string; $visible: boolean }>`
    position: absolute;
    inset: 0;
    background-image: url(${p => p.$url});
    background-size: cover;
    background-position: center;
    opacity: ${p => p.$visible ? 0.1 : 0};
    transition: opacity 1.2s ease;
    filter: blur(28px);
    transform: scale(1.1);
`;

const PosterSlide = styled.div<{ $visible: boolean }>`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 38%;
    opacity: ${p => p.$visible ? 1 : 0};
    transition: opacity 0.8s ease;
    mask-image: linear-gradient(to left, black 40%, transparent 100%);

    @media (max-width: 768px) { display: none; }
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
    animation: ${glowPulse} 2s ease-in-out infinite;
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
    display: flex;
    align-items: center;
    gap: 8px;
`;

const LabelSpinner = styled.div`
    width: 10px;
    height: 10px;
    border: 1.5px solid rgba(255,255,255,0.15);
    border-top-color: rgba(255,255,255,0.5);
    border-radius: 50%;
    animation: ${spin} 0.9s linear infinite;
`;

const MessageWrap = styled.div`
    min-height: 80px;
    display: flex;
    align-items: flex-start;

    @media (max-width: 768px) {
        min-height: 70px;
        justify-content: center;
    }
`;

const MessageText = styled.div`
    font-size: clamp(2rem, 3.5vw, 2.6rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.25;
    letter-spacing: -0.5px;
    animation: ${slideUp} 0.45s ease forwards;

    span { color: #E50914; }

    @media (max-width: 768px) { font-size: 2rem; }
`;

// 마지막 문구에서 깜빡이는 커서
const Cursor = styled.span<{ $show: boolean }>`
    display: ${p => p.$show ? 'inline-block' : 'none'};
    width: 3px;
    height: 0.9em;
    background: #E50914;
    border-radius: 2px;
    margin-left: 5px;
    vertical-align: middle;
    animation: ${blink} 1s step-end infinite;
`;

const ProgressWrap = styled.div`
    width: 100%;
    max-width: 320px;
    margin-top: 36px;
`;

const ProgressTrack = styled.div`
    width: 100%;
    height: 2px;
    background: rgba(255,255,255,0.07);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 14px;
`;

const ProgressBar = styled.div<{ $isLast: boolean; $duration: number }>`
    height: 100%;
    background: #E50914;
    border-radius: 2px;
    animation: ${p => p.$isLast
        ? css`${progressLoop} ${p.$duration}ms ease-in-out infinite`
        : css`${progressOnce} ${p.$duration}ms linear forwards`
    };
`;

const StepDots = styled.div`
    display: flex;
    gap: 6px;
    margin-bottom: 18px;
`;

const StepDot = styled.div<{ $active: boolean; $done: boolean }>`
    width: ${p => p.$active ? 20 : 6}px;
    height: 6px;
    border-radius: 3px;
    background: ${p => p.$done ? '#E50914' : p.$active ? '#E50914' : 'rgba(255,255,255,0.12)'};
    opacity: ${p => p.$active ? 1 : p.$done ? 0.5 : 1};
    transition: all 0.4s ease;
`;

// 마지막 문구 이후 바운싱 점 3개
const DotsWrap = styled.div<{ $show: boolean }>`
    display: ${p => p.$show ? 'flex' : 'none'};
    align-items: center;
    gap: 6px;
    height: 20px;
`;

const BounceDot = styled.div<{ $delay: number }>`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    animation: ${dotBounce} 1.2s ease-in-out ${p => p.$delay}ms infinite;
`;

/* ── 컴포넌트 ──────────────────────────────── */
const Loading = () => {
    const supabase = useSupabaseBrowser();
    const [msgIdx, setMsgIdx] = useState(0);
    const [posterIdx, setPosterIdx] = useState(0);
    const [posterVisible, setPosterVisible] = useState(true);
    const [animKey, setAnimKey] = useState(0); // progressBar 재시작용

    const isLast = msgIdx === MESSAGES.length - 1;

    const { data: posterData } = useQuery(
        getHeroPosterQuery(supabase),
        { staleTime: Infinity, gcTime: 1000 * 60 * 60 }
    );

    const posters = posterData?.map((p: any) => p.mp_poster).filter(Boolean) ?? [];

    // 메시지 순환 — 마지막 도달 후 텍스트는 고정, animKey는 계속 증가해서 progressBar 루프 유지
    useEffect(() => {
        const timer = setInterval(() => {
            setMsgIdx(prev => prev < MESSAGES.length - 1 ? prev + 1 : prev);
            setAnimKey(prev => prev + 1);
        }, MSG_INTERVAL);
        return () => clearInterval(timer);
    }, []);

    // 포스터 무한 순환
    useEffect(() => {
        if (posters.length === 0) return;
        const timer = setInterval(() => {
            setPosterVisible(false);
            setTimeout(() => {
                setPosterIdx(prev => (prev + 1) % posters.length);
                setPosterVisible(true);
            }, 600);
        }, MSG_INTERVAL);
        return () => clearInterval(timer);
    }, [posters.length]);

    const currentPoster = posters.length > 0 ? `${TMDB_BASE}${posters[posterIdx]}` : '';

    return (
        <LoadingOverlay>
            {currentPoster && <PosterBg $url={currentPoster} $visible={posterVisible} />}

            {currentPoster && (
                <PosterSlide $visible={posterVisible}>
                    <PosterImg $url={`https://image.tmdb.org/t/p/w500${posters[posterIdx]}`} />
                </PosterSlide>
            )}

            <Content>
                <LogoArea>
                    <LogoIcon>MF</LogoIcon>
                    <LogoText>Movie<span>Filter</span></LogoText>
                </LogoArea>

                <Label>
                    <LabelSpinner />
                    AI 분석 중
                </Label>

                <MessageWrap>
                    <MessageText key={msgIdx}>
                        {MESSAGES[msgIdx]}
                        <Cursor $show={isLast} />
                    </MessageText>
                </MessageWrap>

                <ProgressWrap>
                    <ProgressTrack>
                        {/* key로 재마운트 → isLast일 때 루프 애니메이션으로 전환 */}
                        <ProgressBar
                            key={animKey}
                            $isLast={isLast}
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

                    {/* 마지막 문구 이후 바운싱 점 3개 */}
                    <DotsWrap $show={isLast}>
                        <BounceDot $delay={0} />
                        <BounceDot $delay={160} />
                        <BounceDot $delay={320} />
                    </DotsWrap>
                </ProgressWrap>
            </Content>
        </LoadingOverlay>
    );
};

export default Loading;