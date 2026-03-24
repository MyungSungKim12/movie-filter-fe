import styled from "styled-components";

export const Main = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: linear-gradient(
        to right, 
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,1) 20%,
        rgba(0,0,0,0) 50%,
        rgba(0,0,0,1) 80%,
        rgba(0,0,0,1) 100%
        ), url('/Cinema.png');
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #05070A;
    color: white;

    .main_start {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        .main_button {
            position: absolute;
            top: 42%;
            padding: 24px 48px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            font-size: 1.5rem;
            font-weight: bold;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(3px);
            cursor: pointer;
            transition: 0.3s;

            &:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        }
    }
`