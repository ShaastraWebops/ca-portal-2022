import React from "react";
import "./Application.css";
import images1 from "./assets/demopic.jpg";
function Application() {
  return (
    <div className="Application">
      <div>
        <h1>APPLICATION</h1>
        <div className="flexdis">
          <div>
            <h2>PROFILE DETAILS :</h2>
            <h2 className="details">USER NAME</h2>
            <h2 className="details">EMAIL@gmail.com</h2>
          </div>
          <div>
            <img src={images1} alt="" />
          </div>
        </div>
        <div className="column">
          <div>
            <ul className="ul11">
              <li>
                <b>COLLEGE NAME :</b> COLLEGE NAME
              </li>
              <li>
                <b>COLLEGE ADDRESS :</b> COLLEGE ADDRESS
              </li>
              <li>
                <b>CITY :</b> CITY
              </li>
              <li>
                <b>STATE :</b> STATE
              </li>
              <li>
                <b>DEGREE:</b> DEGREE
              </li>
              <li>
                <b>BRANCH :</b> BRANCH
              </li>
              <li>
                <b>YEAR :</b> 2018
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <b>POSTAL ADDRESS:</b> POSTAL ADDRESS
              </li>
              <li>
                <b>CITY :</b> CITY
              </li>
              <li>
                <b>STATE :</b> STATE
              </li>
              <li>
                <b>PINCODE :</b> PINCODE
              </li>
              <li>
                <b>CONTACT NUMBER :</b> 9877867575
              </li>
              <li>
                <b>WHATSAPP NUMBER :</b> 985766564
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <h3 className="questionarise">OTHER GENERAL QUESTIONS</h3>
        <div className="questions">
          <h3>Were you a Shaastra CA previously?</h3>
          <div>
            <label>
              <input type="radio" name="choice-radio" />
              Yes
            </label>
            <label>
              <input type="radio" name="choice-radio" />
              No
            </label>
          </div>
          <p></p>
          <h3>If Your answer to the above question is yes, which year ?</h3>
          <p>2018</p>
          <h3>Which social media sites do you use? </h3>
          <p>
            Lorem ipsum dolor, sit amet reprehenderit accusantium illum sed
            doloribus quisquam
          </p>
          <h3> Facebook Profile Link: </h3>
          <p>
            link
            <link rel="stylesheet" href="styles.css" />
          </p>
          <h3> Why do you wish to become a Campus Ambassador? </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            modi laborum voluptatum, pariatur quibusdam doloribus dolorum fugit
            rerum excepturi nulla recusandae repellendus error cupiditate
            perferendis illum rem autem voluptatem ipsam?
          </p>
          <h3>
            Why do you think you are the right candidate for this position?
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            modi laborum voluptatum, pariatur quibusdam doloribus dolorum fugit
            rerum excepturi nulla recusandae repellendus error cupiditate
            perferendis illum rem autem voluptatem ipsam?
          </p>
          <h3>
            Do you have any past experience in handling Positions of
            Responsibility?{" "}
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            modi laborum voluptatum, pariatur quibusdam doloribus dolorum fugit
            rerum excepturi nulla recusandae repellendus error cupiditate
            perferendis illum rem autem voluptatem ipsam?
          </p>
          <label htmlFor="sfafaferfaef"></label>
          <select>
            <option>SOME USER NAME</option>
            <option>Coordinator1 </option>
            <option>Coordinator2 </option>
            <option>Coordinator3 </option>
          </select>
        </div>
      </div>
      <button className="submit">ACCEPT</button>
      <button className="decline">DECLINE</button>
    </div>
  );
}

export default Application;
