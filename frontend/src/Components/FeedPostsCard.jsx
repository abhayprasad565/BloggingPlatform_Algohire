import React from 'react';
import { Link } from 'react-router-dom';

const PostsCard = ({ post }) => {

    let { createdAt = "", title = 0, content = "", _id = 0, author = 0, category = 0 } = post;
    return (
        <div className="box-border animate-fade-up animate-once  sm:w-[450px] w-full mx-3 my-3  overflow-hidden rounded-lg bg-white shadow">
            <img
                src={"https://images.unsplash.com/photo-1614899099690-3bd319d25f99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                className="aspect-video w-full object-cover "
                alt=""
            />
            <div className="p-4">
                <Link to={`/users/${author && author.username}`} className="hover:underline mb-1 text-sm text-primary-500">{author && author.firstName}  {author && author.lastName} • <time>{createdAt.substring(0, 10).split("-").reverse().join("-")}</time></Link>
                <Link to={`/posts/view/${_id}`}>
                    <h3 className="text-xl font-medium text-gray-900">{title}</h3>
                    <p className="mt-1 text-gray-500">{content.substring(0, 200)}</p>
                    <div className="mt-4 flex gap-2">
                        <span
                            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                        >
                            {category}
                        </span>
                    </div></Link>
            </div>
        </div>
    );
}


export default PostsCard;