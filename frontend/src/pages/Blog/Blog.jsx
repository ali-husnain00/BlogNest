import React from 'react'
import "./Blog.css"

const Blog = () => {
  return (
    <div className="blog-details-wrapper">
    <div className="blog-details-container">
      <h1 className="blog-title">The Power of Sports: Building Discipline, Character & Teamwork</h1>
      <p className="blog-meta">By <span className="author">Ali Husnain</span> · May 2, 2025 · Sports</p>

      <div className="blog-image-placeholder">
        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80"
          alt="Sports"
          className="blog-image"
        />
      </div>

      <div className="blog-content">
        <p>
          Sports have always been an integral part of human culture and development. From ancient civilizations to the modern Olympic Games,
          the power of sports to bring people together, challenge individuals, and develop character remains unmatched.
        </p>
        <p>
          One of the greatest benefits of engaging in sports is the discipline it fosters. Whether you're training for a marathon, playing
          cricket with friends, or practicing basketball drills, the routine builds consistency, time management, and personal accountability.
        </p>
        <p>
          Sports also teach teamwork. Every goal, every assist, every win is the result of cooperation, trust, and communication. Learning to
          work with others toward a common objective translates directly into real-world scenarios, from school group projects to workplace
          collaboration.
        </p>
        <p>
          Beyond the physical benefits like improved health and stamina, sports play a vital role in mental well-being. They reduce stress,
          improve focus, and foster a sense of achievement. Many athletes often describe the field or court as their escape—a space where they
          feel most alive and in control.
        </p>
        <p>
          In today's digital age, it's more important than ever to encourage youth to engage in physical activity. Sports provide a natural
          break from screens and social media, offering a more fulfilling and grounded way to spend time.
        </p>
        <p>
          Whether you are an aspiring professional or someone who plays just for fun, the lessons you gain from sports—perseverance, strategy,
          resilience—will last a lifetime. So, pick up a ball, tie your shoes, and get moving. Your body, mind, and future self will thank you.
        </p>
      </div>
    </div>
  </div>
  )
}

export default Blog