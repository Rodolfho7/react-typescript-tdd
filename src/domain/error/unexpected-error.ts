export class UnexpectedError extends Error {
  constructor() {
    super('Aconteceu um erro inesperado, tente mais tarde');
    this.name = 'UnexpectedError'
  }
}
