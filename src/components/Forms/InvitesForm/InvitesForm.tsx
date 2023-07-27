import React, { FC, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUIDSeed } from "react-uid";
import { PlusCircle, ArrowLeft, ArrowRight } from "react-feather";
import { log } from "../../../services";
import "./InvitesForm.sass";
import RepeatableSigner from "./RepeatableSigner/RepeatableSigner";
import { TSignerRole, SIGNER_ROLES } from "../../Steps/StepInvites/constants";
import validateNumberSigners from "../../../utils/validation/validateNumberSigners";
import { checkRepeatedEmails, cleanEmptyEmails } from "./utils";
import ConfirmEmailDialog from "./ConfirmEmailDialog";
import { ProspectContext } from "../../../store";
import { IInvitesForm } from "./types";
import { IFormRepeatableSigners } from "./RepeatableSigner/types";
import { IInvitedSigner } from "../../../store/reducers/type";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../../Common/Button/Button";

const blankSigner: IInvitedSigner = {
  email: "",
  role: SIGNER_ROLES.SECONDARY as TSignerRole,
};

const InvitesForm: FC<IInvitesForm> = (props) => {
  const seedUID = useUIDSeed();
  const { disallowedEmails = [], maxInvitees = 5, defaultInvites = [] } = props;
  const { prospect } = useContext(ProspectContext);
  const schema = yup.object().shape({
    signers: yup.array().of(
      yup.object().shape({
        email: yup
          .string()
          .max(90, "Email can’t have more than 90 characters")
          .email("Invalid email")
          .test(
            "isNotUsersEmail",
            "You can not invite yourself to be the co-applicant",
            (value) => value !== disallowedEmails[0]
          ),
        role: yup.string(),
      })
    ),
  });

  const { register, control, handleSubmit, errors, reset, getValues, trigger } =
    useForm<IFormRepeatableSigners>({
      defaultValues: { signers: [{ ...blankSigner }] },
      resolver: yupResolver(schema, {
        context: {
          disallowedEmails,
        },
      }),
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "signers",
  });

  const canAddInvitee = fields.length < maxInvitees;

  const [primaryIndex, setPrimaryIndex] = React.useState<number>(
    defaultInvites.findIndex((i) => i.role === SIGNER_ROLES.PRIMARY)
  );
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    // if the default values for the list change, we need to reset the form with new values
    // (it's the react hook form way)
    if (defaultInvites && defaultInvites.length > 0) {
      reset({ signers: defaultInvites });
    }
  }, [defaultInvites, reset]);

  const onFormSubmit = async (data: IFormRepeatableSigners) => {
    // remove empty emails
    const formInvitesData = cleanEmptyEmails(data);
    // checks if there's data and acts accordingly (skip or submit)
    const shouldSkip = !validateNumberSigners(formInvitesData);
    if (shouldSkip && props.onSkip) {
      return props.onSkip();
    }

    if (!checkRepeatedEmails(formInvitesData, props.disallowedEmails)) {
      return props.onSubmit(formInvitesData);
    }

    return setDialogOpen(true);
  };

  const onBack = () => {
    if (props.onBack) {
      props.onBack();
    }
  };

  /** remove one signer */
  const onRemove = (index: number) => {
    log.info(`Remove ${index}`, "InvitesForm");
    remove(index);
  };

  /** add one signer */
  const onAppend = () => {
    log.info("Append", "InvitesForm");
    append({ ...blankSigner });
  };

  const onRoleChanged = () => {
    const { signers } = getValues();
    const indexOfPrimary = signers.findIndex(
      (s) => s.role === SIGNER_ROLES.PRIMARY
    );
    const { onChangePrimaryRole = () => null } = props;
    onChangePrimaryRole(indexOfPrimary >= 0);
    setPrimaryIndex(indexOfPrimary);
  };

  /* when you cancel the email dialog */
  const onCancelEmailDialog = () => {
    setDialogOpen(false);
  };

  /* when you confirm the email dialog */
  const onConfirmEmailDialog = () => {
    setDialogOpen(false);

    // remove empty emails
    const formInvitesData = cleanEmptyEmails(getValues());

    return props.onSubmit(formInvitesData);
  };

  return (
    <div
      data-testid="InvitesForm"
      className={`ni-signers-form ${props.className}`}
      style={props.style}
    >
      <ConfirmEmailDialog
        isOpen={isDialogOpen}
        onCancel={onCancelEmailDialog}
        onAction={onConfirmEmailDialog}
      />

      <form onSubmit={handleSubmit(onFormSubmit)}>
        {fields.map((field: any, index: number) => (
          <RepeatableSigner
            register={register}
            key={seedUID(field)}
            item={field}
            index={index}
            onRemove={onRemove}
            errors={errors}
            onRoleChange={onRoleChanged}
            roleDisabled={primaryIndex >= 0 && primaryIndex !== index}
            trigger={trigger}
          />
        ))}

        {canAddInvitee && (
          <section className="text-center">
            <Button
              onClick={onAppend}
              className="button is-ghost is-add"
              data-testid="addSigner"
            >
              <PlusCircle /> Add new Signer
            </Button>
            <br />
            <ErrorMessage errors={errors.role} />
          </section>
        )}

        {Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="u-margin-bottom-xl ni-color-danger"
            data-testid="formErrorAlert"
          >
            Please review the form before continuing.
          </div>
        )}

        <div className="controls">
          <Button type="reset" className="back" onClick={onBack}>
            <ArrowLeft color="#444647" />
            Back
          </Button>
          {fields.length > 0 && (
            <Button
              type="submit"
              loading={props.loading}
              disabled={Object.keys(errors).length > 0}
              className="is-pill is-green has-icon-after"
              data-testid="InvitesFormContinue"
            >
              {prospect?.selectedProduct?.category === "LOAN" ||
              prospect?.selectedProduct?.category === "CARD"
                ? "Continue"
                : "Sign and Finish"}
              <ArrowRight />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

InvitesForm.defaultProps = {
  loading: false,
};
export default InvitesForm;
