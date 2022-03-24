import { useEffect, useState, useContext } from "react"
import * as Api from "../../api";
import { UserStateContext } from "../../App";

const UserLike = ({ user, isLikable }) => {

    const userState = useContext(UserStateContext);
    const loginUserId = userState.user?.id

    //포트폴리오 주인 User에 '좋아요(하트)' 누른 user.id 배열
    const [likeArr, setLikeArr] = useState(user.likes) 
    //likeArr의 길이 ('좋아요(하트)'의 개수)
    const [likeCnt, setLikeCnt] = useState(likeArr.length) 
    //loginUser가 '좋아요(하트)' 눌렀는지
    const [isLike, setIsLike] = useState(likeArr.includes(loginUserId))

    useEffect(() => {
        setLikeCnt(likeArr.length)
        setIsLike(likeArr.includes(loginUserId))
    }, [likeArr, loginUserId])

    const handleClick = async () => {      
        setIsLike(!isLike)
        const res = await Api.post("user/likes", {id: user.id}) // 좋아요를 받는 user.id
        setLikeArr(res.data.likes)
    }

    return (
        <>
            {isLikable && isLike && (<span onClick={handleClick}>💗</span>)}
            {isLikable && !isLike && (<span onClick={handleClick}>🖤</span>)}
            {!isLikable && (<span>💗</span>)}
            <span>{likeCnt}</span>    
        </>
    )
}

export default UserLike