import { HandlerType } from './handler';
import { Request, Response, NextFunction } from 'express';

interface SawmillConfig {
  precision?: string;
  method?: string;
  path?: string;
  version?: string;
}

interface HandlerFunction {
  (req: Request, res: Response): Promise<void>;
  name?: string;
}

interface SawmillFunction {
  (handler?: HandlerFunction, config?: SawmillConfig, stats?: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
  stats?: Record<string, HandlerType>;
}

export const sawmill: SawmillFunction;
