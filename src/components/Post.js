import React from 'react';


const Post = ({title,text,image,next,time}) => {
    return (
        <div className="post">
            <div className="post__image" style={{backgroundImage: `url(${image})` }}></div>
            <div className="post__info">
            <h2 className="post__title"><a href={next}>{title}</a></h2>
            <p>{time}</p>
                <p className="post__description">
                    {text.length >= 1800 ? text.substr(0,1800) : text}...
                </p>
            </div>
        </div>
      );
}
 
export default Post;