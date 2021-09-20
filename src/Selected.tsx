import React from 'react';
import "./thank.css"

const Selected = () => {
    return (
        
        <div className="Bodyt" >
            <div className='Body_Item2t'>
                 <b>CONGRATULATIONS!!</b>
            </div>
            <div className='Style2t'>
                YOU ARE SELECTED AS A CA FOR SHAASTRA 2022. <a href="./"><span className='redt'>click here</span></a> to go to CA portal
            </div>
        </div>
    )
}

const Rejected = () => {
    return (
        
        <div className="Bodyt" >
            <div className='Body_Item2t'>
                 <b>CONGRATULATIONS!!</b>
            </div>
            <div className='Style2t'>
                YOU ARE SELECTED AS A CA FOR SHAASTRA 2022. <a href="./"><span className='redt'>click here</span></a> to go to CA portal
            </div>
        </div>
    )
}

export { Selected, Rejected }
