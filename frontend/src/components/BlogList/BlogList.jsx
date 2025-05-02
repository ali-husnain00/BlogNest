import React from 'react'
import "./BlogList.css"

const BlogList = () => {
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
                <div className="blog">
                    <div className="image">
                        <img src="/images/img1.png" alt="Image" />
                    </div>
                    <div className="info">
                        <div className='authandcat'>
                            <p>Author: Ali</p>
                            <p>Category: Sports</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
                        <button className='read-btn'>Read more...</button>
                    </div>
                </div>
                <div className="blog">
                    <div className="image">
                        <img src="/images/img1.png" alt="Image" />
                    </div>
                    <div className="info">
                        <div>
                            <p>Author: Ali</p>
                            <p>Category: Sports</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
                        <button className='read-btn'>Read more...</button>
                    </div>
                </div>
                <div className="blog">
                    <div className="image">
                        <img src="/images/img1.png" alt="Image" />
                    </div>
                    <div className="info">
                        <div>
                            <p>Author: Ali</p>
                            <p>Category: Sports</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
                        <button className='read-btn'>Read more...</button>
                    </div>
                </div>
                <div className="blog">
                    <div className="image">
                        <img src="/images/img1.png" alt="Image" />
                    </div>
                    <div className="info">
                        <div>
                            <p>Author: Ali</p>
                            <p>Category: Sports</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
                        <button className='read-btn'>Read more...</button>
                    </div>
                </div>
                <div className="blog">
                    <div className="image">
                        <img src="/images/img1.png" alt="Image" />
                    </div>
                    <div className="info">
                        <div>
                            <p>Author: Ali</p>
                            <p>Category: Sports</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
                        <button className='read-btn'>Read more...</button>
                    </div>
                </div>
                <div className="blog">
                    <div className="image">
                        <img src="/images/img1.png" alt="Image" />
                    </div>
                    <div className="info">
                        <div>
                            <p>Author: Ali</p>
                            <p>Category: Sports</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
                        <button className='read-btn'>Read more...</button>
                    </div>
                </div>
                <div className="blog">
                    <div className="image">
                        <img src="/images/img1.png" alt="Image" />
                    </div>
                    <div className="info">
                        <div>
                            <p>Author: Ali</p>
                            <p>Category: Sports</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
                        <button className='read-btn'>Read more...</button>
                    </div>
                </div>
                <div className="blog">
                    <div className="image">
                        <img src="/images/img1.png" alt="Image" />
                    </div>
                    <div className="info">
                        <div>
                            <p>Author: Ali</p>
                            <p>Category: Sports</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
                        <button className='read-btn'>Read more...</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogList