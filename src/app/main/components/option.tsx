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

    const {process, setProcess, optionArr, setOptionArr, removeOptionArr, selectPersonnel, optionClean, isLoading, setIsLoading} = useMainProcessStore();
    const { setMovieLogId } = useMovieListStore();

    const { data: optionAll } = useQuery(getOptionAllQuery(supabase), {staleTime: Infinity, gcTime: 1000 * 60 * 60});

    const [optionData, setOptionData] = useState<{option_title:string}[]>([]);

    const recommendMovieActive = () => {
        if(isLoading) return; 
        setIsLoading(true); 

        axios({
            method: "POST",
            url: "/local/api/movie/recommend",
            data: {userId: localStorage.getItem('user_id'), option: optionArr},
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            withCredentials: true,
        }).then((res):void => {
            console.log("서버 응답:", res.data);
            if(res.data !== null || res.data.length !== 0) {
                setMovieLogId(res.data);
                optionClean(4);
                setIsLoading(false);
            } else {
                alert("서버를 확인해주세요.");
            }
        }).catch((err):void => {
            alert("서버를 확인해주세요.");
            console.log(err.message);
            optionClean(0);
        }).finally(() => {
            setIsLoading(false); 
        });

    const selectOptionItem = (optionId:string, optionType:string, optionTitle:string) => {
        if(optionArr.some(item => item.id === optionId)) {
            removeOptionArr(optionId);
        } else {
            if(process === 1) {
                selectPersonnel(optionId, optionType, optionTitle);
            } else {
                setOptionArr(optionId, optionType, optionTitle);
            } 
        }
    }

    const selectNextOption = () => {
        if(process === 1) {
            if(!optionArr.some(item => item.type === 'P')) {
                alert('최소 1개 선택해주세요.');
            } else {
                setProcess(process+1);
            }
        } else if(process === 2) {
            if(!optionArr.some(item => item.type === 'M')) {
                alert('최소 1개 선택해주세요.');
            } else {
                setProcess(process+1);
            }
        } 
    }

    useEffect(() => {
        if(process > 0) setOptionData([]);
        setTimeout(() => {
            if(!!optionAll) {
                if(process === 1) {
                    setOptionData(optionAll.filter((item) => item.option_type === 'P'));
                } else if(process === 2) {
                    setOptionData(optionAll.filter((item) => item.option_type === 'M'));
                } else if(process === 3) {
                    setOptionData(optionAll.filter((item) => item.option_type === 'G'));
                }
            }
        }, 100)
    }, [process, optionAll])

    return (
        <Style.OverlayStyle $process={process}> 
            <Style.OptionStyle $process={process}>
                <button className="modal_close" onClick={() => optionClean(0)}>X</button>
                <div className="option_progress">
                    <Style.ProgressItem $process={process === 1 ? true : false}>
                        <div className="item_icon">
                            {process > 1 ? <FontAwesomeIcon icon={check} className="progress_icon" /> : <></>}
                        </div>
                        <div className="item_title">
                            인원
                        </div>
                    </Style.ProgressItem>
                    <Style.ProgressBar>
                        <Style.ProgressGauge $process={process > 1 ? true : false} />
                    </Style.ProgressBar>
                    <Style.ProgressItem $process={process === 2 ? true : false}>
                        <div className="item_icon">
                            {process > 2 ? <FontAwesomeIcon icon={check} className="progress_icon" /> : <></>}
                        </div>
                        <div className="item_title">
                            감정
                        </div>
                    </Style.ProgressItem>
                    <Style.ProgressBar>
                        <Style.ProgressGauge $process={process > 2 ? true : false} />
                    </Style.ProgressBar>
                    <Style.ProgressItem $process={process === 3 ? true : false}>
                        <div className="item_icon">
                            {process > 3 ? <FontAwesomeIcon icon={check} className="progress_icon" /> : <></>}
                        </div>
                        <div className="item_title">
                            장르
                        </div>
                    </Style.ProgressItem>
                </div>
                <div className="option_view">
                    {
                        optionData.map((item:any, idx) => {
                            return (
                                <Style.OptionItem key={idx} $process={process} $select={optionArr.some(option => option.id === item.option_id)}
                                                  onClick={() => selectOptionItem(item.option_id, item.option_type, item.option_title)} >
                                    {
                                        item.option_id === 'option_1' ? <FontAwesomeIcon icon={personnel_solo} className="option_icon" /> :
                                        item.option_id === 'option_2' ? <FontAwesomeIcon icon={personnel_freind} className="option_icon" /> :
                                        item.option_id === 'option_3' ? <FontAwesomeIcon icon={personnel_couple} className="option_icon" /> :
                                        item.option_id === 'option_4' ? <FontAwesomeIcon icon={personnel_family} className="option_icon" /> :
                                        item.option_id === 'option_5' ? <FontAwesomeIcon icon={motion_normal} className="option_icon" /> :
                                        item.option_id === 'option_6' ? <FontAwesomeIcon icon={motion_happy} className="option_icon" /> :
                                        item.option_id === 'option_7' ? <FontAwesomeIcon icon={motion_sad} className="option_icon" /> :
                                        item.option_id === 'option_8' ? <FontAwesomeIcon icon={motion_angry} className="option_icon" /> :
                                        item.option_id === 'option_9' ? <FontAwesomeIcon icon={motion_petulance} className="option_icon" /> :
                                        item.option_id === 'option_10' ? <FontAwesomeIcon icon={motion_excited} className="option_icon" /> :
                                        item.option_id === 'option_11' ? <FontAwesomeIcon icon={motion_unrest} className="option_icon" /> :
                                        item.option_id === 'option_12' ? <FontAwesomeIcon icon={motion_helpless} className="option_icon" /> :
                                        item.option_id === 'option_13' ? <FontAwesomeIcon icon={motion_tired} className="option_icon" /> : <></>
                                    }
                                    <div className="option_title">{item.option_title}</div>
                                </Style.OptionItem>
                            )  
                        })
                    }
                </div>
                <div className="option_next">
                    {
                        process > 1 ?
                            <button onClick={() => setProcess(process-1)}>
                                뒤로
                            </button>
                            :
                            <></>
                    }
                    {
                        process > 2 ? 
                            <button onClick={() => recommendMovieActive()}>
                                완료
                            </button>
                            : 
                            <button onClick={() => selectNextOption()}>
                                다음
                            </button>
                    }
                </div>
            </Style.OptionStyle>
        </Style.OverlayStyle>
    )
}

export default Option;