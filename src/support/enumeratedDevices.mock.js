import { jest } from "@jest/globals";

Object.defineProperty(window, "navigator", {
  writable: true,
  value: {
    mediaDevices: {
      enumerateDevices: jest.fn(
        () =>
          new Promise((res) => {
            res([
              {
                deviceId: "default",
                kind: "videoinput",
                label: "",
                groupId: "default",
              },
            ]);
          })
      ),
    },
  },
});
