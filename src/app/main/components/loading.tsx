'use client'

import styled, { keyframes, css } from "styled-components";

const rotator = keyframes` 
    0% { transform: rotate(0deg); }
    100% { transform: rotate(270deg); }
`;

const colors = keyframes` 
	0% { stroke: #4285F4; }
	25% { stroke: #DE3E35; }
    50% { stroke: #F7C223; }
    75% { stroke: #1B9A59; }
    100% { stroke: #4285F4; }
`;

const dash = keyframes` 
    0% { stroke-dashoffset: 255; }
    50% {
        stroke-dashoffset: 64.5;
        transform:rotate(135deg);
    }
    100% {
        stroke-dashoffset: 255;
        transform:rotate(450deg);
    }
`;

const LoadingOverlay = styled('div')`
    position: fixed;
    top: 0; 
    left: 0;
    width: 100%; 
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .spinner {
        animation: ${rotator} 1.4s linear infinite;
    }

    .path {
        stroke-dasharray: 255, 270;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: ${dash} 1.4s ease-in-out infinite, ${colors} 5.6s ease-in-out infinite;
    }
`

const Loading = () => {
    return (
        <LoadingOverlay>
            <svg className="spinner" width="95px" height="95px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" fill="none" strokeWidth="10" strokeLinecap="round" cx="48" cy="48" r="41"></circle>
            </svg>
        </LoadingOverlay>
    )
}

export default Loading;