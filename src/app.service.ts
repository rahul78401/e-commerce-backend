import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as encryption from 'src/utils/encryption.utlis';

@Injectable()
export class AppService {
  getHello() {
    try {
      const a: any = {
        b: {
          c: 2,
        },
      };

      const hash = encryption.hashPasswordUsingBcrypt('Ecom@123');

      return {
        data: hash,
        message: 'Categories fetched successfully',
      };
    } catch (error) {
      console.error('Error in getHello:', error);
      throw new BadRequestException(error.message);
    }
  }
}
