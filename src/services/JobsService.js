import { dbContext } from "../db/DbContext.js"

class JobsService {
  async getJobsByQuery(jobQuery) {
    const jobs = await dbContext.Jobs.find(jobQuery)
    return jobs
  }

}

export const jobsService = new JobsService()