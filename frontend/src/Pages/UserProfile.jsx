import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import user from '../Store/userInfo'
import { useParams } from 'react-router-dom';
import PostsCard from '../Components/PostsCard';
import errorPopup from '../Store/errorPopup';
import { useNavigate, Link } from 'react-router-dom';
const UserProfile = () => {
    const { username } = useParams();
    console.log(username);
    const [isOwner, setIsOwner] = useState(false);
    const userInfo = useRecoilValue(user);
    useEffect(() => setIsOwner(userInfo && username == userInfo.username), [userInfo]);
    return (
        <>
            <div className='h-fit md:h-[80vh] box-border p-2 flex flex-col md:flex-row items-start  w-screen bg-custom-background text-custom-textColor'>
                <div className="relative w-full sm:w-1/3 sm:min-h-[80vh] mt-16 min-w-0 break-words  mb-6 shadow-lg rounded-xl">
                    {isOwner &&
                        <span className="inline-flex w-fit ms-[80%] justify-end items-end -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                            <Link to={`/users/edit/${username}`}
                                className="inline-block border px-4 py-1 sm:py-2 text-sm font-medium text-custom-textColor hover:bg-custom-linkHover focus:relative"
                            >
                                Edit
                            </Link>
                        </span>}
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full flex justify-center">
                                <div className="relative">
                                    <img src="https://media.istockphoto.com/id/955036826/photo/3d-rendering-cool-emoji-with-sunglass-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=-_51nYYDQbq67nUwcsz6sz9NgcPtqGCCfQMCshb3dS8=" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
                                </div>
                            </div>
                            <div className="w-full text-center mt-20">
                                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                    <div className="p-3 text-center">
                                        <span className="text-md font-bold block uppercase tracking-wide text-custom-linkActive">{userInfo && userInfo.posts.length}</span>
                                        <span className="text-sm text-custom-textColor">Posts</span>
                                    </div>
                                    <div className="p-3 text-center">
                                        <span className="text-md font-bold block uppercase tracking-wide text-custom-linkActive">{userInfo && userInfo.createdAt.substring(0, 10).split("-").reverse().join("-")}</span>
                                        <span className="text-sm text-custom-textColor">Active Since</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <h3 className="text-2xl text-custom-linkActive font-bold leading-normal mb-1">{userInfo && userInfo.firstName + " " + userInfo.lastName}</h3>
                            <div className="text-xs mt-0 mb-2 text-custom-textColor font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-custom-textColor opacity-75"></i>@{userInfo && userInfo.username}
                            </div>
                        </div>
                        <div className="mt-6 py-6 border-t border-slate-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4">
                                    <p className="font-light text-left leading-relaxed text-custom-textColor mb-4">{userInfo && userInfo.about}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-2/3 p-4 flex flex-col max-h-[90vh] items-start justify-start'>
                    <div className='mb-6 text-custom-linkActive text-3xl underline underline-offset-4 font-bold'>{isOwner ? "Your Posts" : "Latest Posts"}</div>
                    <div className='w-full h-fit sm:h-full sm:overflow-y-auto custom-scrollbar'>
                        {userInfo && userInfo.posts.map((obj, index) => {
                            return <PostsCard post={obj} owner={isOwner} key={index} />
                        }
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}


export default UserProfile;
