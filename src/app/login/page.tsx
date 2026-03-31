// src/app/login/page.tsx
'use client';

import styles from './login.module.css';

export default function LoginPage() {
  const handleLogin = (provider: string) => {
    // 백엔드 서버 주소
    //const BACKEND_URL = 'http://localhost:8080';
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

    if (provider === 'google') {
      window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
    }else if (provider === 'kakao') {
      window.location.href = `${BACKEND_URL}/oauth2/authorization/kakao`;
    }else if (provider === 'naver') {
      window.location.href = `http://localhost:8080/oauth2/authorization/naver`;
    }else {
      alert(`${provider} 로그인은 준비 중입니다.`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgContainer}></div>
      
      <div className={styles.card}>
        <div className={styles.titleBox}>
          <h1>시작하기</h1>
        </div>

        <div className={styles.buttonBox}>
          {/* 구글 버튼 */}
          <button onClick={() => handleLogin('google')} className={`${styles.loginBtn} ${styles.btnGoogle}`}>
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="G" className={styles.icon} />
            Google로 시작하기
          </button>

          {/* 카카오 버튼 */}
          <button onClick={() => handleLogin('kakao')} className={`${styles.loginBtn} ${styles.btnKakao}`}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 3c-4.97 0-9 3.134-9 7 0 2.497 1.742 4.675 4.352 5.923l-.865 3.14c-.066.238.077.477.31.477a.51.51 0 00.25-.072l3.633-2.422c.433.054.873.082 1.32.082 4.97 0 9-3.134 9-7s-4.03-7-9-7z"/>
              </svg>
            </div>
            Kakao로 시작하기
          </button>

          {/* 네이버 버튼 */}
          <button onClick={() => handleLogin('naver')} className={`${styles.loginBtn} ${styles.btnNaver}`}>
            <div className={styles.icon}>
              <span style={{ fontWeight: '900', fontSize: '16px' }}>N</span>
            </div>
            Naver로 시작하기
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className={styles.footerLink}>다른 방법으로 로그인하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}