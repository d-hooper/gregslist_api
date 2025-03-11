import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js"

class HousesService {
  async getAllHouses() {
    const houses = await dbContext.Houses.find().populate('creator')
    return houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('creator')
    if (house == null) {
      throw new BadRequest(`${houseId} is not a valid house ID`);
    }
    return house
  }

  async getHousesByQuery(houseQuery) {
    const pageNum = houseQuery.page || 1
    delete houseQuery.page

    const houseLimit = 10
    const skipBy = (pageNum - 1) * houseLimit

    const sortBy = houseQuery.sortBy
    delete houseQuery.sortBy

    const houseCount = await dbContext.Houses.countDocuments(houseQuery)
    const totalPages = Math.ceil(houseCount / houseLimit)

    const houses = await dbContext.Houses
      .find(houseQuery)
      .limit(houseLimit)
      .skip(skipBy)
      .sort(sortBy)
      .populate('creator')

    const toReturn = {
      houses,
      houseCount,
      totalPages
    }

    return toReturn
  }
}

export const housesService = new HousesService()