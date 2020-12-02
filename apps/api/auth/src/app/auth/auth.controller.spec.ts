import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    // const appController = app.get<AppController>(AppController);
    // expect(appController.getData()).toEqual({ message: 'Welcome to api!' });
    expect(controller).toBeDefined();
  });
});
