import React, { useState } from 'react';
import './CustomerSupport.css';

function CustomerSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [supportStatus, setSupportStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Query:', formData);
    setIsSubmitted(true);
    setSupportStatus('Pending'); // Example status
    setFormData({ name: '', email: '', query: '' });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Feedback:', formData.query);
    setIsFeedbackSubmitted(true);
    setFormData({ ...formData, query: '' });
  };

  return (
    <div className="customer-support-container">
      <h2>Customer Support</h2>

      {isSubmitted && (
        <div className="success-message">
          <p>Your query/issue has been submitted successfully! Our team will get back to you shortly.</p>
        </div>
      )}

      {isFeedbackSubmitted && (
        <div className="success-message">
          <p>Thanks for your feedback! We appreciate your input.</p>
        </div>
      )}

      <div className="support-sections">
        <div className="faq-section">
          <h3>Frequently Asked Questions (FAQ)</h3>
          <ul>
            <li><strong>How do I book a ticket?</strong> You can book a ticket by selecting the movie, showtime, and seat.</li>
            <li><strong>What do I do if my payment fails?</strong> Try re-entering your payment details or contact support for further assistance.</li>
            <li><strong>How can I cancel or refund my ticket?</strong> You can cancel your ticket by visiting the "My Bookings" section.</li>
          </ul>
        </div>

        <div className="live-chat-section">
          <h3>Live Chat Support</h3>
          <p>Click below to start a live chat with one of our support agents:</p>
          <button className="live-chat-button">Start Live Chat</button>
        </div>

        <div className="contact-info-section">
          <h3>Contact Information</h3>
          <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
          <p>Phone: +1 800-123-4567</p>
          <p>Support Hotline: 1-800-SUPPORT</p>
        </div>

        <div className="ticket-system-section">
          <h3>Help Desk</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="query"
              placeholder="Describe your issue"
              value={formData.query}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit Issue</button>
          </form>
        </div>

        <div className="support-status-section">
          <h3>Check Support Status</h3>
          <p>Status of your issue: <strong>{supportStatus}</strong></p>
        </div>

        <div className="help-articles-section">
          <h3>Help Articles & Guides</h3>
          <ul>
            <li><a href="/help/how-to-book">How to Book a Movie Ticket</a></li>
            <li><a href="/help/payment-issues">Troubleshooting Payment Issues</a></li>
            <li><a href="/help/seat-selection">How to Select Seats</a></li>
          </ul>
        </div>

        <div className="refund-cancellation-section">
          <h3>Refund & Cancellation Policies</h3>
          <p><strong>Refund Policy:</strong> Tickets can be refunded within 24 hours of booking.</p>
          <p><strong>Cancellation Policy:</strong> You can cancel your tickets anytime before the showtime for a full refund.</p>
        </div>

        <div className="social-media-section">
          <h3>Follow Us on Social Media</h3>
          <ul>
            <li><a href="https://www.facebook.com/yourcinema">Facebook</a></li>
            <li><a href="https://twitter.com/yourcinema">Twitter</a></li>
            <li><a href="https://www.instagram.com/yourcinema">Instagram</a></li>
          </ul>
        </div>

        <div className="feedback-section">
          <h3>User Feedback</h3>
          <p>We value your feedback! Please let us know how we can improve our customer support:</p>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              name="query"
              placeholder="Your Feedback"
              value={formData.query}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit Feedback</button>
          </form>
        </div>

        <div className="operating-hours-section">
          <h3>Operating Hours</h3>
          <p><strong>Monday to Friday:</strong> 9:00 AM to 6:00 PM</p>
          <p><strong>Saturday and Sunday:</strong> 10:00 AM to 4:00 PM</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerSupport;
