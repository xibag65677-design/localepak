# Authentication — LocalePak

How AI agents and developers obtain credentials for LocalePak.

## Discover

LocalePak is a public business directory. All directory content — business
listings, company profiles, professional profiles, job posts, city and
category pages, and blog guides — is public and readable without an
account, an API key, or any other credential. Start at https://www.localepak.com/docs and
https://www.localepak.com/llms.txt for the machine-readable map of the site.

Machine-readable discovery files:

- OpenAPI document: https://www.localepak.com/openapi.json
- MCP server card: https://www.localepak.com/.well-known/mcp/server-card.json
- Agent resource catalog: https://www.localepak.com/.well-known/ard.json
- Authorization-server metadata (RFC 8414): https://www.localepak.com/.well-known/oauth-authorization-server
- Protected-resource metadata (RFC 9728): https://www.localepak.com/.well-known/oauth-protected-resource

## Pick a method

There are only two ways to interact with LocalePak:

1. **Read-only (no credentials).** Fetch any public page directly, or
   use the free read-only JSON API (`GET https://www.localepak.com/api/v1/businesses?q=&city=&category=`,
   `/api/v1/businesses/<slug>`, `/api/v1/categories`, `/api/v1/cities`) or the MCP
   server (`POST https://www.localepak.com/api/mcp`, tools `search_businesses`,
   `get_business`, `list_categories`, `list_cities`). No sign-in, no API key,
   no token, no OAuth. This is the correct method for finding and reading
   listings. Reads are rate-limited to 60 requests per minute per IP, with
   at most 20 results per page.
2. **Listing-owner account (website sign-up only).** Creating or
   managing a listing requires a normal website account. There is no
   API key, OAuth provider, or programmatic token to obtain — account
   sign-up happens on the website itself (see Register below). Listing
   owners sign in with email and password (Firebase Authentication)
   and manage listings in a signed-in browser session. There are no
   write endpoints on the public API.

There is no full OAuth server for LocalePak: no authorization endpoint,
no token endpoint, and no third-party client registration. Do not look
for one, and do not send credentials to any third party claiming to
offer LocalePak API access.

## Register

To list or manage a business on LocalePak:

1. Go to https://www.localepak.com/register and create a free account with your email
   address.
2. Verify your email address using the link sent to your inbox.
3. Sign in and submit your listing from https://www.localepak.com/add-business (business),
   https://www.localepak.com/add-company (company), https://www.localepak.com/add-job (job post) or
   https://www.localepak.com/add-professional (professional profile).
4. Choose a listing tier (see https://www.localepak.com/pricing.md). Payment is made by
   Easypaisa, JazzCash or bank transfer, with a payment screenshot
   uploaded on the site. Your listing goes live after admin approval.

Business owners manage their listings from the website dashboard
(https://www.localepak.com/dashboard). Agents acting for a business
owner must use that owner's own signed-in browser session — never ask
for, store, or reuse the owner's password or session.

## Claim

A business owner claims and verifies ownership of a listing on the
website, not through the API: sign in at https://www.localepak.com/login,
open the dashboard, and use the listing's own management actions there.
There is no API endpoint that claims, verifies, or transfers a listing,
and no token is issued for claiming one. If a listing was created by the
directory (a seed listing the business has not claimed yet), the owner
contacts support@localepak.com to claim it.

## Exchange

There is no Exchange step: LocalePak issues no access tokens and has
no token endpoint, so there is nothing to exchange a code for. Any
OAuth-style `authorization_code` or token-exchange flow you have seen
documented for other services does not exist here. Do not send an
`Authorization` header to the API — a request that presents one is
rejected with `401 invalid_token` (see Errors below).

## Use the access_token

There is no access_token. Public reads need no `Authorization` header
at all:

```bash
# Search businesses (free, no key)
curl "https://www.localepak.com/api/v1/businesses?q=restaurants&city=Lahore"

# One business by slug
curl "https://www.localepak.com/api/v1/businesses/nayatel"

# Categories and cities
curl "https://www.localepak.com/api/v1/categories"
curl "https://www.localepak.com/api/v1/cities?q=lahore"
```

Responses are JSON with `ok`, `data`, and (for lists) `pagination`
(`page`, `per_page`, `total`, `total_pages`). Every API response
carries `RateLimit-Limit`, `RateLimit-Remaining`, and
`RateLimit-Reset` headers. Listing owners do their writes in a
signed-in website session, not with a token.

## Errors

API errors are structured JSON: `{ "ok": false, "error": { "code", "message", "hint" } }`.
The `hint` always says what to do next.

| HTTP | code | Meaning / what to do |
| --- | --- | --- |
| 400 | `bad_request` | A parameter was invalid. Read the `hint` and fix the request. |
| 401 | `unauthorized` | An `Authorization` header was sent. LocalePak issues no tokens — remove the header and retry. The response carries `WWW-Authenticate: Bearer realm="LocalePak", error="invalid_token", resource_metadata="https://www.localepak.com/.well-known/oauth-protected-resource"`. |
| 404 | `not_found` | No public business matches that slug. Check the slug, or search with `GET /api/v1/businesses?q=<keyword>`. |
| 405 | `method_not_allowed` | The API is read-only; only GET is supported on `/api/v1/*`, and only POST (JSON-RPC) on `/api/mcp`. |
| 429 | `rate_limited` | Over 60 requests per minute from your IP. Wait for the window to reset (see the `Retry-After` header) instead of retrying in a loop. |
| 500 | `internal_error` | Something failed on the server. Retry once; if it persists, use the public pages instead and contact support@localepak.com. |

- Read public pages directly over HTTPS. No `Authorization` header is
  needed or accepted for public content.
- Respect `robots.txt` (https://www.localepak.com/robots.txt) and the sitemap
  (https://www.localepak.com/sitemap.xml).
- Cite the listing page URL you used. Do not present directory data as
  your own, and do not scrape the site in bulk.
- Questions: support@localepak.com or https://www.localepak.com/contact.

Last updated: 2026-11-10.
