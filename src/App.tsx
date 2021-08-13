import React from "react";
import "./App.css";
import image from "./images/demopic.jpg";
import bg1 from "./images/nature.jpg";
import bg2 from "./images/nature2.jpg";
import bg3 from "./images/nature3.jpg";

const images = [
  { url: image },
  { url: image },
  { url: image },
  { url: image },
  { url: image },
  { url: image },
  { url: image },
];
function App() {
  return (
    <div>
      <div>
        <h1>WHY JOIN US</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit ut aliquam, purus sit amet luctus
          venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
          aliquam, purus sit amet luctus venenatis. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit ut aliquam, purus sit amet luctus
          venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
          aliquam, purus sit amet luctus venenatis
        </p>
      </div>
      <div>
        <h1>PRIZES</h1>
        <div className="picture">
          <img src={image} alt="profile" />
          <img src={image} alt="profile" />
          <img src={image} alt="profile" />
          <img src={image} alt="profile" />
          <img src={image} alt="profile" />
          <img src={image} alt="profile" />
        </div>
      </div>
      <div>
        <h1>TESTIMONIAL</h1>
        {/* <div>
          <div className="Slideshow-container">
            <div className="Myslide-fade">
              <img src={bg1} alt="slideshow pic" />
            </div>
            <div className="Myslide-fade">
              <img src={bg2} alt="slideshow pic" />
            </div>
            <div className="Myslide-fade">
              <img src={bg3} alt="slideshow pic" />
            </div>
            <div className="Myslide-fade">
              <img src={bg1} alt="slideshow pic" />
            </div>
            <a className="prev">&#10094;</a>
            <a className="next">&#10095;</a> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
