'use client'

import styled, { keyframes, css } from "styled-components";

import { useRouter } from 'next/navigation'

const glitch_swipe = keyframes` 
    0%,
    95% {
        transform: translate(0, 0);
        opacity: 1;
    }
    96% {
        transform: translate(-5px, 5px) skew(-5deg);
        opacity: 0.7;
    }
    97% {
        transform: translate(5px, -5px) skew(5deg);
        opacity: 0.7;
    }
    98% {
        transform: translate(-3px, 3px) skew(-3deg);
        opacity: 0.8;
    }
    99% {
        transform: translate(3px, -3px) skew(3deg);
        opacity: 0.8;
    }
    100% {
        transform: translate(0, 0);
        opacity: 1;
    }
`;

const NotFoundStyle = styled('div')`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: radial-gradient(circle, #1a1a1a, #000);
    font-family: Arial, sans-serif;
    color: #FFFFFF;
    overflow: hidden;
    text-align: center;

    .glitch {
        position: relative;
        display: inline-block;
        font-size: 8rem;
        font-weight: bold;
        text-transform: uppercase;
        /* animation: glitch-effect 1.5s infinite steps(1); */

        &::before,
        &::after {
            content: '404';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            color: #FFFFFF;
            background: transparent;
        }

        &::before {
            left: 2px;
            text-shadow: -3px 3px red;
            animation: ${glitch_swipe} 2.5s infinite steps(1);
        }

        &::after {
            left: -2px;
            text-shadow: 3px -3px cyan;
            animation: ${glitch_swipe} 2.5s infinite steps(1) reverse;
        }
    }

    .message {
        font-size: 1.4rem;
        margin-top: 20px;
        opacity: 0.7;
    }

    .home {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 20px;

        button {
            position: relative;
            flex: 1;
            width: 200px;
            padding: 10px 0;
            margin: 0 20px;
            border-radius: 3px;
            border: 1px solid rgba(255,255,255,0.6);
            color: rgba(255,255,255,0.9);
            text-decoration: none;
            text-align: center;
            overflow: hidden;
            transition: all 0.2s ease-in-out;
            z-index: 3;
            cursor: pointer;

            &:hover {
                border: 1px solid #ffffff;
                color: #121212;

                span {
                    width: 310px;
	                height: 310px;
                }
            }

            span {
                content: '';
                position: absolute;
                background: #fff;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 0;
                height: 0;
                border-radius: 50%;
                transition: all 0.5s ease;
                z-index: -1;
            }
        }
    }
`

const NotFound = () => {
    const router = useRouter()

    return (
        <NotFoundStyle>
            <div className="glitch">404</div>
            <div className="message">페이지를 찾을 수 없습니다.</div>
            <div className="home">
                <button onClick={() => router.push('/')}>홈으로<span></span></button>
            </div>
        </NotFoundStyle>
    )
}

export default NotFound;