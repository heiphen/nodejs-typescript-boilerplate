import { Router, Request, Response } from 'express';

const healthController = async (req: Request, res: Response) => {
  console.log('Hi');
  res.status(200).json({ status: true });
};

export const healthRouter = (): Router => {
  const router: Router = Router();
  router.get('/', healthController);

  return router;
};
