import FormatHelper from "./FormatHelper";

describe("FormatHelper", () => {
  describe("isValidDate", () => {
    test("should return true with valid date", () => {
      const result = FormatHelper.isValidDate("1982-12-10");

      expect(result).toEqual(true);
    });

    test("should return true with valid date and divider", () => {
      const result = FormatHelper.isValidDate("1970/01/01", "/");

      expect(result).toEqual(true);
    });

    test("should return true with valid 9 digit date", () => {
      const result = FormatHelper.isValidDate("1982-1-10");

      expect(result).toEqual(true);
    });

    test("should return false with invalid date", () => {
      const result = FormatHelper.isValidDate("1982-0-10");

      expect(result).toEqual(false);
    });

    test("should return false with invalid date - cenas", () => {
      const result = FormatHelper.isValidDate("cenas");

      expect(result).toEqual(false);
    });

    test("should return false with invalid date - undefined", () => {
      const result = FormatHelper.isValidDate(undefined);

      expect(result).toEqual(false);
    });

    test("should return false with invalid date - 01/01/1970", () => {
      const result = FormatHelper.isValidDate("01/01/1970");

      expect(result).toEqual(false);
    });
  });

  describe("dateFormat", () => {
    test("should return formatted date", () => {
      const result = FormatHelper.dateFormat(new Date("1982-12-10 07:00:00"));

      expect(result).toEqual("12/10/1982");
    });

    test("should return formatted date with divider", () => {
      const result = FormatHelper.dateFormat(
        new Date("1982-12-10 07:00:00"),
        "-"
      );

      expect(result).toEqual("12-10-1982");
    });
  });

  describe("durationFormat", () => {
    test("should return formatted duration", () => {
      const result = FormatHelper.durationFormat("12:55");

      expect(result).toEqual("12h 55min");
    });

    test("should return only minutes", () => {
      const result = FormatHelper.durationFormat("15");

      expect(result).toEqual("0min");
    });
  });

  describe("fromNow", () => {
    test("should return formatted date", () => {
      const result = FormatHelper.fromNow(new Date("1982-12-10 07:00:00"));

      expect(result).toEqual("12/10/1982");
    });

    test("should return from now if < 7 days", () => {
      const result = FormatHelper.fromNow(new Date());

      expect(result).toEqual("a few seconds ago");
    });
  });

  describe("isEmpty", () => {
    test("should return true if null", () => {
      const result = FormatHelper.isEmpty(null);

      expect(result).toEqual(true);
    });
    test("should return true if {}", () => {
      const result = FormatHelper.isEmpty({});

      expect(result).toEqual(true);
    });
    test("should return true if new Set()", () => {
      const result = FormatHelper.isEmpty(new Set());

      expect(result).toEqual(true);
    });
    test("should return true if Object.create(null)", () => {
      const result = FormatHelper.isEmpty(Object.create(null));

      expect(result).toEqual(true);
    });
    test('should return true if "" ', () => {
      const result = FormatHelper.isEmpty("");

      expect(result).toEqual(true);
    });
    test("should return false if empty block ", () => {
      // tslint:disable-next-line: no-empty
      const result = FormatHelper.isEmpty(() => {});

      expect(result).toEqual(false);
    });
    test("should return false if using a string", () => {
      // tslint:disable-next-line: no-empty
      const result = FormatHelper.isEmpty("hello");

      expect(result).toEqual(false);
    });
    test("should return false if using an array", () => {
      // tslint:disable-next-line: no-empty
      const result = FormatHelper.isEmpty([1, 2, 3]);

      expect(result).toEqual(false);
    });
    test("should return false if 0", () => {
      const result = FormatHelper.isEmpty(0);

      expect(result).toEqual(false);
    });
  });

  describe("parseFirstAndMiddleName", () => {
    test("should return the first and middle name", () => {
      const joinedName = { firstName: "Mark Richard", middleName: "" };
      const result = FormatHelper.parseFirstAndMiddleName(joinedName);
      expect(result).toEqual({ firstName: "Mark", middleName: "Richard" });
    });
    test("should return first name if no middle name is detected", () => {
      const joinedName = { firstName: "Mark", middleName: "" };
      const result = FormatHelper.parseFirstAndMiddleName(joinedName);
      expect(result).toEqual({ firstName: "Mark", middleName: "" });
    });
    test("should return empty if joinedName is not a string", () => {
      const joinedName = { firstName: undefined, middleName: "" };
      const result = FormatHelper.parseFirstAndMiddleName(joinedName);
      expect(result).toEqual({ firstName: "", middleName: "" });
    });
    test("should return empty string if no middle name none", () => {
      const joinedName = { firstName: "Mark", middleName: "None" };
      const result = FormatHelper.parseFirstAndMiddleName(joinedName);
      expect(result).toEqual({ firstName: "Mark", middleName: "" });
    });
  });

  describe("parseFullAddress", () => {
    test("should return address separated by street, city, state and zip", () => {
      const address = "2405 148TH CT\nURBANDALE, IA 50323";
      const result = FormatHelper.parseFullAddress({ address });
      expect(result).toEqual({
        address: "2405 148TH CT",
        city: "URBANDALE",
        state: "IA",
        zipCode: "50323",
      });
    });

    test("if no \n should return full address", () => {
      const address = "2405 148TH CT URBANDALE, IA 50323";
      const result = FormatHelper.parseFullAddress({ address });
      expect(result).toEqual({
        address: "2405 148TH CT URBANDALE, IA 50323",
        city: "",
        state: "",
        zipCode: "",
      });
    });

    test("if no comma should return address separated by street, city", () => {
      const address = "2405 148TH CT\nURBANDALE IA 50323";
      const result = FormatHelper.parseFullAddress({ address });
      expect(result).toEqual({
        address: "2405 148TH CT",
        city: "URBANDALE IA 50323",
        state: "",
        zipCode: "",
      });
    });

    test("if no space after comma should return address separated by street, city, state", () => {
      const address = "2405 148TH CT\nURBANDALE,IA";
      const result = FormatHelper.parseFullAddress({ address });
      expect(result).toEqual({
        address: "2405 148TH CT",
        city: "URBANDALE",
        state: "IA",
        zipCode: "",
      });
    });

    test("if no results should return empty strings", () => {
      const result = FormatHelper.parseFullAddress(undefined);
      expect(result).toEqual({
        address: "",
        city: "",
        state: "",
        zipCode: "",
      });
    });
  });

  describe("numberToCurrency", () => {
    test("should return number for $1,000,000.99", () => {
      const value = "$1,000,000.99";
      const result = FormatHelper.numberToCurrency(value);

      expect(result).toEqual(1000000.99);
    });
    test("should return number for $40,000.33", () => {
      const value = "$40,000.33";
      const result = FormatHelper.numberToCurrency(value);

      expect(result).toEqual(40000.33);
    });
    test("should return number for $1,234,431", () => {
      const value = "$1,234,431";
      const result = FormatHelper.numberToCurrency(value);

      expect(result).toEqual(1234431);
    });
    test("should return number for $500", () => {
      const value = "$500";
      const result = FormatHelper.numberToCurrency(value);

      expect(result).toEqual(500);
    });
  });
  describe("capitalize", () => {
    test("should return every word of a string capitazized", () => {
      const value = "Bruno Miguel baptista Afonso";
      const result = FormatHelper.capitalize(value);
      expect(result).toEqual("Bruno Miguel Baptista Afonso");
    });
  });
  describe("camelCase", () => {
    test("should return a string camel cased", () => {
      const value = "Jorge Lucas";
      const result = FormatHelper.stringToCamelCase(value);
      expect(result).toEqual("jorgeLucas");
    });
  });

  describe("countryNameToIso", () => {
    test("should return a country iso from a Name", () => {
      const value = "Portugal";
      const result = FormatHelper.countryNameToIso(value);
      expect(result).toEqual("PRT");
    });
  });
});
