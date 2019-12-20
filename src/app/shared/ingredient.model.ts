export class Ingredient {
  public static INGREGIENT_AMOUNT_PATTERN: any = /^[1-9]+[0-9]*$/;

  constructor(public name: string, public amount: number) {}
}
