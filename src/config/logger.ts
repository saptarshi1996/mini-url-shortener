import winston from 'winston'

export default winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
          const { timestamp, level, message } = info
          const messageString = typeof message === 'object' ? JSON.stringify(message) : message
          const dateTime = timestamp.replace('T', ' ').replace('Z', '')
          info.message = `${dateTime} [${level.toUpperCase()}] ${messageString}`
          return info.message
        })
      )
    })
  ]
})
