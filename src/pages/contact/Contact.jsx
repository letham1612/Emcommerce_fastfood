// Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, please contact us.</p>
      <form style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <label>Name:</label>
        <input type="text" placeholder="Your Name" />

        <label>Email:</label>
        <input type="email" placeholder="Your Email" />

        <label>Message:</label>
        <textarea placeholder="Your Message"></textarea>

        <button type="submit" style={{ marginTop: "10px" }}>Submit</button>
      </form>
    </div>
  );
};

export default Contact;
