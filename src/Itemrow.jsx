import React from 'react';

function Itemrow({item,items,fireApp}) {
  
  let counter = item.progress;
  const itemDel=() => {
    fireApp.itemDel(item.uid,item.dataId)
  }
  const plus = () => {
    counter<10&&counter++;
    fireApp.itemUp(item.uid,item.dataId,counter)
  }
  const minus = () => {
    counter>0&&counter--;
    fireApp.itemUp(item.uid,item.dataId,counter)
    
  }
  return (
    <div className="itemrow">
      <div className="theader">
        {item.today}
      </div>
      <div className="title">
        {item.title}
      </div>
      <div className="text">
        {item.text}
      </div>
      <div className="btnG">
        <button className="btn0">{item.progress}</button>
        <button className="btn btn1" onClick={plus}>+</button>
        <button className="btn btn2" onClick={minus}>-</button>
        <button className="btn btn3" onClick={itemDel}>완료</button>
      </div>
    </div>
  );
}

export default Itemrow;