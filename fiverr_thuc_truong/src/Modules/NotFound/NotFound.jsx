import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../Routes/path";
const NotFound = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(PATH.HOME);
  };
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1 text-404">
                <div className="four_zero_four_bg">
                  <h1 className="text-404">404 </h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>
                  <br />

                  <p>the page you are looking for not avaible!</p>

                  <a href="" className="link_404" onClick={goToHome}>
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
