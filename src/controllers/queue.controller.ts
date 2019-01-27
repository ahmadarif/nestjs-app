import { Controller, Get, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from 'nest-bull';

@Controller('queue')
export class QueueController {

  constructor(@InjectQueue('store') readonly queue: Queue) {}

  @Get()
  async sample() {
    const job1 = await this.queue.add('sample', { name: 'Arif 1' });
    const job2 = await this.queue.add('sample', { name: 'Arif 2' });
    const job3 = await this.queue.add('sample', { name: 'Arif 3' });

    Logger.log('Job1 = ' + job1.id);
    Logger.log('Job2 = ' + job2.id);
    Logger.log('Job3 = ' + job3.id);

    return { message: 'Queue fired!' };
  }

}