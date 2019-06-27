import TelegramBot from 'telegram-bot/telegram-bot';
import Cron = require('cron');

class Scheduler {
  constructor() {
    this.setupScheduler();
  }

  private setupScheduler() {
    new Cron.CronJob('0 0 7 * * *', this.onEveryDaySixOclock).start();
  }

  private onEveryDaySixOclock() {
    TelegramBot.sendAtMostTwoMusics();
  }
}

const exitHandler = () => {
  TelegramBot.sendBufferMusicsToAdmin();
};

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);

new Scheduler();
