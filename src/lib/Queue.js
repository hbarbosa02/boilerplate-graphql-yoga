import Bee from 'bee-queue'

import redisConfig from '~/config/redis'

const jobs = []

class Queue {
  constructor() {
    this.queues = {}

    this.init()
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      }
    })
  }

  add(queue, job) {
    return this.queues[queue].bee
      .createJob(job)
      .retries(5)
      .save()
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key]
      bee
        .on('failed', this.handleFailure)
        .on('succeeded', this.handleSuccess)
        .process(handle)
    })
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err)
  }

  handleSuccess(job) {
    console.log(`Job ${job.id} succeeded with result: ${job.queue.name}`)
  }
}

export default new Queue()
