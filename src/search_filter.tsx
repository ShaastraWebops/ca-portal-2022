import React from "react";
import "./search_filter.css";
import myFunction from "./search";

function App() {
  return (
    <div className="Body">
      <input
        type="text"
        id="myInput"
        onKeyUp={myFunction}
        placeholder="Search for CA.."
      />
      <table id="myTable">
        <tr>
          <td>dev</td>
          <td>88888888</td>
          <td>Aadsd@gmail.com</td>
          <td>XXXXXXX</td>
        </tr>
        <tr>
          <td>Rocky</td>
          <td>88888888</td>
          <td>Aadsd@gmail.com</td>
          <td>XXXXXXX</td>
        </tr>
        <tr>
          <td>Ganesh</td>
          <td>88888888</td>
          <td>Aadsd@gmail.com</td>
          <td>XXXXXXX</td>
        </tr>
        <tr>
          <td>Sanjay</td>
          <td>88888888</td>
          <td>Aadsd@gmail.com</td>
          <td>XXXXXXX</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
