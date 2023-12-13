import React from 'react';

const Blogs = ({ blogs }) => {
  return (
    <div className="blog">
      {blogs.map((blog) => (
        <div className="content">
          <p className="date">{}</p>
          <div className="content1">
            <h3>{blog.title}</h3>
            <p className="para">{blog.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
