import React, { useContext } from 'react'
import "./BlogList.css"
import { BlogContext } from '../Context/Context'
import { useNavigate } from 'react-router';

const BlogList = () => {

    const { allBlogs } = useContext(BlogContext);
    const navigate = useNavigate();

    return (
        <div className='blogpage'>
            <div className="searchblog">
                <input type="text" placeholder='Search blog...' className='search' />
                <select className='filter'>
                    <option value="select">Select</option>
                    <option value="sports">Sports</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                </select>
            </div>

            <div className="bloglist">
                {
                    allBlogs.length > 0 ? (
                        allBlogs.map((blog) => (
                            <div className="blog" key={blog._id}>
                                <div className="blog-top">
                                <p className='author'>By <span>{blog.author}</span></p>
                                <p className='category'>{blog.category}</p>
                                </div>
                                <div className="image">
                                    <img src={`http://localhost:3000/uploads/${blog.coverImage}`} alt="blog" />
                                </div>
                                <div className="info">
                                    <h4>{blog.title}</h4>
                                </div>
                                <div className="read-more-btn">
                                <button onClick={() =>navigate(`/blog/${blog._id}`)}>Read more</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h3>No Blogs Found</h3>
                    )
                }
            </div>

        </div>
    )
}

export default BlogList