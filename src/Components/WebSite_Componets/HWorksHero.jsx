import React from "react";
import workbg from '../../assets/workbg.png'



const HWorksHero = () => {
    return (
        <section className="HWorksHero">
            <div className="New-container">
                <div className="main-HWorksHero">
                    <div className="HWorksHero-tital">
                        <h3>Hoe het werkt</h3>
                        <h2>Verhalen vertellen was nog nooit zo eenvoudig</h2>
                        <p>Met Ongeschreven Leven leg je herinneringen vast in een stijlvol boek – persoonlijk, mooi en met aandacht gemaakt. Zonder haast, met plezier.</p>
                    </div>
                    <div className="HWorksHero-img">
                        <img src={workbg} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HWorksHero;
