'use client'

import * as Style from "./wishlist.style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as favorite1 } from "@fortawesome/free-regular-svg-icons";
import { faHeart as favorite2 } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";

interface WishlistProps {
    is_wishlist: boolean;
    mi_id: string;
    type: string;
}

const Wishlist = (props: WishlistProps) => {

    const [isWishlist, setIsWishlist] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const wishlistActive = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const userId: string | null = localStorage.getItem('user_id');
        if (!userId) return alert("로그인이 필요합니다.");
        if (isLoading) return;

        setIsLoading(true);
        const previousState: boolean = isWishlist;
        setIsWishlist(!isWishlist);

        axiosInstance({
            method: "POST",
            url: "/local/api/user/wishlist",
            data: { uiId: userId, miId: props.mi_id },
            headers: { 'Content-type': 'application/json' }
        }).then((res): void => {
            console.log("서버 응답:", res.data);
        }).catch((err): void => {
            setIsWishlist(previousState);
            alert("서버를 확인해주세요.");
            console.error(err.message);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        setIsWishlist(props.is_wishlist);
    }, [props.is_wishlist]);

    return (
        <Style.WishlistStyle onClick={(e) => { wishlistActive(e); }} $isLoading={isLoading} $type={props.type}>
            {
                isWishlist ?
                    <FontAwesomeIcon icon={favorite2} className="icon_on" />
                    :
                    <FontAwesomeIcon icon={favorite1} className="icon_off" />
            }
        </Style.WishlistStyle>
    );
};

export default Wishlist;
