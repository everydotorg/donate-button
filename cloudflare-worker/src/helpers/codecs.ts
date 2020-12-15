import { either } from "fp-ts/Either";
import {
  failure,
  intersection,
  partial,
  string,
  success,
  type,
  Type,
  TypeOf,
  UnknownRecord,
} from "io-ts";

/**
 * Codec that takes an object to encode as JSON
 */
export const jsonStringCodec = new Type<TypeOf<typeof UnknownRecord>, string>(
  "JSONString",
  UnknownRecord.is,
  function validateJsonString(input, ctx) {
    return either.chain(string.validate(input, ctx), (strInput) => {
      try {
        return success(JSON.parse(strInput));
      } catch (err) {
        return failure(input, ctx, "Could not parse JSON string");
      }
    });
  },
  function encodeToJsonString(value) {
    return JSON.stringify(value);
  }
);

export const urlCodec = new Type<URL, string>(
  "URL",
  function isUrl(value): value is URL {
    return value instanceof URL;
  },
  function validateUrl(input, ctx) {
    try {
      return success(new URL(input as any));
    } catch (err) {
      return failure(input, ctx, `Could not parse URL: ${err.message}`);
    }
  },
  function urlToString(url) {
    return url.toString();
  }
);

export const namespaceValueCodec = jsonStringCodec.pipe(
  intersection([
    type({ bundleUrl: urlCodec }),
    partial({ clientName: string, notes: string }),
  ])
);
export type NamespaceValue = TypeOf<typeof namespaceValueCodec>;
