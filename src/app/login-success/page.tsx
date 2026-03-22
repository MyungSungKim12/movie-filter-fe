// src/app/login-success/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // 1. URL 파라미터에서 'token' 꺼내기
    const token = searchParams.get('accessToken');

    if (token) {
      // 2. 브라우저 로컬 스토리지에 토큰 저장
      localStorage.setItem('accessToken', token);
      
      console.log('로그인 성공! 토큰이 저장되었습니다.');

      // 3. 메인 페이지로 이동
      router.push('/');
    } else {
      // 토큰이 없으면 로그인 페이지로 다시 보냄
      console.error('토큰을 찾을 수 없습니다.');
      router.push('/login');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">로그인 처리 중...</h2>
        <p className="text-gray-500">잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
}