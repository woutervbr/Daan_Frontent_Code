import React from "react";

const Phero = ({ title ,para ,bold="normal"}) => {
    return (
        <section className="New-Producten">
            <div className="New-container">
                <div className="main-New-Producten">
                    <h2>{title}</h2>
                    {para && <p style={{marginTop:"10px",fontSize:"15px",fontWeight:bold}}>{para}</p>}
                </div>
            </div>
        </section>
    );
};

export default Phero;
