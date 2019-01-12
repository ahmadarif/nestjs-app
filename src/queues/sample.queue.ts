import { Job } from "bull";
import { ApplicationContext } from "../app.context";
import { PhotoService } from "../services/photo.service";

export const SampleQueue = async (job: Job) => {
  console.log(`Queue ${job.id} started`);
  const context = await ApplicationContext();
  const photoService = context.get(PhotoService) as PhotoService;

  const photos = await photoService.findAll();
  console.log('Photos = ', photos);
  console.log('Name = ', job.data.name);

  // add delay
  await delay(5000);
  console.log(`Queue ${job.id} finished`);
}

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}