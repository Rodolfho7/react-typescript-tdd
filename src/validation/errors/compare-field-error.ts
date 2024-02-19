export class CompareFieldError extends Error {
  constructor() {
    super('Comparação de campos inválidos');
    this.name = 'CompareFieldError';
  }
}