import React from "react";
import { XCircle } from "react-feather";
import { IRepeatableSigner } from "./types";
import Switch from "../../Switch/Switch";
import Input from "../../Input/Input";
import Button from "../../../Common/Button/Button";

const RepeatableSigner = (props: IRepeatableSigner) => {
  // check for errors for this particular signer in the errors array
  const signerErrors = props.errors?.signers
    ? props.errors.signers[props.index]
    : {};

  /* on deleting a signer */
  const handleRemove = () => {
    props.onRemove(props.index);
  };

  const clearDuplicateErrors = () => {
    const signersErrors = props.errors?.signers || [];
    signersErrors.forEach((err, i) => {
      if (err?.email?.type === "duplicate") {
        props.trigger(`signers[${i}].email`);
      }
    });
  };

  return (
    <section
      data-id={props.item.id}
      data-testid="RepeatableSigner"
      style={props.index === 0 ? { display: "none" } : undefined}
    >
      <div className="grid">
        <Input
          name={`signers[${props.index}].email`}
          label="Email"
          ref={props.register}
          className="span-5"
          defaultValue={`${props.item.email}`}
          errors={signerErrors?.email}
          onChange={clearDuplicateErrors}
        />
        <Switch
          label="Role"
          textOn="Owner"
          name={`signers[${props.index}].role`}
          forwardRef={props.register}
          isChecked={props.item.role === "PRIMARY"}
          valueOff="SECONDARY"
          valueOn="PRIMARY"
          onChange={props.onRoleChange}
          disabled={props.roleDisabled}
        />
        <Button
          onClick={handleRemove}
          disabled={props.index === 0}
          style={props.index === 0 ? { visibility: "hidden" } : {}}
          data-testid="removeButton"
          className="is-ghost is-remove"
        >
          <XCircle color="red" />
          <span hidden>Delete</span>
        </Button>
      </div>
    </section>
  );
};
export default RepeatableSigner;
