import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CONTACT_FIELDS,
  CONTACT_FIELD_LIMITS,
  readContactFieldErrors,
  validateContactFields,
} from "../src/lib/contact-validation";

const validFields = {
  firstName: "Audit",
  lastName: "Test",
  company: "",
  email: "qa@example.invalid",
  phone: "",
  message: "This is a simulated validation request.",
};

test("normalizes names, email and multiline messages without changing valid optional fields", () => {
  const result = validateContactFields({
    ...validFields,
    firstName: "  Me\u0301lissa  ",
    lastName: "  Test  ",
    email: " QA@EXAMPLE.INVALID ",
    phone: " +41 (32) 751-71-46 ",
    message: "  Première ligne\r\nDeuxième ligne\rTroisième ligne  ",
  });
  assert(result.ok);
  assert.deepEqual(result.values, {
    firstName: "Mélissa",
    lastName: "Test",
    company: "",
    email: "qa@example.invalid",
    phone: "+41 (32) 751-71-46",
    message: "Première ligne\nDeuxième ligne\nTroisième ligne",
  });
});

test("reports each invalid field without returning its contents", () => {
  const result = validateContactFields({
    firstName: "   ",
    lastName: null,
    company: "x".repeat(121),
    email: "not-an-email",
    phone: "call me",
    message: "short",
  });
  assert(!result.ok);
  assert.deepEqual(result.fieldErrors, {
    firstName: "required", lastName: "invalidValue", company: "maxLength",
    email: "invalidEmail", phone: "invalidPhone", message: "minLength",
  });
});

test("accepts field limits and rejects one character beyond them", () => {
  const boundaryFields = {
    firstName: "x".repeat(80),
    lastName: "x".repeat(80),
    company: "x".repeat(120),
    email: `${"x".repeat(64)}@${"x".repeat(63)}.${"x".repeat(63)}.${"x".repeat(61)}`,
    phone: "1".repeat(40),
    message: "x".repeat(5000),
  };
  assert(validateContactFields(boundaryFields).ok);
  assert(validateContactFields({ ...validFields, message: "x".repeat(10) }).ok);
  for (const field of CONTACT_FIELDS) {
    assert.equal(boundaryFields[field].length, CONTACT_FIELD_LIMITS[field].max);
    const result = validateContactFields({ ...validFields, [field]: `${boundaryFields[field]}x` });
    assert(!result.ok);
    assert.deepEqual(result.fieldErrors, { [field]: "maxLength" });
  }
});

test("rejects control characters while allowing message line breaks and tabs", () => {
  for (const field of CONTACT_FIELDS) {
    const result = validateContactFields({ ...validFields, [field]: "prefix\u0000suffix" });
    assert(!result.ok);
    assert.equal(result.fieldErrors[field], "invalidValue");
  }
  const nameWithNewline = validateContactFields({ ...validFields, firstName: "First\nSecond" });
  assert(!nameWithNewline.ok);
  assert.equal(nameWithNewline.fieldErrors.firstName, "invalidValue");
  assert(validateContactFields({ ...validFields, message: "First line\n\tSecond line" }).ok);
});

test("ignores malformed or unknown API field errors", () => {
  for (const input of [null, [], "invalid", 12]) assert.deepEqual(readContactFieldErrors(input), {});
  assert.deepEqual(readContactFieldErrors({
    email: "invalidEmail", message: "minLength", phone: "arbitrary text", unknown: "required",
  }), { email: "invalidEmail", message: "minLength" });
});
