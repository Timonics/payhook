import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { Request } from 'express';
import { config } from 'dotenv';

config();

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
  });

  async handleStripeWebhook(req: Request) {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new NotFoundException('webhook secret not found');
    }

    let event: Stripe.Event;

    event = this.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    // Handling the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          'Payment intent with id ',
          paymentIntent.id,
          'was successful!',
        );
        break;

      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        const failureMessage =
          failedPaymentIntent.last_payment_error &&
          failedPaymentIntent.last_payment_error.message;
        console.log(
          'Payment intent with id ',
          failedPaymentIntent.id,
          'failed with message: ',
          failureMessage,
        );
        break;

      case 'payment_intent.canceled':
        const canceledPaymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          'Payment intent with id ',
          canceledPaymentIntent.id,
          'was canceled...',
        );
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}
