declare module "easy-currencies" {
  export function Convert(value: number): {
    from: (base: string) => {
      to: (target: string) => Promise<number>;
    };
  };

  export class Converter {
    constructor(value: number, base: string);
    to(target: string): Promise<number>;
  }

  export const providers: any;
}
