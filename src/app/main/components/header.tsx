'use client'

import styled, { keyframes } from "styled-components";
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import axiosInstance from "../../lib/axiosInstance";
import useSupabaseBrowser from "../../supabase/supabase-browser";
import { getProfileImageQuery } from "../../queries/getMypageQuery";
import api from "@/app/axios";

interface CustomJwtPayload extends JwtPayload {
    sub?: string;
}

const Header = () => {
    const router = useRouter();
    const supabase = useSupabaseBrowser();

    const [isLoggedIn, setIsLoggedIn]     = useState(false);
    const [userEmail, setUserEmail]       = useState('');
    const [userName, setUserName]         = useState<string | null>(null);
    const [userId, setUserId]             = useState<string | null>(null);
    const [profileUrl, setProfileUrl]     = useState<string | null>(null);
    const [uploading, setUploading]       = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [uploadError, setUploadError]   = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef  = useRef<HTMLDivElement>(null);

    const checkLoginStatus = () => {
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        try {
            const decoded = jwtDecode<CustomJwtPayload>(token);
            if (decoded?.sub) {
                setIsLoggedIn(true);
                setUserEmail(decoded.sub);
            }
        } catch {
            localStorage.removeItem('accessToken');
            setIsLoggedIn(false);
        }
    };

    const fetchProfileImage = async (uid: string) => {
        try {
            const { data, error } = await getProfileImageQuery(supabase, uid);
            if (error) throw error;
            setProfileUrl(data?.ui_image ?? null);
            setUserName(data?.ui_name ?? null);
            const res = await api.get('/local/api/user/profile-image', {
                params: { userId: uid },
            });
            const url = res.data?.profileImageUrl;
            setProfileUrl(url && url.length > 0 ? url : null);
        } catch {
            setProfileUrl(null);
            setUserName(null);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            checkLoginStatus();
            const uid = localStorage.getItem('user_id');
            if (uid) {
                setUserId(uid);
                fetchProfileImage(uid);
            }
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !userId) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            setUploadError('JPG, PNG, WEBP, GIF 파일만 업로드 가능합니다.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('5MB 이하 파일만 업로드 가능합니다.');
            return;
        }

        setUploadError(null);
        setUploading(true);
        setDropdownOpen(false);

        try {
            const formData = new FormData();
            formData.append('files', file);
            formData.append('userId', userId);

            const res = await api.post('/local/api/user/uploadImage', formData);

            const newUrl = res.data?.profileImageUrl;
            if (newUrl && newUrl.length > 0) {
                setProfileUrl(newUrl);
            }
        } catch (err) {
            console.error('프로필 이미지 업로드 실패:', err);
            setUploadError('업로드에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleLogout = () => {
        if (!confirm('로그아웃 하시겠습니까?')) return;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
        setUserEmail('');
        setProfileUrl(null);
        setDropdownOpen(false);
        router.push('/');
    };

    return (
        <HeaderStyle>
            <LogoArea onClick={() => router.push('/')}>LOGO</LogoArea>

            <UserSection>
                {isLoggedIn ? (
                    <ProfileArea ref={dropdownRef}>
                        <EmailLabel>{userName ?? userEmail}님</EmailLabel>

                        <ProfileBtn
                            onClick={() => setDropdownOpen(prev => !prev)}
                            aria-label="프로필 메뉴"
                            $uploading={uploading}
                        >
                            {uploading ? (
                                <UploadSpinner />
                            ) : profileUrl ? (
                                <ProfileImg src={profileUrl} alt="프로필" />
                            ) : (
                                <DefaultAvatar>
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                                    </svg>
                                </DefaultAvatar>
                            )}
                        </ProfileBtn>

                        {dropdownOpen && (
                            <DropdownMenu>
                                <DropdownItem onClick={() => {
                                    setDropdownOpen(false);
                                    router.push('/mypage');
                                }}>
                                    마이페이지
                                </DropdownItem>

                                <DropdownDivider />

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <DropdownItem onClick={() => fileInputRef.current?.click()}>
                                    프로필 이미지 변경
                                </DropdownItem>

                                {uploadError && <ErrorMsg>{uploadError}</ErrorMsg>}

                                <DropdownDivider />

                                <DropdownItem $danger onClick={handleLogout}>
                                    로그아웃
                                </DropdownItem>
                            </DropdownMenu>
                        )}
                    </ProfileArea>
                ) : (
                    <NavButton onClick={() => router.push('/login')}>LOGIN</NavButton>
                )}
            </UserSection>
        </HeaderStyle>
    );
};

// ─── Styled Components ────────────────────────────────────────────────────────
const spin = keyframes`
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
`;

const HeaderStyle = styled.div`
    position: fixed;
    top: 0; left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    padding: 0 50px;
    background-color: #0F0F0F;
    color: white;
    z-index: 500;
    @media (max-width: 768px) { padding: 0 20px; }
`;
const LogoArea = styled.div`cursor: pointer; font-weight: 700; font-size: 16px; letter-spacing: 2px;`;
const UserSection = styled.div`display: flex; align-items: center; gap: 12px;`;
const EmailLabel = styled.span`font-size: 13px; color: #aaa; @media (max-width: 600px) { display: none; }`;
const ProfileArea = styled.div`position: relative; display: flex; align-items: center; gap: 12px;`;
const ProfileBtn = styled.button<{ $uploading: boolean }>`
    width: 34px; height: 34px; border-radius: 50%;
    border: 2px solid ${p => p.$uploading ? '#444' : 'rgba(255,255,255,0.25)'};
    background: #1a1a1a;
    cursor: ${p => p.$uploading ? 'default' : 'pointer'};
    overflow: hidden; padding: 0;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        border-color: ${p => p.$uploading ? '#444' : '#ffffff'};
        box-shadow: ${p => p.$uploading ? 'none' : '0 0 0 3px rgba(255,255,255,0.1)'};
    }
`;
const ProfileImg = styled.img`width: 100%; height: 100%; object-fit: cover; border-radius: 50%;`;
const DefaultAvatar = styled.div`width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #777; background: #2a2a2a;`;
const UploadSpinner = styled.div`
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.15);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;
const DropdownMenu = styled.div`
    position: absolute; top: calc(100% + 10px); right: 0;
    min-width: 160px; background: #1c1c1c;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    overflow: hidden; z-index: 1000;
    &::before {
        content: ''; position: absolute; top: -5px; right: 11px;
        width: 9px; height: 9px; background: #1c1c1c;
        border-left: 1px solid rgba(255,255,255,0.1);
        border-top: 1px solid rgba(255,255,255,0.1);
        transform: rotate(45deg);
    }
`;
const DropdownItem = styled.button<{ $danger?: boolean }>`
    display: block; width: 100%; padding: 11px 16px;
    text-align: left; background: none; border: none;
    color: ${p => p.$danger ? '#ff5555' : '#e5e7eb'};
    font-size: 13px; cursor: pointer; transition: background 0.15s ease;
    &:hover { background: ${p => p.$danger ? 'rgba(255,85,85,0.1)' : 'rgba(255,255,255,0.07)'}; }
`;
const DropdownDivider = styled.div`height: 1px; background: rgba(255,255,255,0.07); margin: 2px 0;`;
const ErrorMsg = styled.div`padding: 6px 16px; font-size: 11px; color: #ff6b6b; line-height: 1.4;`;
const NavButton = styled.button`
    background: none; border: 1px solid white; color: white;
    padding: 5px 15px; cursor: pointer; border-radius: 4px;
    font-size: 13px; transition: all 0.2s ease;
    &:hover { background-color: white; color: black; }
`;

export default Header;
