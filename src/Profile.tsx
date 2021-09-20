// import React from "react";
// import user from "./assets/Ranveer-Singh.jpg";
// import "./Profile.css";
// import Header from "./Header";

// function Profile() {
//   return (
//     <>
//       <Header />
//       <div className="Profile">
//         <div className="Profile_details">
//           <div className="imgBox">
//             <img src={user} alt="" />
//           </div>
//           <div className="contentBox">
//             <h1>FULL NAME</h1>
//             <p>EMAIL@GMAIL.COM</p>
//             <p>INDIAN INSTITUTE OF TECHNOLOGY MADRAS, TAMIL NADU</p>
//             <p>CHENNAI ,TAMIL NADU - 444444</p>
//           </div>
//         </div>
//         <p className="Profile_status">
//           APPLICATION STATUS : <span>PENDING</span>
//         </p>
//         <div className="Profile_edit">
//           <form></form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Profile;

import './Profile.css';

import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from "./Header";
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


// import Pic from "./img/Picture3.png";
// import Pic2 from "./img/Picture2.png";

const Profile = () => {
    return (
      <>
      <Header />
        <div className='bodyp'>
        
            <div className='Part1p'> 
            <div className='P1L'>
                <div className='Cardp'>
                <img className='Top' src={'/assets/Picture3.png'} alt="Pic"  height='180' width='180' />
                <img className='End' src={'/assets/Picture2.png'} alt="Pic2"  height='180' width='180' />
                
                </div>
                <div> <b className='Style1p'>FULL NAME</b> </div>
                <div>EMAIL@GMAIL.COM</div>
                <div>INDIAN INSTITUTE OF TECNOLOGY</div>
                <div>MADRAS</div>
                <div>CA-REFERRAL CODE</div>
                {/* <div></div> */}
            </div>

            <div className='P1R'>
            <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
              
                <div> <span>POSITION  :  </span> someposition</div>
                <div>TOTAL POINTS EARNED : 30</div>
            </div>

            </div>
            <div className='Part2p'>
            <div className='PStyle2p'> TASK PENDING </div>
            <div className='PStyle3p'>
                 <p>TASK TITLE</p> <p>POINTS : 10</p> </div>
             <div className='PStyle3p'>
                 <p>TASK TITLE</p> <p>POINTS : 5</p> </div>
             <div className='PStyle3p'>
                 <p>TASK TITLE</p> <p>POINTS : 15</p> </div> 
             <div className='PStyle4p'>SEE MORE</div>
                    
            </div>
            <div className='Part3p'>
            <div className='PStyle2p'> TASK COMPLETED </div>
            <div className='PStyle3p'>
                 <p>TASK TITLE</p> <p>POINTS : 10</p> </div>
             <div className='PStyle3p'>
                 <p>TASK TITLE</p> <p>POINTS : 5</p> </div>
             <div className='PStyle3p'>
                 <p>TASK TITLE</p> <p>POINTS : 15</p> </div> 
                 <div className='PStyle4p'>SEE MORE</div>

            </div>
            
        </div>
        </>
    );
}

export default Profile;