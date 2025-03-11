import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class JobsService {

  async getJobsByQuery(jobQuery) {
    const sortBy = jobQuery.sortBy
    delete jobQuery.sortBy

    const pageNum = jobQuery.page || 1
    delete jobQuery.page

    const jobLimit = 3
    const skipBy = (pageNum - 1) * jobLimit
    const jobCount = await dbContext.Jobs.countDocuments(jobQuery)
    const totalPages = Math.ceil(jobCount / jobLimit)

    const jobs = await dbContext.Jobs
      .find(jobQuery)
      .limit(jobLimit)
      .skip(skipBy)
      .sort(sortBy)
      .populate('creator')

    const toReturn = {
      jobs,
      jobCount,
      totalPages
    }

    return toReturn
  }

  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId)
    if (job == null) {
      throw new BadRequest(`${jobId} is not a valid job ID`);
    }
    return job
  }
}

export const jobsService = new JobsService()