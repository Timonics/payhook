import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Request, Response } from 'express';

@ApiTags('Payments') // groups it in Swagger UI
@Controller('webhook')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  /**
   * Stripe Webhook Endpoint
   *
   * Receives Stripe event payloads and verifies signatures.
   * The raw body (configured in main.ts) is required for
   * signature verification.
   */
  @Post('stripe')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Handle Stripe webhook events',
    description:
      'Stripe sends event notifications here. Expects the exact raw body for signature verification.',
  })
  @ApiResponse({ status: 200, description: 'Event processed successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid signature or other error.',
  })
  async stripeWebHook(@Req() req: Request, @Res() res: Response) {
    try {
      await this.paymentService.handleStripeWebhook(req);
      res.json({ received: true });
    } catch (err) {
      throw new BadRequestException('webhook error');
    }
  }
}
