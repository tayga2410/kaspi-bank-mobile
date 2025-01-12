import React from "react";
import TransferItem from "./TransferItem";
import Calendar from '../../img/calendar.jpg'

const History = () => {
  const randomTransfers = [
    { id: 1, name: "Мария М.", amount: "8 000 ₸", date: "6 января" },
    { id: 2, name: "Петр П.", amount: "12 000 ₸", date: "4 января" },
    { id: 3, name: "Иван И.", amount: "5 000 ₸", date: "2 января" },
  ];

  return (
    <div className="history">
      <input className="transfers__input" type="text" placeholder="Поиск по переводам" />
      <span className="history__calendar"><img className="accordion__icon" src={Calendar} alt="" width={25} height={25} />2 января - 9 января</span>
      <ul className="history__list">
        {randomTransfers.map((transfer) => (
          <TransferItem key={transfer.id} transfer={transfer} />
        ))}
      </ul>
    </div>
  );
};

export default History;
