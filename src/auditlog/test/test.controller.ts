import { Controller, Body, Post, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
    @Post()
  async testEndpoint(@Body() body: any) {
    // Just echo back the body so the interceptor has something to log
    return { id: 'dummy-id', ...body };
  }

  @Get()
  async getAllData() {
    return { message: 'This endpoint returns all test data' };
  }
}
