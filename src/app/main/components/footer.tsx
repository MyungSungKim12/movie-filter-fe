'use client'

import styled, { keyframes, css } from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faXmark, faFilm } from "@fortawesome/free-solid-svg-icons";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const modalFadeIn = keyframes`
    from { opacity: 0; transform: scale(0.97) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
`;

const overlayFadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;

const FooterWrapper = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #0A0A0A;
    border-top: 1px solid rgba(172, 229, 255, 0.08);
    color: rgba(255, 255, 255, 0.5);
    z-index: 500;
    font-size: 1.1rem;
    animation: ${fadeIn} 0.4s ease both;
`;

const FooterInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 50px;
    height: 50px;
    gap: 16px;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
`;

const LogoMark = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    color: rgba(172, 229, 255, 0.7);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;

    svg {
        font-size: 1rem;
    }
`;

const Divider = styled.span`
    color: rgba(255, 255, 255, 0.12);
    font-size: 1rem;

    @media (max-width: 480px) {
        display: none;
    }
`;

const Copyright = styled.span`
    color: rgba(255, 255, 255, 0.25);
    font-size: 1rem;
    letter-spacing: 0.02em;

    @media (max-width: 480px) {
        display: none;
    }
`;

const CenterSection = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    @media (max-width: 600px) {
        display: none;
    }
`;

const FooterLink = styled.button`
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.35);
    font-size: 1rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    letter-spacing: 0.02em;
    transition: color 0.2s ease, background 0.2s ease;
    white-space: nowrap;

    &:hover {
        color: rgba(172, 229, 255, 0.9);
        background: rgba(172, 229, 255, 0.06);
    }
`;

const LinkDot = styled.span`
    color: rgba(255, 255, 255, 0.1);
    font-size: 0.8rem;
    padding: 0 2px;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
`;

const TeamLabel = styled.span`
    color: rgba(255, 255, 255, 0.2);
    font-size: 0.95rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-right: 6px;

    @media (max-width: 480px) {
        display: none;
    }
`;

const GithubBtn = styled.a`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid rgba(172, 229, 255, 0.12);
    background: rgba(172, 229, 255, 0.04);
    color: rgba(255, 255, 255, 0.4);
    font-size: 1rem;
    text-decoration: none;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    svg {
        font-size: 1.1rem;
        color: rgba(172, 229, 255, 0.6);
        transition: color 0.2s ease;
    }

    &:hover {
        background: rgba(172, 229, 255, 0.1);
        border-color: rgba(172, 229, 255, 0.35);
        color: rgba(255, 255, 255, 0.85);

        svg {
            color: #ACE5FF;
        }
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(6px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: ${overlayFadeIn} 0.25s ease both;
`;

const ModalBox = styled.div`
    position: relative;
    width: 100%;
    max-width: 620px;
    max-height: 80vh;
    background: #0F0F13;
    border: 1px solid rgba(172, 229, 255, 0.12);
    border-radius: 18px;
    box-shadow:
        0 0 0 1px rgba(172, 229, 255, 0.04),
        0 32px 64px rgba(0, 0, 0, 0.6),
        0 0 80px rgba(172, 229, 255, 0.04);
    display: flex;
    flex-direction: column;
    animation: ${modalFadeIn} 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 28px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.02em;
`;

const ModalCloseBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
        background: rgba(172, 229, 255, 0.1);
        border-color: rgba(172, 229, 255, 0.3);
        color: #ACE5FF;
    }
`;

const ModalBody = styled.div`
    padding: 24px 28px 28px;
    overflow-y: auto;
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.25rem;
    line-height: 1.8;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(172, 229, 255, 0.15);
        border-radius: 4px;
    }

    h3 {
        color: rgba(172, 229, 255, 0.9);
        font-size: 1.3rem;
        font-weight: 700;
        margin: 20px 0 8px;
        letter-spacing: 0.03em;

        &:first-child {
            margin-top: 0;
        }
    }

    p {
        margin-bottom: 10px;
        color: rgba(255, 255, 255, 0.5);
    }

    ul {
        padding-left: 18px;
        margin-bottom: 10px;

        li {
            color: rgba(255, 255, 255, 0.45);
            margin-bottom: 4px;
        }
    }

    .updated {
        display: inline-block;
        margin-top: 20px;
        padding: 6px 12px;
        border-radius: 6px;
        background: rgba(172, 229, 255, 0.06);
        border: 1px solid rgba(172, 229, 255, 0.1);
        color: rgba(172, 229, 255, 0.6);
        font-size: 1.1rem;
        letter-spacing: 0.03em;
    }
