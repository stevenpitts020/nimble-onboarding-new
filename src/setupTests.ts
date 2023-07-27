// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
// Important: I need to import this because of react hook form
import "mutationobserver-shim";
// need this because of lottie
import "jest-canvas-mock";

// testing components with sessionStorage and localStorage
import "mock-local-storage";

// setup MSW
import { server } from "./support/msw/server";

beforeAll(() => {
  // mock scrollTo used in some components
  window.scrollTo = jest.fn();

  // Establish requests interception layer before all tests.
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        "Found an unhandled %s request to %s",
        req.method,
        req.url.href
      );
    },
  });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
