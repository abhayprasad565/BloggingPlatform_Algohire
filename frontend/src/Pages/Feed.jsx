import React, { useEffect, useState } from 'react';
import TrendingNavbar from '../Components/TrendingNavbar';
import { useParams } from 'react-router-dom'
import fetchData from '../Hooks/apiCall';
import errorPopup from '../Store/errorPopup';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import FeedPostsCard from '../Components/FeedPostsCard';

const Feed = () => {
    const category = useParams();
    const [posts, setPosts] = useState();
    const [trending, setTrending] = useState([]);
    const setError = useSetRecoilState(errorPopup);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFeed = async () => {
            const params = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token'),
                }
            }
            const res = await fetchData(`/post${category ? `?category=${category}` : "/"}`, params, setError);
            if (res) {
                // set profile owner
                setPosts(res.post);
                setTrending(res.trending);
            }
            else navigate("/login", { replace: true });
        }
        fetchFeed();
        console.log("feed");
    }, [])

    return (
        <>
            <TrendingNavbar trending={trending} />
            <div className='sm:text-xl  font-bold p-2 '>Trending Posts</div>
            {posts && posts.map((post) => {
                return <FeedPostsCard key={post._id} post={post} />
            })}
        </>
    );
}


export default Feed;
