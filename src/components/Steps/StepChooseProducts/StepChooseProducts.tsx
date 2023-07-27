import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { log } from "../../../services";
import InstitutionService from "../../../services/Institution";
import "./StepChooseProducts.sass";
import { ProspectContext, InstitutionContext } from "../../../store";
import { LoadingContext } from "../../../store/LoadingContext";
import Config from "../../../services/Config";
import StepChooseProductsView from "./StepChooseProductsView";
import { IProduct } from "../../../store/reducers/type";
import { IStepChooseProducts } from "./types";

const StepChooseProducts: React.FC<IStepChooseProducts> = (
  props: IStepChooseProducts
) => {
  const history = useHistory();
  const institution = useContext(InstitutionContext);
  const { addProduct } = useContext(ProspectContext);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [activeTab, setActiveTab] = useState("CHECKING");

  const productsFilteredByCategory = () =>
    products.filter((product: IProduct) => {
      switch (product.category) {
        case "LOAN":
          return (
            product.category === activeTab &&
            Config.featureConfig.loans.products.find(
              (name) => name === product.name
            )
          );
        case "CARD":
          return (
            product.category === activeTab &&
            Config.featureConfig.cards.products.find(
              (name) => name === product.name
            )
          );
        default:
          return product.category === activeTab;
      }
    });

  const { setLoading } = useContext(LoadingContext);
  const { prospect } = useContext(ProspectContext);
  const [isProductDetailVisible, toggleProductDetailView] = useState(false);
  const [currentlyShowingProduct, setCurrentlyShowingProduct] = useState(
    {} as IProduct
  );

  // ISSUE-33 Begin
  const { updateInitialDeposit } = useContext(ProspectContext);

  const chooseAmountFlow = async () => {
    await updateInitialDeposit(0);

    if (prospect.inviteeToken === undefined || prospect.inviteeToken === null) {
      history.push("/onboarding/choose-product-options");
    } else {
      history.push("/onboarding/success");
    }
  };
  // ISSUE-33 End

  const handleSubmit = async (productId: string) => {
    log.info("product selected and submitted", "StepChooseProducts");
    const showingProduct = products.find(
      (product: IProduct) => product.id === productId
    );
    if (showingProduct) {
      await addProduct(showingProduct);
      if (showingProduct.category === "CD") {
        history.push("/onboarding/choose-product-options");
      } else if (
        Config.featureConfig.loans.enabled &&
        showingProduct.category === "CARD"
      ) {
        history.push("/onboarding/choose-product-options");
      } else if (
        Config.featureConfig.loans.enabled &&
        showingProduct.category === "LOAN"
      ) {
        history.push("/onboarding/choose-product-options");
      } else {
        // ISSUE-33 - Hide choose-amount
        // history.push('/onboarding/choose-amount')
        chooseAmountFlow();
      }
    }
  };

  const showProduct = (productId: string) => {
    toggleProductDetailView(true);
    const showingProduct = products.find(
      (product: IProduct) => product.id === productId
    );
    if (showingProduct) {
      setCurrentlyShowingProduct(showingProduct);
    }
  };

  const onTabClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = event.currentTarget.getAttribute("data-id") || "";
    log.info(id, "onTabClick");

    setActiveTab(id);
  };

  useEffect(() => {
    setLoading(true);
    const isOnboardingForInvitee = prospect.signerId;
    if (isOnboardingForInvitee !== undefined) {
      // if it is invitee who use the app, then skip BSA, ChooseProductsStep and InviteStep
      setLoading(false);
      history.push("/onboarding/success");
    } else {
      const fetchProducts = async (id: string) => {
        const items = await InstitutionService.getProducts(id);

        setProducts(items);
        return items;
      };

      if (institution) {
        fetchProducts(institution.id);
      }
      setLoading(false);
    }
  }, [history, institution, setLoading, prospect]);

  return (
    <StepChooseProductsView
      products={products}
      props={props}
      toggleProductDetailView={toggleProductDetailView}
      handleSubmit={handleSubmit}
      showProduct={showProduct}
      currentlyShowingProduct={currentlyShowingProduct}
      activeTab={activeTab}
      onTabClick={onTabClick}
      isProductDetailVisible={isProductDetailVisible}
      productsFilteredByCategory={productsFilteredByCategory}
    />
  );
};
export default StepChooseProducts;
