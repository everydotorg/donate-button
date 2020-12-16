import {either} from 'fp-ts/Either';
import {
	failure,
	intersection,
	partial,
	string,
	success,
	type,
	Type,
	TypeOf,
	UnknownRecord
} from 'io-ts';

/**
 * Codec that when decoded validates that an input is a JSON object encoded as a
 * string, and when encoded flushes an object back down to a JSON string
 */
export const jsonStringCodec = new Type<TypeOf<typeof UnknownRecord>, string>(
	'JSONString',
	UnknownRecord.is,
	function validateJsonString(input, ctx) {
		return either.chain(string.validate(input, ctx), (stringInput) => {
			try {
				return success(JSON.parse(stringInput));
			} catch {
				return failure(input, ctx, 'Could not parse JSON string');
			}
		});
	},
	function encodeToJsonString(value) {
		return JSON.stringify(value);
	}
);

/**
 * Codec that when decoded validates that a given string is a valid URL
 */
export const urlCodec = new Type<URL, string>(
	'URL',
	function isUrl(value): value is URL {
		return value instanceof URL;
	},
	function validateUrl(input, ctx) {
		try {
			return success(new URL(input as any));
		} catch (error: unknown) {
			return failure(
				input,
				ctx,
				`Could not parse URL${
					error instanceof Error ? `: ${error.message}` : ''
				}`
			);
		}
	},
	function urlToString(url) {
		return url.toString();
	}
);

/**
 * Codec that validates and decodes input values as stored in the client data
 * namespace
 */
export const namespaceValueCodec = jsonStringCodec.pipe(
	intersection([
		type({bundleUrl: urlCodec}),
		partial({clientName: string, notes: string})
	])
);
/**
 * Shape of values stored in the client data namespace
 */
export type NamespaceValue = TypeOf<typeof namespaceValueCodec>;
