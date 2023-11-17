import { createLogger, format, transports } from "winston";

const customTransport = [
  new transports.Console(),
  new transports.File({
    filename: `logs/${new Date().toISOString().split("T")[0]}.log`,
  }),
];

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
    format.colorize()
  ),
  transports: customTransport,
  exceptionHandlers: customTransport,
});

export default logger;
