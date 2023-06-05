import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;
import path from "path";

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const newFormatDate = day + " " + month + " " + year;
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${newFormatDate} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(label({ label: "right meow!" }), timestamp(), myFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), "logs", "winston", "success.log"),
      level: "info",
    }),
  ],
});

const errorLogger = createLogger({
  level: "error",
  format: combine(label({ label: "right meow!" }), timestamp(), myFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), "logs", "winston", "error.log"),
      level: "error",
    }),
  ],
});

export { logger, errorLogger };
