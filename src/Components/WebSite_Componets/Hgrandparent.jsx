import React from "react";
import Grandparent from "../../assets/Grandparent.png";
import Grandparent2img from "../../assets/Grandparent-2-img.png";
import Grandparent3img from "../../assets/Grandparent-3-img.png";
import Grandparent4mg from "../../assets/Grandparent-4-img.png";
import category2img from "../../assets/category2img.png";

function Hgrandparent() {
  return (
    <>
      <section className="New-setion-7">
        <div className="New-container">
          <div className="New-section-7-main">
            <div className="New-grandfather-New-section-7">
              <div className="New-grandfather-img">
                <img src={Grandparent} alt="" />
              </div>
              <div className="New-grandfather-title">
                <h2>Getest door opa en oma en geliefd door kinderen en kleinkinderen

</h2>
                <div className="New-grandfather-small-card">
                  <div className="New-pink-small-card">
                    <img src={category2img} alt="" />
                    <p>Typen of vertellen</p>
                  </div>
                  <div className="New-pink-small-card">
                    <img src={Grandparent3img} alt="" />
                    <p>Zonder wachtwoord	</p>
                  </div>
                  <div className="New-pink-small-card">
                    <img src={Grandparent4mg} alt="" />
                    <p>Geen downloads</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default Hgrandparent;
