import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "react-feather";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { log } from "../../../../services";
import Radio from "../../Radio/Radio";

import "./PersonalMortgageForm.sass";
import { IPersonalMortgageForm } from "./types";
import { IPersonalMortgageLoanQuestionnaire } from "../../../../store/Personal/Loan/types";
import Input from "../../Input/Input";
import Button from "../../../Common/Button/Button";

// TODO: WIP below
const schema = yup.object().shape({
  purposeOfLoan: yup
    .string()
    .required()
    .oneOf([
      "Purchase",
      "Refinance",
      "Construction",
      "Construction-Permanent",
      "Other",
    ]),
  mortgageType: yup
    .string()
    .required()
    .oneOf([
      "Conventional",
      "FHA",
      "VHA",
      "USDA/Rural Housing Service",
      "Other",
    ]),
  amortizationType: yup
    .string()
    .required()
    .oneOf(["Fixed Rate", "ARM", "GPM", "Other"]),
  propertyAddressStreet: yup.string().required(),
  propertyAddressCity: yup.string().required(),
  propertyAddressState: yup.string().required(),
  propertyAddressZip: yup.string().required(),
  usageOfProperty: yup
    .string()
    .required()
    .oneOf(["Primary Residence", "Secondary Residence", "Investment"]),
  purchasePrice: yup.number().required().positive(),

  /* TODO: WIP below
  countryOfOrigin: yup.string().when('usCitizen', (usCitizen: string, schemaProxy: any) => {
    if (usCitizen && usCitizen === 'No') {
      return schemaProxy.required('Please enter your coutry of origin')
    } else {
      return schemaProxy.nullable()
    }
  }),
  hearAbout: yup
    .string()
    .max(100, 'Hear About can’t have more than 100 characters')
    .when('milesAway', (milesAway: string, schemaProxy: any) => {
      if (milesAway && milesAway === 'No') {
        return schemaProxy.required('Please tell us how you heard about Central Bank')
      } else {
        return schemaProxy.nullable()
      }
    })
    .matches(/^[a-zA-Z0-9- ']*$/, 'Invalid input'),
  otherBankName: yup
    .string()
    .max(100, 'Name of the bank can’t have more than 100 characters')
    .when('anotherBank', (anotherBank: string, schemaProxy: any) => {
      if (anotherBank && anotherBank === 'Yes') {
        return schemaProxy.required('Please enter the name of your bank')
      } else {
        return schemaProxy.nullable()
      }
    })
    .matches(/^[a-zA-Z0-9- ']*$/, 'Invalid input'),
   */
});

