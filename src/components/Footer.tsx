const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <div className="footer-container">
          <div className="container">
            <p className="address">
              Melrose Place, 90210
              <br />
              USA
            </p>
            <ul className="footer-links">
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a className="terms-privacy" href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
