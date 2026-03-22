'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginSuccess() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = searchParams.get('accessToken');

        if (token) {
            localStorage.setItem('accessToken', token);

            try {
                const payloadBase64 = token.split('.')[1];
                const payload = JSON.parse(atob(payloadBase64));
                if (payload?.sub) {
                    localStorage.setItem('user_id', payload.sub);
                    console.log('로그인 성공! user_id:', payload.sub);
                }
            } catch (e) {
                console.error('토큰 파싱 실패:', e);
            }

            router.push('/');
        } else {
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
