import React from "react";


const NasaImg = ({ nasa }) => {

  

    console.log(nasa);



    const pic = nasa.links[0].href

return (
    <div className="column is-12-mobile is-3-desktop is-4-tablet is-one-fifth-fullhd">
      <div className="nasa" className="card">
        {/* <h2 >{nasa.Title}</h2> */}
        <header className="card-header">
          <p className="card-header-title">
            {nasa.data[0].title}
          </p>
        </header>
        <div className="card-image click">
          {/* <form className="js-modal-trigger" onClick={handleToggle} data-target="modal"> */}
            <figure className="image is-2by3">
              <img
                width="200"
                alt={`The image titled: ${nasa.data[0].title}`}
                src={pic}
            />
            </figure>
          {/* </form> */}
        </div>
        <footer className="card-footer">
          
        </footer>
        
      </div>

    </div>
  );
};


export default NasaImg;