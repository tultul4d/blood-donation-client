
import "./Contact.css"
const Contact = () => {
    return (
        <section id="contact-us" className="contact-us">
            <div className="container">
                <h2>Contact Us</h2>
                <div className="contact-details  mt-10">
                    <form action="#" method="post" className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                    <div className="contact-info">
                        <p>Contact Number: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                    </div>
                </div>
            </div>
        </section>
    
    );
};

export default Contact;