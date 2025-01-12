import React, { useState, useEffect } from "react";
import AccordionItem from "./AccordionItem";

import IconTransfer from "../../img/transfer-icon.svg";
import IconUser from "../../img/user-icon.svg";
import IconDoubleCards from "../../img/double-cards-icon.svg";
import IconGlobus from "../../img/globus-icon.svg";
import IconLoan from "../../img/red-limit-new.svg";
import KaspiGold from "../../img/kaspi-gold.svg";
import KyrgyzstanFlag from "../../img/kyrgyzstan-flag.png";
import KazakhstanFlag from "../../img/kazakhstan-flag.png";
import UzbekistanFlag from "../../img/uzbekistan-flag.png";

const MyTransfers = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fromInputValue, setFromInputValue] = useState({
    account: "",
    amount: "",
  });
  const [toInputValue, setToInputValue] = useState({ account: "", amount: "" });
  const [currentSetter, setCurrentSetter] = useState(null);

  const [popupContext, setPopupContext] = useState(null);

  const [loanRequests, setLoanRequests] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [progress, setProgress] = useState(0);

  const [activeTab, setActiveTab] = useState("phone");
  const [loanTab, setLoanTab] = useState("lend");
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState("");
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("1");
  const [message, setMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+996",
    flag: KyrgyzstanFlag,
  });

  useEffect(() => {
    setActiveTab("lend");
  }, []);

  const countries = [
    { code: "+996", flag: KyrgyzstanFlag },
    { code: "+7", flag: KazakhstanFlag },
    { code: "+998", flag: UzbekistanFlag },
  ];

  const openPopup = (setter, context) => {
    setCurrentSetter(() => setter);
    setPopupContext(context);
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

  const handleSelectAccount = (account, amount) => {
    if (popupContext === "accounts") {
      if (currentSetter) {
        currentSetter({ account, amount });

        if (account === "Kaspi Gold") {
          setToInputValue({ account: "Депозит KZT", amount: "₸120,000" });
        } else {
          setToInputValue({ account: "Kaspi Gold", amount: "₸45,000" });
        }
      }
    } else if (popupContext === "external") {
      if (currentSetter) {
        currentSetter({ account, amount });

        if (account === "Карта другого банка") {
          setToInputValue({ account: "Kaspi Gold", amount: "₸45,000" });
        } else {
          setToInputValue({ account: "Карта другого банка", amount: "" });
        }
      }
    }
    closePopup();
  };

  const renderPopup = () => (
    <>
      <div
        className={`popup-overlay ${
          isPopupOpen ? "popup-overlay--visible" : ""
        }`}
        onClick={closePopup}
      ></div>
      <div className={`popup ${isPopupOpen ? "popup--visible" : ""}`}>
        <div className="popup__header">
          <h3>Выберите счет</h3>
          <button className="popup__close" onClick={closePopup}>
            &times;
          </button>
        </div>
        <div className="popup__options">
          {popupContext === "accounts" && (
            <>
              <div
                className="popup__option"
                onClick={() => handleSelectAccount("Kaspi Gold", "₸45,000")}
              >
                <div className="popup__divider">
                  <input
                    type="radio"
                    name="account"
                    className="popup__radio"
                    readOnly
                  />
                  <span className="popup__icon">
                    <img src={KaspiGold} alt="Kaspi Gold" />
                  </span>
                  <span>Kaspi Gold</span>
                </div>
                <span>₸45,000</span>
              </div>
              <div
                className="popup__option"
                onClick={() => handleSelectAccount("Депозит KZT", "₸120,000")}
              >
                <div className="popup__divider">
                  <input
                    type="radio"
                    name="account"
                    className="popup__radio"
                    readOnly
                  />
                  <span className="popup__icon">
                    <img src={KaspiGold} alt="Депозит KZT" />
                  </span>
                  <span>Депозит KZT</span>
                </div>
                <span>₸120,000</span>
              </div>
            </>
          )}
          {popupContext === "external" && (
            <>
              <div
                className="popup__option"
                onClick={() => handleSelectAccount("Kaspi Gold", "₸45,000")}
              >
                <div className="popup__divider">
                  <input
                    type="radio"
                    name="account"
                    className="popup__radio"
                    readOnly
                  />
                  <span className="popup__icon">
                    <img src={KaspiGold} alt="Kaspi Gold" />
                  </span>
                  <span>Kaspi Gold</span>
                </div>
                <span>₸45,000</span>
              </div>
              <div
                className="popup__option"
                onClick={() => handleSelectAccount("Карта другого банка", "")}
              >
                <div className="popup__divider">
                  <input
                    type="radio"
                    name="account"
                    className="popup__radio"
                    readOnly
                  />
                  <span>Карта другого банка</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );

  const handleSubmitLoanRequest = (e) => {
    e.preventDefault();
    setIsRequesting(true);

    setTimeout(() => {
      const isApproved = Math.random() > 0.5;
      if (isApproved) {
        alert("Заявка одобрена!");
      } else {
        alert("Заявка отклонена.");
      }
      setIsRequesting(false);
    }, 3000);
  };

  const handleApproveRequest = (id) => {
    const updatedRequests = loanRequests.filter((request) => request.id !== id);
    setLoanRequests(updatedRequests);
    alert("Запрос успешно подтвержден!");
  };

  return (
    <div className="transfers">
      <AccordionItem title="Между своими счетами" icon={IconTransfer}>
        <form className="transfers__form">
          <div
            className="transfers__input-wrapper"
            onClick={() => openPopup(setFromInputValue, "accounts")}
          >
            <span className="transfers__account">
              {fromInputValue.account || "Откуда"}
            </span>
            <span className="transfers__amount">
              {fromInputValue.amount || ""}
            </span>
          </div>

          <div
            className="transfers__input-wrapper"
            onClick={() => openPopup(setToInputValue, "accounts")}
          >
            <span className="transfers__account">
              {toInputValue.account || "Куда"}
            </span>
            <span className="transfers__amount">
              {toInputValue.amount || ""}
            </span>
          </div>

          <div>
            <label>
              <input
                className="transfers__input-wrapper"
                type="number"
                placeholder="0 ₸"
              />
            </label>
          </div>
          <button className="transfers__button" type="submit">
            Отправить
          </button>
        </form>
      </AccordionItem>

      <AccordionItem title="Клиенту Kaspi" icon={IconUser}>
        <div className="transfers__balance"></div>
        <div className="tabs">
          <div
            className={`tabs__indicator ${
              activeTab === "card" ? "tabs__indicator--second" : ""
            }`}
          ></div>
          <button
            className={`tabs__button tabs__button--secondary ${
              activeTab === "phone" ? "active" : ""
            }`}
            onClick={() => setActiveTab("phone")}
          >
            Телефон
          </button>
          <button
            className={`tabs__button tabs__button--secondary ${
              activeTab === "card" ? "active" : ""
            }`}
            onClick={() => setActiveTab("card")}
          >
            Карта
          </button>
        </div>
        <p className="transfers__account">Доступно на Kaspi Gold: ₸45,000</p>
        <form className="transfers__form">
          {activeTab === "phone" && (
            <div className="transfers__input-wrapper">
              <label htmlFor="phone" className="transfers__label"></label>
              <input
                id="phone"
                className="transfers__input"
                type="tel"
                placeholder="Введите номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <img src={IconUser} alt="" width={25} height={25} />
            </div>
          )}
          {activeTab === "card" && (
            <div className="transfers__input-wrapper">
              <label htmlFor="card" className="transfers__label"></label>
              <input
                id="card"
                className="transfers__input"
                type="text"
                placeholder="Введите номер карты"
                value={card}
                onChange={(e) => setCard(e.target.value)}
              />
            </div>
          )}
          <div className="transfers__input-wrapper">
            <label htmlFor="amount" className="transfers__label"></label>
            <input
              id="amount"
              className="transfers__input"
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="transfers__input-wrapper">
            <textarea
              id="message"
              className="transfers__textarea"
              placeholder="Сообщение получателю"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="transfers__button">
            Отправить
          </button>
        </form>
      </AccordionItem>

      <AccordionItem title="Карту другого банка" icon={IconDoubleCards}>
        <form className="transfers__form">
          <div
            className="transfers__input-wrapper"
            onClick={() => openPopup(setFromInputValue, "external")}
          >
            <span className="transfers__account">
              {fromInputValue.account || "Откуда"}
            </span>
            <span className="transfers__amount">
              {fromInputValue.amount || ""}
            </span>
          </div>

          <div
            className="transfers__input-wrapper"
            onClick={() => openPopup(setToInputValue, "external")}
          >
            <span className="transfers__account">
              {toInputValue.account || "Куда"}
            </span>
            <span className="transfers__amount">
              {toInputValue.amount || ""}
            </span>
          </div>

          <div>
            <label>
              <input
                className="transfers__input-wrapper"
                type="number"
                placeholder="0 ₸"
              />
            </label>
          </div>
          <button className="transfers__button" type="submit">
            Отправить
          </button>
        </form>
      </AccordionItem>

      <AccordionItem title="Международные переводы" icon={IconGlobus}>
        <div className="transfers__balance">
          <p className="transfers__account">Доступно: ₸ 100,000</p>
        </div>
        <div className="tabs tabs--international">
          <div
            className={`tabs__indicator tabs__indicator--international ${
              activeTab === "card" ? "tabs__indicator--second" : ""
            }`}
          ></div>
          <button
            className={`tabs__button tabs__button--international ${
              activeTab === "phone" ? "active-international" : ""
            }`}
            onClick={() => setActiveTab("phone")}
          >
            Телефон
          </button>
          <button
            className={`tabs__button tabs__button--international ${
              activeTab === "card" ? "active-international" : ""
            }`}
            onClick={() => setActiveTab("card")}
          >
            Карта
          </button>
        </div>
        <form className="transfers__form">
          {activeTab === "phone" && (
            <div className="transfers__input-wrapper transfers__input-wrapper--international">
              <label htmlFor="phone" className="transfers__label"></label>
              <div className="transfers__phone-input">
                <div className="transfers__dropdown-wrapper">
                  <div
                    className="transfers__dropdown-selected"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <img
                      src={selectedCountry.flag}
                      alt=""
                      className="transfers__flag"
                    />
                    <span>{selectedCountry.code}</span>
                  </div>
                  {isDropdownOpen && (
                    <ul className="transfers__dropdown-list">
                      {countries.map((country) => (
                        <li
                          key={country.code}
                          className="transfers__dropdown-item"
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <img
                            src={country.flag}
                            alt=""
                            className="transfers__flag"
                            width={25}
                            height={25}
                          />
                          <span>{country.code}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  id="phone"
                  className="transfers__input transfers__input--international"
                  type="tel"
                  placeholder="Введите номер телефона"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "card" && (
            <div className="transfers__input-wrapper transfers__input-wrapper--international">
              <label htmlFor="card" className="transfers__label"></label>
              <input
                id="card"
                className="transfers__input transfers__input--international"
                type="text"
                placeholder="Введите номер карты получателя"
                value={card}
                onChange={(e) => setCard(e.target.value)}
              />
            </div>
          )}
          <div className="transfers__input-wrapper transfers__input-wrapper--international">
            <label htmlFor="amount" className="transfers__label"></label>
            <input
              id="amount"
              className="transfers__input transfers__input--international"
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type="submit" className="transfers__button">
            Отправить
          </button>
        </form>
      </AccordionItem>

      <AccordionItem title="Деньги в долг" icon={IconLoan}>
        <div className="tabs tabs--loan">
          <div
            className={`tabs__indicator ${
              loanTab === "request" ? "tabs__indicator--second" : ""
            }`}
          ></div>
          {[
            { key: "lend", label: "Выдать займ" },
            { key: "request", label: "Запросить займ" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`tabs__button ${loanTab === tab.key ? "active" : ""}`}
              onClick={() => setLoanTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loanTab === "lend" && (
          <div className="transfers__lend">
            <div className="transfers__loan-request">
              <p>Пользователь: Эльдар</p>
              <p>Номер телефона: +770000000</p>
              <p>Сумма заявки: 10000 тенге</p>
              <p>Дней до возврата: 14</p>
              <div className="transfers__action">
                <input
                  className="transfers__input transfers__input--amount"
                  type="number"
                  placeholder="Скорректируйте сумму"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className="transfers__button"
                  onClick={() => alert("Заявка подтверждена")}
                >
                  Подтвердить
                </button>
              </div>
            </div>
          </div>
        )}

        {loanTab === "request" &&
          (!isRequesting ? (
            <form
              className="transfers__form"
              onSubmit={(e) => {
                e.preventDefault();
                setIsRequesting(true);
                let progressValue = 0;
                const interval = setInterval(() => {
                  progressValue += 3;
                  setProgress(progressValue);
                  if (progressValue >= 100) {
                    clearInterval(interval);
                    setIsRequesting(false);
                    alert("Заявка одобрена!");
                  }
                }, 100);
              }}
            >
              <div className="transfers__input-wrapper">
                <label htmlFor="phone" className="transfers__label"></label>
                <input
                  id="phone"
                  className="transfers__input"
                  type="tel"
                  placeholder="Введите номер телефона"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="transfers__input-wrapper">
                <label htmlFor="amount" className="transfers__label"></label>
                <input
                  id="amount"
                  className="transfers__input"
                  type="number"
                  placeholder="Введите сумму"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="transfers__input-wrapper">
                <label htmlFor="days" className="transfers__label">
                </label>
                <input
                  id="days"
                  className="transfers__input transfers__input--days"
                  type="number"
                  min="1"
                  max="365"
                  placeholder="Введите количество дней"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
              <div className="transfers__checkbox-wrapper">
                <input
                  id="agree"
                  type="checkbox"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(!isAgreed)}
                />
                <label htmlFor="agree">Ознакомлен с условиями банка</label>
              </div>
              <button
                type="submit"
                className="transfers__button"
                disabled={!isAgreed}
              >
                Отправить заявку
              </button>
            </form>
          ) : (
            <div className="transfers__progress">
              <p>Банк принимает решение...</p>
              <div className="transfers__progress-circle-wrapper">
                <svg
                  className="transfers__progress-circle"
                  width="100"
                  height="100"
                >
                  <circle
                    className="transfers__progress-circle-bg"
                    cx="50"
                    cy="50"
                    r="45"
                    strokeWidth="10"
                  />
                  <circle
                    className="transfers__progress-circle-fg"
                    cx="50"
                    cy="50"
                    r="45"
                    strokeWidth="10"
                    style={{
                      strokeDasharray: 283,
                      strokeDashoffset: (283 * (100 - progress)) / 100,
                    }}
                  />
                </svg>
              </div>
            </div>
          ))}
      </AccordionItem>

      {isPopupOpen && renderPopup()}
    </div>
  );
};

export default MyTransfers;