const PersonalMortgageForm: FC<IPersonalMortgageForm> = (props) => {
  const { defaultValues } = props;

  const { register, handleSubmit, errors, formState, getValues } =
    useForm<IPersonalMortgageLoanQuestionnaire>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues,
    });
  const { onSubmit } = props;
  const history = useHistory();

  const onFormSubmit = async (data: IPersonalMortgageLoanQuestionnaire) => {
    log.info(JSON.stringify(data), "PersonalMortgageForm");
    onSubmit(data);
  };

  const goBack = () => {
    history.goBack();
  };

  const displayFormState = JSON.stringify(formState, null, "\t");
  const displayFormValues = JSON.stringify(getValues(), null, "\t");

  const getLoanVerb = () => {
    const purpose = getValues("purposeOfLoan");
    switch (purpose) {
      case "purchase":
        return "buy";
      case "refinance":
        return "refinance";
      case "construction":
      case "construction-permanent":
        return "build";
      default:
        return "finance";
    }
  };

  const [debugFormState, setDebugFormState] = useState(false);

  const toggleDebugFormState = () => {
    setDebugFormState(!debugFormState);
  };

  return (
    <div
      className="ni-test personal-mortgage-loan-form-card"
      data-testid="PersonalMortgageForm"
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <section>
          <h3>How will you use this mortgage loan?</h3>
          <div className="question-row">
            <Radio
              data-testid="purpose_purchase"
              name="purposeOfLoan"
              defaultValue="Purchase"
              defaultChecked
              label="Purchase"
              ref={register}
            />
            <Radio
              data-testid="purpose_refinance"
              name="purposeOfLoan"
              defaultValue="Refinance"
              defaultChecked={false}
              label="Refinance"
              ref={register}
            />
            <Radio
              data-testid="purpose_construction"
              name="purposeOfLoan"
              defaultValue="Construction"
              defaultChecked={false}
              label="Construction"
              disabled
              ref={register}
            />
            <Radio
              data-testid="purpose_construction_permanent"
              name="purposeOfLoan"
              defaultValue="Construction-Permanent"
              defaultChecked={false}
              label="Construction-Permanent"
              disabled
              ref={register}
            />
            <Radio
              data-testid="purpose_other"
              name="purposeOfLoan"
              defaultValue="Other"
              defaultChecked={false}
              label="Other"
              disabled
              ref={register}
            />
          </div>
        </section>

        <section>
          <h3>What type of a mortgage loan do you want?</h3>
          <div className="question-row">
            <Radio
              data-testid="type_conventional"
              name="mortgageType"
              defaultValue="Conventional"
              defaultChecked
              label="Conventional"
              ref={register}
            />
            <Radio
              data-testid="type_fha"
              name="mortgageType"
              defaultValue="FHA"
              defaultChecked={false}
              label="FHA"
              ref={register}
            />
            <Radio
              data-testid="type_vha"
              name="mortgageType"
              defaultValue="VHA"
              defaultChecked={false}
              label="VHA"
              ref={register}
            />
            <Radio
              data-testid="type_usda"
              name="mortgageType"
              defaultValue="USDA/Rural Housing Service"
              defaultChecked={false}
              label="USDA/Rural Housing Service"
              disabled
              ref={register}
            />
            <Radio
              data-testid="type_other"
              name="mortgageType"
              defaultValue="Other"
              defaultChecked={false}
              label="Other"
              disabled
              ref={register}
            />
          </div>
        </section>

        <section>
          <h3>What amortization schedule are you looking for?</h3>
          <div className="question-row">
            <Radio
              data-testid="amortization_fixed"
              name="amortizationType"
              defaultValue="Fixed Rate"
              defaultChecked
              label="Fixed Rate"
              ref={register}
            />
            <Radio
              data-testid="amortization_arm"
              name="amortizationType"
              defaultValue="ARM"
              defaultChecked={false}
              label="ARM"
              ref={register}
            />
            <Radio
              data-testid="amortization_gpm"
              name="amortizationType"
              defaultValue="GPM"
              defaultChecked={false}
              label="GPM"
              ref={register}
            />
            <Radio
              data-testid="amortization_other"
              name="amortizationType"
              defaultValue="Other"
              defaultChecked={false}
              label="Other"
              disabled
              ref={register}
            />
          </div>
        </section>

        <section>
          <h3>
            Please enter the address of the property you wish to {getLoanVerb()}
            .
          </h3>
          <div className="grid">
            <Input
              name="propertyAddressStreet"
              label="Street"
              autoComplete="street"
              defaultValue={defaultValues?.propertyAddressStreet}
              errors={errors.propertyAddressStreet}
              ref={register}
            />
          </div>
          <div className="grid">
            <Input
              name="propertyAddressCity"
              label="City"
              autoComplete="city"
              defaultValue={defaultValues?.propertyAddressCity}
              errors={errors.propertyAddressCity}
              ref={register}
            />
            <Input
              name="propertyAddressState"
              label="State"
              autoComplete="state"
              defaultValue={defaultValues?.propertyAddressState}
              errors={errors.propertyAddressState}
              ref={register}
            />
            <Input
              name="propertyAddressZip"
              label="Zip"
              autoComplete="zip"
              defaultValue={defaultValues?.propertyAddressZip}
              errors={errors.propertyAddressZip}
              ref={register}
            />
          </div>
        </section>

        <section>
          <h3>How do you intend to use this property?</h3>
          <div className="question-row">
            <Radio
              data-testid="usage_primary"
              name="usageOfProperty"
              defaultValue="Primary Residence"
              defaultChecked
              label="Primary Residence"
              ref={register}
            />
            <Radio
              data-testid="usage_secondary"
              name="usageOfProperty"
              defaultValue="Secondary Residence"
              defaultChecked={false}
              label="Secondary Residence"
              ref={register}
            />
            <Radio
              data-testid="usage_investment"
              name="usageOfProperty"
              defaultValue="Investment"
              defaultChecked={false}
              label="Investment"
              disabled
              ref={register}
            />
          </div>
        </section>

        <section>
          <h3>What is the purchase price for this property?</h3>
          <div className="question-row">
            <Input
              name="purchasePrice"
              label="Enter purchase price"
              type="number"
              defaultValue={defaultValues?.purchasePrice}
              errors={errors.purchasePrice}
              ref={register}
            />
          </div>
        </section>

        <section>
          {/* TODO below additional fields!!!  */}
          {/*
  // User input
  intentToApplyJointly: Joi.object({
    jointApplicationRequired: Joi.boolean(),
    includesIncomeOrAssetsFromOtherPerson: Joi.boolean(),
    borrowerSignature: Joi.string().dataUri(),
    coborrowerSignature: Joi.string().dataUri()
  }),

  // User input
  numberOfMonths: Joi.number(),
  // User input
  amortizationTypeARM: Joi.string(),
  // User input
  subjectPropertyAddress: Joi.string(),

// User input
constructionDetails.costOfImprovements: Joi.number(),

  // User
  refinanceDetails.purposeOfRefinance: Joi.string(),
  // User
  refinanceDetails.improvementsType: Joi.string().valid('made', 'to be made'),
  // User
  refinanceDetails.improvementsCost: Joi.number()

  // User
  titleHeldInName: Joi.string(),
  // User
  titleHeldInManner: Joi.string(),
  // User
  estateHeldIn: Joi.string().valid('Fee Simple', 'Leasehold'),
  // User
  sourceOfPayments: Joi.string(),

  // User
  applicantDetails.applicant: Joi.string().valid('Borrower', 'Co-Borrower'),

  // Not sure - User input
  applicantDetails.employment.current.yearsInProfession: Joi.number(),

  // Not sure - User
  combinedMonthlyExpenses.proposed: Joi.object({
    firstMortgagePAndI: Joi.number(),
    otherFinancingPAndI: Joi.number(),
    hazardInsurance: Joi.number(),
    realEstateTaxes: Joi.number(),
    mortgageInsurance: Joi.number(),
    homeownerAssociationDues: Joi.number(),
    otherTotal: Joi.number(),
    total: Joi.number()
  })

  // Not sure - user
  assetsAndLiabilities.assets.stocks: Joi.array().items(
    Joi.object({
      owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
      companyName: Joi.string(),
      tickerSymbol: Joi.string(),
      exchange: Joi.string(),
      quantity: Joi.number(),
      currentMarketValue: Joi.number(),
      totalMarketValue: Joi.number()
    })
  ),

  // Not sure - user
  assetsAndLiabilities.assets.bonds: Joi.array().items(
    Joi.object({
      owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
      issuer: Joi.string(),
      quantity: Joi.number(),
      totalPresentValue: Joi.number()
    })
  ),

  // Not sure - user
  assetsAndLiabilities.assets.lifeInsurance: Joi.object({
    owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
    faceAmount: Joi.number(),
    netCashValue: Joi.number()
  }),

  // Not sure - User
  assetsAndLiabilities.assets.vestedInterestInRetirementFund: Joi.object({
    owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
    marketValue: Joi.number()
  }),

  // Not sure - User
  assetsAndLiabilities.assets.otherAssets: Joi.array().items(
    Joi.object({
      owner: Joi.string().valid('Borrower', 'Co-Borrower', 'Joint'),
      type: Joi.string(),
      description: Joi.string(),
      marketValue: Joi.number()
    })
  ),
          */}
        </section>

        {Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="alert toast is-error"
            data-testid="form-errors"
          >
            <AlertCircle /> Please review the form before continuing.
          </div>
        )}
        <div onClick={toggleDebugFormState}>
          <h2>Debug Form State</h2>
          {debugFormState ? (
            <div>
              <pre>{displayFormState}</pre>
              <pre>{displayFormValues}</pre>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mortgage-controls">
          <Button className="back" onClick={goBack}>
            <ArrowLeft color="#444647" />
            Back
          </Button>
          <Button
            disabled={!formState.isValid}
            type="submit"
            className="is-pill is-green"
            data-testid="submit-btn"
          >
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};
export default PersonalMortgageForm;
