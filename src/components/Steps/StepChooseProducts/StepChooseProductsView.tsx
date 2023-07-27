import React from "react";
import checkingIconActive from "./checkingIconActive.svg";
import checkingIcon from "./checkingIcon.svg";
import savingsIconActive from "./savingsIconActive.svg";
import savingsIcon from "./savingsIcon.svg";
import Config from "../../../services/Config";
import cardsIconActive from "./cardsIconActive.svg";
import cardsIcon from "./cardsIcon.svg";
import loansIconActive from "./loansIconActive.svg";
import loansIcon from "./loansIcon.svg";
import cdIconActive from "./cdIconActive.svg";
import cdIcon from "./cdIcon.svg";
import ProductDetail from "./ProductDetail";
import ProductSummary from "./ProductSummary";
import { IStepChooseProductsView } from "./types";
import { IProduct } from "../../../store/reducers/type";

const StepChooseProductsView = ({
  props,
  isProductDetailVisible,
  activeTab,
  onTabClick,
  products,
  currentlyShowingProduct,
  toggleProductDetailView,
  handleSubmit,
  productsFilteredByCategory,
  showProduct,
}: IStepChooseProductsView) => (
  <div
    data-testid="StepChooseProducts"
    className={`ni-step-choose-products ${props.className}`}
    style={props.style}
  >
    <h1>What type of Account are you interested in?</h1>

    {!isProductDetailVisible && (
      <div className="product-tabs">
        <div
          data-id="CHECKING"
          data-testid="StepTabCheckingsAccount"
          className={`tab ${activeTab === "CHECKING" ? "active" : ""}`}
          onClick={onTabClick}
        >
          <img
            data-testid="StepTabCheckingsAccountImage"
            src={activeTab === "CHECKING" ? checkingIconActive : checkingIcon}
            alt="checkings account icon"
          />
          <span>Checkings Accounts</span>
        </div>
        <div
          data-id="SAVINGS"
          data-testid="StepTabSavingsAccount"
          className={`tab ${activeTab === "SAVINGS" ? "active" : ""}`}
          onClick={onTabClick}
        >
          <img
            data-testid="StepTabSavingsAccountImage"
            src={activeTab === "SAVINGS" ? savingsIconActive : savingsIcon}
            alt="savings account icon"
          />
          <span>Savings Accounts</span>
        </div>
        {Config.featureConfig.cards.enabled ? (
          <div
            data-id="CARD"
            data-testid="StepTabCardsAccount"
            className={`tab ${activeTab === "CARD" ? "active" : ""}`}
            onClick={onTabClick}
          >
            <img
              data-testid="StepTabCardsAccountImage"
              src={activeTab === "CARD" ? cardsIconActive : cardsIcon}
              alt="cards account icon"
              className="cardIcon"
            />
            <span>Cards</span>
          </div>
        ) : (
          " "
        )}
        {Config.featureConfig.loans.enabled ? (
          <div
            data-id="LOAN"
            data-testid="StepTabLoansAccount"
            className={`tab ${activeTab === "LOAN" ? "active" : ""}`}
            onClick={onTabClick}
          >
            <img
              data-testid="StepTabLoansAccountImage"
              src={activeTab === "LOAN" ? loansIconActive : loansIcon}
              alt="loans account icon"
              className="loanIcon"
            />
            <span>Loans</span>
          </div>
        ) : (
          " "
        )}
        {products.find((product) => product.category === "CD") && (
          <div
            data-id="CD"
            data-testid="StepTabCDSAccount"
            className={`tab ${activeTab === "CD" ? "active" : ""}`}
            onClick={onTabClick}
          >
            <img
              data-testid="StepTabCDSAccountImage"
              src={activeTab === "CD" ? cdIconActive : cdIcon}
              alt="savings account icon"
            />
            <span>Certificates of Deposit</span>
          </div>
        )}
      </div>
    )}

    <div className="products-list">
      {isProductDetailVisible ? (
        <ProductDetail
          product={currentlyShowingProduct}
          toggleProductDetailView={toggleProductDetailView}
          submitProduct={handleSubmit}
        />
      ) : (
        <div>
          {productsFilteredByCategory().length > 0 ? (
            productsFilteredByCategory().map((product: IProduct) => (
              <ProductSummary
                product={product}
                key={product.id}
                submitProduct={handleSubmit}
                showProduct={showProduct}
              />
            ))
          ) : (
            <div className="product">
              <div className="no-product">
                <h3>No products available</h3>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

export default StepChooseProductsView;
