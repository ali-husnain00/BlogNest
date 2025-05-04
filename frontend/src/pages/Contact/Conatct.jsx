import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/contactus", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        alert('Message Sent! We will get back to you shortly.');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      }
      else {
        alert("An error occured while contact")
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>
          Have questions or feedback? We'd love to hear from you! Fill out the form below and we’ll get back to you as soon as
          possible.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
