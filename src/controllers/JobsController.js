import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs');
    this.router
      .get('/search', this.getJobsByQuery)
      .get('/:jobId', this.getJobById)

  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getJobsByQuery(request, response, next) {
    try {
      const jobQuery = request.query
      const job = await jobsService.getJobsByQuery(jobQuery)
      response.send(job)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async getJobById(request, response, next) {
    const jobId = request.params.jobId
    const job = await jobsService.getJobById(jobId)
    response.send(job)
  }
}