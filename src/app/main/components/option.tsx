'use client'

import * as Style from "./option.style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChild as personnel_solo,
    faUserGroup as personnel_freind,
    faChildren as personnel_couple,
    faUsers as personnel_family,
    faCheck as check,
} from "@fortawesome/free-solid-svg-icons";
import {
    faMeh as motion_normal,
    faLaugh as motion_happy,
    faSadTear as motion_sad,
    faAngry as motion_angry,
    faGrimace as motion_petulance,
    faLaughSquint as motion_excited,
    faDizzy as motion_unrest,
    faFrown as motion_helpless,
    faTired as motion_tired,
} from "@fortawesome/free-regular-svg-icons";

import { useEffect, useState } from "react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getOptionAllQuery } from "@/app/queries/getOptionQuery";
import useSupabaseBrowser from "@/app/supabase/supabase-browser";
import axios from "axios";

import useMainProcessStore from "../../stores/useMainProcessStore";
import useMovieListStore from "../../stores/useMovieListStore";

const Option = () => {
    const supabase = useSupabaseBrowser();

    const { process, setProcess, optionArr, setOptionArr, removeOptionArr, selectPersonnel, optionClean, isLoading, setIsLoading } = useMainProcessStore();
    const { setMovieLogId } = useMovieListStore();

    const { data: optionAll } = useQuery(getOptionAllQuery(supabase), { staleTime: Infinity, gcTime: 1000 * 60 * 60 });

    const [optionData, setOptionData] = useState<{option_title:string}[]>([]);

    const STEP_TITLES = ['', '누구와 함께 보나요?', '지금 기분이 어때요?', '어떤 장르가 좋아요?'];
    const STEP_SUBS   = ['', '인원을 선택하세요', '현재 감정을 선택하세요 (최대 2개)', '장르를 선택하세요 (최대 3개)'];

    const recommendMovieActive = () => {
        if (isLoading) return;
        setIsLoading(true);

        axios({
            method: "POST",
            url: "/local/api/movie/recommend",
            data: { userId: localStorage.getItem('user_id'), option: optionArr },
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            withCredentials: true,
        }).then((res): void => {
            if (res.data !== null || res.data.length !== 0) {
                setMovieLogId(res.data);
                optionClean(4);
                setIsLoading(false);
            } else {
                alert("서버를 확인해주세요.");
            }
        }).catch((err): void => {
            alert("서버를 확인해주세요.");
            console.log(err.message);
            optionClean(0);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const selectOptionItem = (optionId:string, optionType:string, optionTitle:string) => {
        if (optionArr.some(item => item.id === optionId)) {
            removeOptionArr(optionId);
        } else {
            if (process === 1) {
                selectPersonnel(optionId, optionType, optionTitle);
            } else {
                setOptionArr(optionId, optionType, optionTitle);
            }
        }
    }

    const selectNextOption = () => {
        if (process === 1) {
            if (!optionArr.some(item => item.type === 'P')) {
                alert('최소 1개 선택해주세요.');
            } else {
                setProcess(process + 1);
            }
        } else if (process === 2) {
            if (!optionArr.some(item => item.type === 'M')) {
                alert('최소 1개 선택해주세요.');
            } else {
                setProcess(process + 1);
            }
        }
    }

    useEffect(() => {
        if (process > 0) setOptionData([]);
        setTimeout(() => {
            if (!!optionAll) {
                if (process === 1) setOptionData(optionAll.filter((item) => item.option_type === 'P'));
                else if (process === 2) setOptionData(optionAll.filter((item) => item.option_type === 'M'));
                else if (process === 3) setOptionData(optionAll.filter((item) => item.option_type === 'G'));
            }
        }, 100)
    }, [process, optionAll])

    return (
        <Style.OverlayStyle $process={process}>
            <Style.OptionStyle $process={process}>
                <button className="modal_close" onClick={() => optionClean(0)}>✕</button>

                {/* 진행 바 */}
                <div className="option_progress">
                    {[1, 2, 3].map((step) => (
                        <Style.ProgressStep
                            key={step}
                            $active={process === step}
                            $done={process > step}
                        />
                    ))}
                </div>

                <div className="option_step_title">{STEP_TITLES[process]}</div>
                <div className="option_step_sub">{STEP_SUBS[process]}</div>

                {/* 옵션 아이템 */}
                <div className="option_view">
                    {optionData.map((item: any, idx) => (
                        <Style.OptionItem
                            key={idx}
                            $process={process}
                            $select={optionArr.some(option => option.id === item.option_id)}
                            onClick={() => selectOptionItem(item.option_id, item.option_type, item.option_title)}
                        >
                            {
                                item.option_id === 'option_1'  ? <FontAwesomeIcon icon={personnel_solo}    className="option_icon" /> :
                                item.option_id === 'option_2'  ? <FontAwesomeIcon icon={personnel_freind}  className="option_icon" /> :
                                item.option_id === 'option_3'  ? <FontAwesomeIcon icon={personnel_couple}  className="option_icon" /> :
                                item.option_id === 'option_4'  ? <FontAwesomeIcon icon={personnel_family}  className="option_icon" /> :
                                item.option_id === 'option_5'  ? <FontAwesomeIcon icon={motion_normal}     className="option_icon" /> :
                                item.option_id === 'option_6'  ? <FontAwesomeIcon icon={motion_happy}      className="option_icon" /> :
                                item.option_id === 'option_7'  ? <FontAwesomeIcon icon={motion_sad}        className="option_icon" /> :
                                item.option_id === 'option_8'  ? <FontAwesomeIcon icon={motion_angry}      className="option_icon" /> :
                                item.option_id === 'option_9'  ? <FontAwesomeIcon icon={motion_petulance}  className="option_icon" /> :
                                item.option_id === 'option_10' ? <FontAwesomeIcon icon={motion_excited}    className="option_icon" /> :
                                item.option_id === 'option_11' ? <FontAwesomeIcon icon={motion_unrest}     className="option_icon" /> :
                                item.option_id === 'option_12' ? <FontAwesomeIcon icon={motion_helpless}   className="option_icon" /> :
                                item.option_id === 'option_13' ? <FontAwesomeIcon icon={motion_tired}      className="option_icon" /> : <></>
                            }
                            <div className="option_title">{item.option_title}</div>
                        </Style.OptionItem>
                    ))}
                </div>

                {/* 하단 버튼 */}
                <div className="option_next">
                    {process > 1 && (
                        <Style.NavBtn onClick={() => setProcess(process - 1)}>
                            뒤로
                        </Style.NavBtn>
                    )}
                    {process > 2 ? (
                        <Style.NavBtn $primary onClick={() => recommendMovieActive()}>
                            완료
                        </Style.NavBtn>
                    ) : (
                        <Style.NavBtn $primary onClick={() => selectNextOption()}>
                            다음
                        </Style.NavBtn>
                    )}
                </div>
            </Style.OptionStyle>
        </Style.OverlayStyle>
    )
}

export default Option;