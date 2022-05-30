// TODO: create rule of linter, which env implement Environment interface
export type Environment = {
  port: number;
  prefix: string;
  production: boolean;
};
