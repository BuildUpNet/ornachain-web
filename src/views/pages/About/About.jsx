import Util from '../../../Utils';

export const About = () => {
  return (
    <>
      <Util.Component.Nav />

      {/* BREADCRUMB BANNER */}
      <div className="breadcrumb-banner">
        <p className="breadcrumb-text">About Us </p>
      </div>
      <section className="about-page py-5">
        <div className="container">
          {/* OUR COMPANY */}
          <div className="about-block">
            <h2 className="about-title">Our company</h2>
            <p className="about-text">
              Lorem ipsum dolor sit amet conse cteur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse cteur adipisicing elit. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          {/* OUR TEAM */}
          <div className="about-block">
            <h2 className="about-title">Our team</h2>
            <p className="about-text">Lorem set sint occaecat cupidatat non. Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
          </div>

          {/* TESTIMONIALS */}
          <div className="about-block">
            <h2 className="about-title">Testimonials</h2>

            <p className="about-quote">“Lorem ipsum dolor sit amet conse cteur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.”</p>

            <p className="about-quote">“Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet conse cteur adipisicing elit. Lorem ipsum dolor sit amet conse cteur adipisicing elit, sed do eiusmod.”</p>
          </div>
        </div>
      </section>
      <Util.Component.Footer />
    </>
  );
};
