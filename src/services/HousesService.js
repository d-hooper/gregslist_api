import { dbContext } from "../db/DbContext.js"

class HousesService {
  async getAllHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    return house
  }
}

export const housesService = new HousesService()