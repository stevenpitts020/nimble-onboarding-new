import React from "react";

export interface IBSAForm {
  className?: string;
  style?: React.CSSProperties;
  defaultValues: any;
  questions: any;
  onSubmit: (data: any) => void;
}