`;

const Footer = () => {
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    const currentYear = new Date().getFullYear();

    const TEAM_MEMBERS = [
        { name: "MyungSungKim12", url: "https://github.com/MyungSungKim12" },
    ];

    return (
        <>
            <FooterWrapper>
                <FooterInner>

                    <LeftSection>
                        <LogoMark>
                            <FontAwesomeIcon icon={faFilm} />
                            MovieFilter
                        </LogoMark>
                        <Divider>|</Divider>
                        <Copyright>© {currentYear} MovieFilter</Copyright>
                    </LeftSection>

                    <CenterSection>
                        <FooterLink onClick={() => setIsPrivacyOpen(true)}>
                            개인정보처리방침
                        </FooterLink>
                        <LinkDot>·</LinkDot>
                        <FooterLink
                            as="a"
                            href="https://github.com/MyungSungKim12/movie-filter-fe"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            FE Repository
                        </FooterLink>
                        <LinkDot>·</LinkDot>
                        <FooterLink
                            as="a"
                            href="https://github.com/MyungSungKim12/movie-filter-be"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            BE Repository
                        </FooterLink>
                        <LinkDot>·</LinkDot>
                        <FooterLink
                            as="a"
                            href="https://github.com/rlawo32/movie-filter-be"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            BE Repository
                        </FooterLink>
                    </CenterSection>

                    <RightSection>
                        <TeamLabel>Team</TeamLabel>
                        {TEAM_MEMBERS.map((member) => (
                            <GithubBtn
                                key={member.name}
                                href={member.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                                {member.name}
                            </GithubBtn>
                        ))}
                    </RightSection>

                </FooterInner>
            </FooterWrapper>

            {isPrivacyOpen && (
                <ModalOverlay onClick={() => setIsPrivacyOpen(false)}>
                    <ModalBox onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitle>개인정보처리방침</ModalTitle>
                            <ModalCloseBtn
                                onClick={() => setIsPrivacyOpen(false)}
                                aria-label="닫기"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </ModalCloseBtn>
                        </ModalHeader>
                        <ModalBody>
                            <h3>1. 수집하는 개인정보 항목</h3>
                            <p>MovieFilter는 서비스 제공을 위해 아래의 개인정보를 수집합니다.</p>
                            <ul>
                                <li>소셜 로그인 시: 이름, 이메일 주소, 프로필 이미지 (Google · Kakao · Naver 제공)</li>
                                <li>서비스 이용 시: 접속 IP, 영화 클릭 이력, 위시리스트 정보</li>
                            </ul>

                            <h3>2. 개인정보의 수집 및 이용 목적</h3>
                            <ul>
                                <li>회원 식별 및 서비스 제공</li>
                                <li>영화 추천 개인화 및 취향 분석</li>
                                <li>서비스 개선 및 이용 통계 분석</li>
                            </ul>

                            <h3>3. 개인정보의 보유 및 이용 기간</h3>
                            <p>
                                수집한 개인정보는 서비스 이용 기간 동안 보유하며, 회원 탈퇴 시 지체 없이 파기합니다.
                                단, 관계 법령에 따라 일정 기간 보존이 필요한 경우 해당 기간 동안 보관합니다.
                            </p>

                            <h3>4. 개인정보의 제3자 제공</h3>
                            <p>
                                MovieFilter는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.
                                단, 법령에 의한 경우는 예외로 합니다.
                            </p>

                            <h3>5. 외부 서비스 연동</h3>
                            <p>본 서비스는 아래 외부 서비스와 연동됩니다.</p>
                            <ul>
                                <li>TMDB API – 영화 정보 제공</li>
                                <li>Google OAuth / Kakao OAuth / Naver OAuth – 소셜 로그인</li>
                                <li>YouTube API / Naver 블로그 API – 리뷰 콘텐츠 제공</li>
                                <li>Supabase – 데이터 저장 및 인증</li>
                            </ul>

                            <h3>6. 개인정보 보호 책임자</h3>
                            <p>
                                개인정보 처리에 관한 문의는 아래 GitHub를 통해 연락하실 수 있습니다.
                            </p>
                            <ul>
                                <li>github.com/rlawo32</li>
                                <li>github.com/MyungSungKim12</li>
                            </ul>

                            <h3>7. 개인정보처리방침 변경</h3>
                            <p>
                                본 방침은 법령 및 서비스 정책 변경에 따라 개정될 수 있으며,
                                변경 시 서비스 내 공지를 통해 안내드립니다.
                            </p>

                            <span className="updated">최종 수정일: 2026년 3월 30일</span>
                        </ModalBody>
                    </ModalBox>
                </ModalOverlay>
            )}
        </>
    );
};

export default Footer;
