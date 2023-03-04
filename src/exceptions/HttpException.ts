export class HttpException extends Error {
  public status: number;
  public message: string;
  public success: boolean

  constructor(status: number, message: string, success: boolean) {
    super(message);
    this.status = status;
    this.message = message;
    this.success = success;

  }
}
