import React from 'react'
import verhallimg from '../../assets/2.png'
import verhallimg1 from '../../assets/22.png'
function Hverhaal() {
    return (
        <>
        <section className='New-section-8'>
            <div className="New-container">
                <div className="main-New-section-8">
                    <div className="title-peragraph-img-main">
                        <div className="title-New-section-8">
                            <h2>Wie zijn wij?</h2>
                            <p>Sinds 2020 is Ongeschreven Leven dé plek waar verhalen tot leven komen en blijvend worden gekoesterd. Wij verbinden mensen door herinneringen vast te leggen en generaties dichter bij elkaar te brengen. Zo helpen we niet alleen waardevolle momenten te bewaren, maar ook eenzaamheid te doorbreken. Welkom bij Ongeschreven Leven!</p>
                            {/* <button>Lees meer</button> */}
                        </div>
                        <div className="img-New-section-8">
                            <img src={verhallimg}  alt="" className='destok-img-show'/>
                            <img src={verhallimg1} alt="" className='mobile-img-show' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
     
        </>
    )
}

export default Hverhaal
