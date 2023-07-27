/* eslint eqeqeq: "off" */
import React, { Ref } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { log } from "../../../services";
import Radio from "../Radio/Radio";

import "./BSAForm.sass";
import { IBSAForm } from "./types";
import Input from "../Input/Input";
import Button from "../../Common/Button/Button";
import ReactFlagsSelect from "react-flags-select";

const BSAForm: React.FC<IBSAForm> = (props) => {
  const { defaultValues, questions } = props;

  // mutate: add the question key/id to each question
  _.keys(questions).forEach((qid) => (questions[qid].id = qid));

  // sort the questions by their intended order
  const qs = _.sortBy(_.omit(questions, "_"), "order");

  const validator = _.reduce(
    qs,
    (acc, q) => {
      let config = (yup as any)[q.type]();

      if (q.required && !q.dependsOn) {
        config = config.required(`required: ${_.startCase(q.id)}`);
      }
      if (_.isArray(q.enum)) {
        config = config.oneOf(q.enum);
      }
      if (_.isNumber(q.maxLength)) {
        config = config.max(
          q.maxLength,
          `${_.startCase(q.id)} must not exceed ${q.maxLength} characters`
        );
      }
      if (_.isString(q.regex)) {
        config = config.matches(
          new RegExp(q.regex),
          `${_.startCase(q.id)} must match pattern: /${q.regex}/`
        );
      }
      if (_.isPlainObject(q.dependsOn)) {
        _.forEach(q.dependsOn, (depVal, depId) => {
          // tslint:disable-next-line: triple-equals
          config = config.when(depId, (dep: any, proxyConfig: any) =>
            dep && dep == depVal
              ? questions[depId]?.required
                ? proxyConfig.required(`required: ${_.startCase(q.id)}`)
                : proxyConfig.notRequired().nullable()
              : proxyConfig.notRequired().nullable()
          );
        });
      }

      acc[q.id] = config;
      return acc;
    },
    {} as any
  );

  const {
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(yup.object().shape(validator)),
    defaultValues,
  });
  const { onSubmit } = props;
  const history = useHistory();

  const watched: any = {};
  const depends: any = {};

  qs.forEach((q) => {
    // populate default values
    if (!_.isNil((defaultValues as any)[q.id])) {
      return;
    }

    if (q.type === "string" && _.isString(q.default)) {
      (defaultValues as any)[q.id] = q.default;
    }
    if (q.type === "number" && _.isNumber(q.default)) {
      (defaultValues as any)[q.id] = q.default;
    }
    if (q.type === "boolean" && _.isBoolean(q.default)) {
      (defaultValues as any)[q.id] = q.default;
    }
    if (q.type === "array" && _.isArray(q.default)) {
      (defaultValues as any)[q.id] = q.default;
    }
    if (q.type === "date" && _.isString(q.default)) {
      (defaultValues as any)[q.id] = new Date(q.default);
    }
  });

  qs.forEach((q) => {
    // watch dependency predicates
    if (_.isPlainObject(q.dependsOn)) {
      _.forEach(q.dependsOn, (depVal, depId) => {
        if (!watched[depId]) {
          watched[depId] = watch(depId, (defaultValues as any)[depId]);
        }
        depends[q.id] = [];
        // tslint:disable-next-line: triple-equals
        depends[q.id].push(() => watched[depId] == depVal);
      });
    }
  });

  const onFormSubmit = async (data: any) => {
    log.info(JSON.stringify(data), "BSAform");
    onSubmit(data);
  };

  const goBack = () => {
    history.goBack();
  };

  const onSelectCountry = (qid) => (code: string) => {
    console.log({ qid, code });
    setValue(qid, code, { shouldValidate: true });
  };

  return (
    <div className="ni-test prospect-form-card" data-testid="BSAForm">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <section>
          {qs.map((q) => {
            if (q.dependsOn && !_.every(depends[q.id], (dep) => dep())) {
              return <div key={q.id} />;
            }

            return (
              <div key={q.id} className="question-row">
                <p className="question">{q.text}</p>
                {q.enum &&
                  q.enum.map((val: string) => (
                    <Radio
                      key={`binary-${q.id}-${val}`}
                      data-testid={`${q.id}-${val}`}
                      name={q.id}
                      value={val}
                      defaultValue={val}
                      label={val}
                      ref={register as Ref<HTMLInputElement>}
                    />
                  ))}
                {q.subtype === "text" && (
                  <Input
                    key={`text-${q.id}`}
                    autoFocus
                    name={q.id}
                    ref={register as Ref<HTMLInputElement>}
                    errors={(errors as any)[q.id]}
                  />
                )}
                {q.subtype === "country" && (
                  <Controller
                    key={`country-${q.id}`}
                    control={control}
                    name={q.id}
                    as={
                      <ReactFlagsSelect
                        searchable
                        showSelectedLabel
                        selected={watch(q.id)}
                        key={`select-${q.id}`}
                        onSelect={onSelectCountry(q.id)}
                        customLabels={{ LA: "Loas", VN: "Vietnam" }}
                        searchPlaceholder="Find Country"
                      />
                    }
                  />
                )}
              </div>
            );
          })}
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
        <div className="bsa-controls">
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
export default BSAForm;
