export enum DonateUrlParameters {
	DONATE_NONPROFIT_ID = 'donateTo',
	JOIN_DONATION_ID = 'joinTo',
	JOIN_DONATION_USER_ID = 'joinUser',
	MATCH_CAMPAIGN = 'match',
	DONATION_HEADER_TEXT = 'donation_header_text',

	REDIRECT_URL = 'redirect_url',
	FUNDRAISER_ID = 'fundraiser_id',
	MIN_VALUE = 'min_value',
	FREQUENCY_OPTIONS = 'frequency_options',
	REQUIRE_SHARE_INFO = 'require_share_info',

	METHOD = 'method',

	AMOUNT = 'amount',
	FREQUENCY = 'frequency',
	DONOR_FIRST_NAME = 'first_name',
	DONOR_LAST_NAME = 'last_name',
	DONOR_EMAIL = 'email',
	DESCRIPTION = 'description',
	MONTHLY_TITLE = 'monthlyTitle',

	PARTNER_DONATION_ID = 'partner_donation_id',
	PARTNER_WEBHOOK_TOKEN = 'webhook_token',
	PARTNER_METADATA = 'partner_metadata',
	TO_NONPROFITS = 'to_nonprofits',
	TO_NONPROFIT_WEIGHTS = 'to_nonprofit_weights',
	TO_NONPROFIT_MATCHINGS = 'to_nonprofit_matchings',
	RECURRING_MATCHES = 'recurring_matches',

	SHARE_INFO = 'share_info',
	NO_EXIT = 'no_exit',

	SUCCESS_URL = 'success_url',

	EXIT_URL = 'exit_url',

	GIFT_CARD_AMOUNT = 'gift_card_amount',
	GIFT_CARD_QUANTITY = 'gift_card_quantity',
	GIFT_CARD_NONPROFIT_ID = 'gift_card_nonprofit_ID',
	GIFT_CARD_TAG_ID = 'gift_card_tag_ID',

	THEME_COLOR = 'theme_color',
	THEME_COLOR_HIGHLIGHT = 'theme_color_highlight',

	CRYPTO_AMOUNT = 'crypto_amount',
	CRYPTO_CURRENCY = 'crypto_currency',

	STOCK_SYMBOL = 'stock_symbol',
	STOCK_AMOUNT = 'stock_amount',

	SUGGESTED_AMOUNTS = 'suggestedAmounts',

	DESIGNATION = 'designation',

	PRIVATE_NOTE = 'private_note',
	PUBLIC_TESTIMONY = 'public_testimony',

	SEARCH_META = 'search_meta',

	GIFT_CARD_CODE = 'gift_card_code'
}

export enum UTM_QUERY_PARAM {
	utm_id = 'utm_id',
	utm_source = 'utm_source',
	utm_medium = 'utm_medium',
	utm_campaign = 'utm_campaign',
	utm_term = 'utm_term',
	utm_content = 'utm_content'
}
