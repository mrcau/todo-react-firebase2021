import React from 'react';

function Itemrow({item,items,setItems}) {
  return (
    <div className="itemrow">
      <div className="tehader">
        <h4>00</h4>
      </div>
      <div className="title">
        <h2>{item.title}</h2>
      </div>
      <div className="text">
        {item.text}
      </div>
      <div className="btnG">
        <button className="btn btn1">+</button>
        <button className="btn btn1">-</button>
        <button className="btn btn1">완료</button>
      </div>
    </div>
  );
}

export default Itemrow;