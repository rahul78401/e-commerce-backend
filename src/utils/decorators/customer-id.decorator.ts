import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CustomerId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.customerId;
  },
);
