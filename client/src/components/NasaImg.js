import React, { useState } from "react";


const NasaImg = ({ nasa }) => {

  const [like, setLike] = useState("is-primary is-outlined button fas fa-star")

  const handleClick = (e) => {
    if (like === "is-primary is-outlined button far fa-star") {
      setLike("is-primary is-outlined button fas fa-star")
      e.target.className = like
    } else {
      setLike("is-primary is-outlined button far fa-star")
      e.target.className = like
    }


  }

  // console.log(nasa);
  let date = new Date(nasa.data[0].date_created).toLocaleDateString(
    'en'
  )
  let description = nasa.data[0].description != nasa.data[0].title ? (nasa.data[0].description) : (null)

  let location = nasa.data[0].location != undefined ? (nasa.data[0].location) : (undefined)

  let center = nasa.data[0].center
  // console.log(nasa.data[0].center)

  const pic = nasa.links[0].href

  return (
    <div className="column is-12-mobile is-4-desktop is-4-tablet is-one-fifth-fullhd">
      <div className="nasa" className="card">
        <div className="card-header">
          <h3 className="card-header-title">
            <p >
              {nasa.data[0].title}
            </p>
          </h3>
          <h4 className="card-header-title">
            {date}
          </h4>
        </div>
        <div className="card-image click">
          <figure className="image is-2by2">
            <a href={pic}>
              <img
                width="200"
                alt={`The image titled: ${nasa.data[0].title}`}
                src={pic}
              />
            </a>
          </figure>
        </div>
        <div className="card-content">
          {location != undefined ? (
            <>
            <h4><strong>Photograph Location:</strong> <span>{location}</span></h4>
            </>
          ) :
          (
            <></>
          )}
          {center != undefined ? (
            <>
            <h4>Discovered by <span>{center}</span></h4>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="text content has-text-justified">
          {description != null ? (
            <>
              <p className="desc" dangerouslySetInnerHTML={{ __html: description }}>
              </p>
              <br></br>
            </>
          ) :
            (
              <br>
              </br>
            )}
        </div>
        <button className="is-primary is-outlined button far fa-star" onClick={handleClick}></button>
      </div>
    </div>
  );
};


export default NasaImg;