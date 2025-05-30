import React, { useContext, useEffect, useState } from 'react'
import "./BlogList.css"
import { BlogContext } from '../Context/Context'
import { useNavigate } from 'react-router';

const BlogList = () => {

    const { allBlogs, BASE_URL } = useContext(BlogContext);
    const [searchedVal, setSearchedVal] = useState("");
    const [searchedCategory, setSearchedCategory] = useState("all");
    
    const navigate = useNavigate();

    const searchedBlogs = allBlogs.filter((blog) => {
        const matchedSearch =  blog.title.toLowerCase().includes(searchedVal.toLowerCase());
        const matchedCategory = searchedCategory === "all" || blog.category.toLowerCase() === searchedCategory.toLowerCase();
        return matchedSearch && matchedCategory;
    })

    return (
        <div className='blogpage'>
            <div className="searchblog">
                <input type="text" placeholder='Search blog...' className='search' value={searchedVal} onChange={(e) =>setSearchedVal(e.target.value)} />
                <select className='filter' value={searchedCategory} onChange={(e) =>setSearchedCategory(e.target.value)}>
                    <option value="all">All blogs</option>
                    <option value="sports">Sports</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="business">Business</option>
                    <option value="programming">Programming</option> 
                </select>
            </div>

            <div className="bloglist">
                {
                    searchedBlogs.length > 0 ? (
                        searchedBlogs.map((blog) => (
                            <div className="blog" key={blog._id}>
                                <div className="blog-top">
                                <p className='author'>By <span>{blog.author}</span></p>
                                <p className='category'>{blog.category}</p>
                                </div>
                                <div className="image">
                                    <img src={`${BASE_URL}/uploads/${blog.coverImage}`} alt="blog" />
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