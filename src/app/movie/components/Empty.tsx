'use client'

import styled, { keyframes, css } from "styled-components";

import { useRouter } from 'next/navigation'

import useMainProcessStore from "../../stores/useMainProcessStore";

const EmptyStyle = styled('div')`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: none;
    color: #FFFFFF;
    overflow: hidden;
    text-align: center;

    .main_message {
        font-size: 1.8rem;
        font-weight: 700;
    }

    .sub_message {
        margin-top: 10px;
        font-size: 1rem;
        font-weight: 400;
        opacity: 0.8;
    }

    .home {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-bottom: 90px;
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

const Empty = () => {
    const router = useRouter()

    const {setProcess} = useMainProcessStore();

    const onClickRetry = () => {
        setProcess(0);
        router.push('/');
    }

    return (
        <EmptyStyle>
            <div className="main_message">현재 서비스가 점검 중이거나 연결이 원활하지 않습니다.</div>
            <div className="sub_message">서버와의 통신에 실패하여 정보를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</div>
            <div className="home">
                <button onClick={() => onClickRetry()}>다시하기<span></span></button>
            </div>
        </EmptyStyle>
    )
}

export default Empty;