import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {

  constructor() {
    super('api/houses');
    this.router
      .get('', this.getAllHouses)
      .get('/:houseId', this.getHouseById)
      .get('/search', this.getHousesByQuery)
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getAllHouses(request, response, next) {
    try {
      const houses = await housesService.getAllHouses()
      response.send(houses)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async getHouseById(request, response, next) {
    try {
      const houseId = request.params.houseId
      const house = await housesService.getHouseById(houseId)
      response.send(house)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async getHousesByQuery(request, response, next) {
    try {
      const houseQuery = request.query
      const house = await housesService.getHousesByQuery(houseQuery)
      response.send(house)
    } catch (error) {
      next(error)
    }
  }
}