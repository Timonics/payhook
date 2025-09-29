# Stripe Webhook Listener (NestJS)

A lightweight **NestJS** application that listens for **Stripe webhook events**, verifies their signatures, and exposes interactive **Swagger (OpenAPI)** documentation.

This project is ideal as a portfolio piece demonstrating:

- Secure Stripe webhook integration with raw body parsing.
- Clean NestJS architecture.
- Auto-generated API documentation using Swagger.

---

## ✨ Features

- **Stripe Webhook Endpoint**: Receives and validates events such as `payment_intent.succeeded`.
- **Raw Body Parsing**: Required for Stripe signature verification.
- **Swagger UI**: Interactive API docs at `/api-docs`.
- **TypeScript + NestJS**: Scalable, maintainable backend framework.

---

## 🛠 Tech Stack

| Technology            | Purpose                                    |
| --------------------- | ------------------------------------------ |
| **NestJS**            | Core server framework                      |
| **TypeScript**        | Type safety and modern JavaScript features |
| **Stripe**            | Payment events (webhooks)                  |
| **body-parser**       | Custom raw body parsing for Stripe         |
| **Swagger (OpenAPI)** | Interactive API documentation              |

---

## 📂 Project Structure

```
src/
├─ app.module.ts
├─ main.ts # Bootstraps the NestJS app and configures Swagger + body-parser
└─ payments/
├─ payments.controller.ts # Stripe webhook endpoint
└─ payments.service.ts # Handles event verification & logic
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Timonics/payhook.git
cd payhook
npm install
```

### 2. Environment Variables

Create a .env file in the root with:

```bash
PORT=3000
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

- STRIPE_SECRET_KEY – Your Stripe API key.
- STRIPE_WEBHOOK_SECRET – Webhook signing secret from the Stripe Dashboard.

### 3. Run the Server

```bash
npm run start:dev | npm run dev
Server will run at: http://localhost:3000
```

## 🔑 Stripe Webhook Configuration

In your Stripe Dashboard, create a webhook endpoint:
https://your-domain.com/webhook/stripe
Select events to listen for (e.g., payment_intent.succeeded).

Copy the Signing Secret and place it in .env as STRIPE_WEBHOOK_SECRET.

📘 API Documentation
Swagger UI is auto-generated and available at:

```bash
http://localhost:3000/api-docs
```

## Endpoints
Method Endpoint Description
POST /webhook/stripe Receives Stripe events. Returns { received: true } on success.

## 💡 Development Notes

Raw Body Requirement: Stripe’s signature verification needs the exact raw request body.
We override Nest’s default JSON parser only for /webhook/stripe.

Error Handling: Any verification failure returns 400 Bad Request.

Swagger Decorators: @ApiTags, @ApiOperation, and @ApiResponse make the endpoint self-documenting.

## 🏗 Future Improvements

- Add database logging for webhook events.
- Implement retry handling or event deduplication.
- Extend Swagger docs for additional endpoints.

## 📜 License

MIT License © 2025 [Your Name
