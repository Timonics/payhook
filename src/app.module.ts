import { Module } from '@nestjs/common';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsService } from './payments/payments.service';

@Module({
  imports: [PaymentsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class AppModule {}
