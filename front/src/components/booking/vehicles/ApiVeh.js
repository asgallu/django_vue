import Api from "../Api"

export class ApiVeh extends Api {
    constructor() {
        super()
    }

    async getBooking(id = -1) {
        return await super.get("booking", id)
    }

    async saveBooking(obj) {
        return await super.save("booking", obj)
    }

    async delBooking(id) {
        return await super.delete("booking", id)
    }

    async getVehicle(id = -1) {
        return await super.get("vehicle", id)
    }

    async saveVehicle(obj) {
        return await super.save("vehicle", obj)
    }

    async delVehicle(id) {
        return await super.delete("vehicle", id)
    }


}