export class HandlerType {
    durations: number[];
    constructor();
    addDuration(duration: number): void;
    average(): number;
    median(): number;
    min(): number;
    max(): number;
    sum(): number;
    count(): number;
    stdDev(): number;
    variance(): number;
    length(): number;
    clear(): void;
  }
  