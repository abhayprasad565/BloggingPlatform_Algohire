import React from 'react';
import fetchData from '../Hooks/apiCall';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import user from '../Store/userInfo';
import errorPopup from '../Store/errorPopup';

function PostsCard({ post, owner }) {
    //console.log(post)
    let { createdAt, title, content, _id, author } = post;
    const date = new Date(createdAt);
    const navigate = useNavigate();
    const setError = useSetRecoilState(errorPopup)
    const handleDelete = async () => {
        // fetch params 
        const params = {
            method: 'DELETE',
            headers: {
                'Token': `${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            }
        }
        const res = await fetchData('/post/' + _id, params, setError);
        if (res) navigate("/profile/" + user, { replace: true });
    }
    return (
        <article className="flex bg-custom-background border transition hover:shadow-xl my-3 m-2">
            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                <time
                    datetime={createdAt}
                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                >
                    <span>{date.getFullYear()}</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>{date.getMonth() + "-" + date.getDay()}</span>
                </time>
            </div>

            <div className="hidden sm:block sm:basis-56">
                <img
                    alt="Guitar"
                    src={"https://images.unsplash.com/photo-1614899099690-3bd319d25f99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    className="aspect-square h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col items-end justify-between text-xs sm:text-md">
                {owner &&
                    <span className="z-10 sm:mb-[-30px] h-[30px] md:h-fit w-fit items-end overflow-hidden rounded-md border bg-custom-background shadow-sm">
                        <Link to={`/posts/edit/${_id}`}
                            className="inline-block border px-4 py-1 sm:py-2 text-sm font-medium text-custom-textColor hover:bg-custom-linkHover focus:relative"
                        >
                            Edit
                        </Link>
                        <button onClick={handleDelete}
                            className="inline-block px-4 border py-1 sm:py-2 text-sm font-medium text-custom-textColor hover:bg-custom-linkHover focus:relative"
                        >
                            Delete
                        </button>
                    </span>}
                <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <Link to={`/posts/view/${_id}`} >
                        <h3 className="font-bold uppercase text-gray-900">
                            {title}
                        </h3>
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-custom-textColor">
                        {content.substring(50)}
                    </p>
                </div>

                <div className="sm:flex sm:items-end sm:justify-end">
                    <Link
                        to={`/posts/view/${_id}`}
                        className="block bg-custom-btnBg px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                    >
                        Read Blog
                    </Link>
                </div>
            </div>
            {errorPopup}
        </article>
    )
}

export default PostsCard;
