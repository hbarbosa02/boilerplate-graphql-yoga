import { CronJob } from 'cron'

import scheduleConfig from '~/config/schedule'

const jobs = []

class Schedule {
  constructor() {
    this.tasks = {}

    this.init()
  }

  init() {
    jobs.forEach(
      ({ key, schedule, handle, start = false, runOnInit = false }) => {
        this.tasks[key] = new CronJob({
          context: scheduleConfig.context,
          timeZone: scheduleConfig.timezone,
          cronTime: schedule,
          onTick: () => {
            console.log(`Task ${key} handle`)

            return handle()
          },
          runOnInit,
          start,
        })
      }
    )
  }

  processTasks() {
    return this.tasks
  }
}

export default new Schedule()
