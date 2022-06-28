# Running the app

`secret key` (in `index.js` line 1) and `publishable key` (in `index.html` line 104) must be updated.

then run `npm install` & `npm start`

open http://localhost:9876

UPI payment form will be visible. You can use test vpa accounts listed on that page. (They are taken from [Stripe UPI Docs](https://stripe.com/docs/payments/upi/accept-a-payment?platform=web#test-your-integration))

Issues we are seeing:

* Failing vpa accounts receiving same error code. There is no way to distinguish the failure reason
* `payment.pending@stripeupi` is sometimes failing. It is successfull in the stripe end, we can see the payment is successful, but on UI we are stuck at **line 168** in `index.html`

## Previous test data

For payment.pending@stripeupi test

### Successfull


[https://dashboard.stripe.com/test/payments/pi_1LFdQZDDB6WurE3dBg5R4hgj](https://dashboard.stripe.com/test/payments/pi_1LFdQZDDB6WurE3dBg5R4hgj)

**Payment method**: `pm_1LFdQYDDB6WurE3dcp9wAkml`
**Payment intent**: `pi_1LFdQZDDB6WurE3dBg5R4hgj`

For payment confirmation, stripe sdk is sending following request in every ~12 seconds
GET `https://api.stripe.com/v1/payment_intents/pi_1LFdQZDDB6WurE3dBg5R4hgj?key={{ publishable key here }}&is_stripe_sdk=false&client_secret=pi_1LFdQZDDB6WurE3dBg5R4hgj_secret_2IgLmtwNLIJlXtWd8UDtYqYyM`

### Failing

[https://dashboard.stripe.com/test/payments/pi_1LFdYTDDB6WurE3d7PaVGZmy](https://dashboard.stripe.com/test/payments/pi_1LFdYTDDB6WurE3d7PaVGZmy)

**Payment method**: `pm_1LFdYSDDB6WurE3dyJJMOYX0`
**Payment intent**: `pi_1LFdYTDDB6WurE3d7PaVGZmy`

And polling
GET `https://api.stripe.com/v1/payment_intents/pi_1LFdYTDDB6WurE3d7PaVGZmy?key={{ publishable key here }}&is_stripe_sdk=false&client_secret=pi_1LFdYTDDB6WurE3d7PaVGZmy_secret_N1Uwn6GhK3MpLgktxA7UxAkWp`

After 5 minutes we are receiving
HTTP Status 429 and following response body
```json
{
  "error": {
    "code": "lock_timeout",
    "doc_url": "https://stripe.com/docs/error-codes/lock-timeout",
    "message": "This object cannot be accessed right now because another API request or Stripe process is currently accessing it. If you see this error intermittently, retry the request. If you see this error frequently and are making multiple concurrent requests to a single object, make your requests serially or at a lower rate.",
    "type": "invalid_request_error"
  }
}
```
