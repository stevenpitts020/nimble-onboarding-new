// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import { rest } from "msw"; // msw supports graphql too!

import {
  mockInstitution,
  invalidResponse,
} from "../../services/__mocks__/Institution";
import {
  successCreate as mockPhotos,
  errorCreate as photoError,
} from "../../services/__mocks__/Photos";
import {
  identityInformationSuccess,
  errorUpdate,
  putToUpdateProspectSuccess,
  postToCreateProspectSuccess,
  embedURLSuccess,
  prospectSignerSigned,
  prospectSignerInvited,
  putToEmailVerificationSuccess,
  prospectInvitedErrorFinished,
  errorUnexpected,
} from "../../services/__mocks__/Signer";
import { listProducts } from "../../services/__mocks__/Products";
import {
  createSuccessResponse,
  bsaSucessResponse,
  updateSuccessResponse,
  updateStatusSuccessResponse,
  getSuccessResponse,
} from "../../services/__mocks__/AccountRequest";
import Config from "../../services/Config";

const apiURL = Config.coreAPI;

// this is just to return a random id below
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const handlers = [
  // Create email verification
  rest.post(
    `${apiURL}/signers/:signerId/email-verifications`,
    async (req, res, ctx) => {
      if (
        req.params.signerId === "00000000-9999-aaaa-0000-2ea08a01e903" ||
        req.params.signerId === "undefined"
      ) {
        return res(ctx.status(400), ctx.json(errorUpdate), ctx.delay(10));
      }

      return res(ctx.status(204), ctx.body(null));
    }
  ),
  // Consume email verification
  rest.put(
    `${apiURL}/signers/:signerId/email-verifications/:verificationId`,
    async (req, res, ctx) => {
      if (req.params.signerId === "412") {
        return res(ctx.status(412), ctx.json(errorUpdate));
      }
      if (req.params.signerId === "404") {
        return res(ctx.status(404), ctx.json(errorUpdate));
      }
      if (req.params.signerId === "409") {
        return res(ctx.status(409), ctx.json(errorUpdate));
      }

      return res(ctx.json(putToEmailVerificationSuccess));
    }
  ),

  rest.get(`${apiURL}/institutions/:institutionId`, async (req, res, ctx) => {
    const { institutionId } = req.params;

    if (institutionId === "somedomain.com") {
      return res(ctx.status(404), ctx.json(invalidResponse));
    }

    return res(ctx.json(mockInstitution));
  }),

  rest.get(`${apiURL}/institutions/:id/products`, async (req, res, ctx) =>
    res(ctx.json(listProducts))
  ),

  rest.post(`${apiURL}/documents`, async (req, res, ctx) => {
    const { content, institutionId } = req.body;

    // simulate error conditions
    if (
      content === "error" ||
      institutionId === "error" ||
      institutionId === null
    ) {
      return res(ctx.status(412), ctx.json(photoError));
    }

    return res(ctx.json(mockPhotos));
  }),
  rest.get(
    `${apiURL}/prospects/identities/:frontDocumentId/:backDocumentId`,
    async (req, res, ctx) => res(ctx.json(identityInformationSuccess))
  ),
  rest.get(`${apiURL}/identities/:front/:back`, async (req, res, ctx) => {
    if (req.front === "errorId") {
      return res(ctx.status(404), ctx.json(errorUpdate));
    }

    return res(ctx.json(identityInformationSuccess));
  }),
  // SIGNERS
  rest.get(`${apiURL}/signers/:signerId/contract`, async (req, res, ctx) => {
    if (req.params.signerId === "error-embed") {
      return res(ctx.status(404), ctx.json(errorUpdate));
    }
    return res(ctx.json(embedURLSuccess));
  }),
  // Create Signer
  rest.post(`${apiURL}/signers`, async (req, res, ctx) =>
    res(
      ctx.set("x-nimble-token", "sometoken"),
      ctx.json(postToCreateProspectSuccess)
    )
  ),

  // Create Signer
  rest.put(`${apiURL}/signers/:signerId`, async (req, res, ctx) =>
    res(ctx.json(putToUpdateProspectSuccess))
  ),

  // Update Signer
  rest.get(`${apiURL}/signers/:signerId`, async (req, res, ctx) => {
    if (req.params.signerId === "00000000-9999-aaaa-0000-2ea08a01e903") {
      return res(ctx.status(200), ctx.json(prospectSignerInvited));
    }

    if (req.params.signerId === "412") {
      return res(ctx.status(412), ctx.json(prospectInvitedErrorFinished));
    }

    return res(ctx.json({ ...prospectSignerSigned, id: uuidv4() }));
  }),

  rest.post(`${apiURL}/signers/:signerId/invites`, async (req, res, ctx) =>
    res(ctx.json("something"))
  ),
  // ACCOUNT Request
  // Create Account Request
  rest.post(`${apiURL}/account-requests`, async (req, res, ctx) => {
    const { productConfigurations } = req.body;

    // simulate only status update
    if (productConfigurations[0].productId === "ERROR") {
      return res(ctx.status(500), ctx.json(errorUnexpected));
    }

    if (productConfigurations[0].productId === "INVALID") {
      return res(ctx.status(400), ctx.json(errorUpdate));
    }

    if (productConfigurations[0].productId === "NETWORK") {
      return res.networkError("Failed to connect");
    }

    return res(ctx.json(createSuccessResponse));
  }),
  // Upsert BSA
  rest.post(
    `${apiURL}/account-requests/:id/bsa-risk-results`,
    async (req, res, ctx) => res(ctx.json(bsaSucessResponse))
  ),
  // Update Account Request
  rest.put(`${apiURL}/account-requests/:id`, async (req, res, ctx) => {
    const { status } = req.body;

    // simulate only status update
    if (status === "INCOMPLETE") {
      return res(ctx.json(updateStatusSuccessResponse));
    }

    return res(ctx.json(updateSuccessResponse));
  }),
  // Get Account Request
  rest.get(`${apiURL}/account-requests/:id`, async (req, res, ctx) =>
    res(ctx.json(getSuccessResponse))
  ),
];

export { handlers };
