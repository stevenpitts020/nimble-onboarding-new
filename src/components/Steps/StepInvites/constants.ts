export const SIGNER_ROLES = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
};

export type TSignerRole = keyof typeof SIGNER_ROLES;

export const signerRolesLabels = {
  [SIGNER_ROLES.PRIMARY]: "Primary",
  [SIGNER_ROLES.SECONDARY]: "Secondary",
};
