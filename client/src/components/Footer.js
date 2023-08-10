import { Helmet } from "react-helmet";

function Footer() {
  return (
    <section className="footer">
      <Helmet>
        <script src="https://developer.edamam.com/attribution/badge.js"></script>
      </Helmet>
      <div id="edamam-badge" data-color="transparent"></div>
    </section>
  )

}

export default Footer;