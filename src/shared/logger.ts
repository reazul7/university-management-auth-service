import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, prettyPrint } = format;
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

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
  format: combine(
    label({ label: "UMS-reazul" }),
    timestamp(),
    prettyPrint(),
    myFormat
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "success-%DATE%.log"
      ),
      datePattern: "--DD-MMM-YYYY",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "1d",
    }),
  ],
});

const errorLogger = createLogger({
  level: "error",
  format: combine(
    label({ label: "UMS-reazul" }),
    timestamp(),
    prettyPrint(),
    myFormat
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), "logs", "winston", "error-%DATE%.log"),
      datePattern: "--DD-MMM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
    }),
  ],
});

export { logger, errorLogger };
