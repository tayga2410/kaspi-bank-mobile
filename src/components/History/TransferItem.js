import React from "react";
import UserIcon from "../../img/user-icon.svg";
import ArrowRight from '../../img/arrow-right.png'

const TransferItem = ({ transfer }) => {
  return (
    <li className="transfer-history__item">
      <p>
        <strong>{transfer.date}</strong>
      </p>
      <div className="transfer-history__container">
      <div className="transfer-history__item-wrapper">
        <img className="accordion__icon" src={UserIcon} alt="" width={25} height={25} />
        <div className="transfer-history__text-wrapper">
        <span>Kaspi Gold</span>
        <p><img src={ArrowRight} width={15} height={10} alt="" />
          {transfer.name}</p>
        <span className="transfer-history__text">Клиенту Kaspi</span>
        </div>
      </div>
        <p>{transfer.amount}</p>
        </div>
    </li>
  );
};

export default TransferItem;
