import Api from "../Api"

export class ApiBook extends Api {
    constructor() {
        super()
    }
    //booking
    async getBooking(id = -1) {
        return await super.get("booking", id)
    }

    async saveBooking(obj) {
        return await super.save("booking", obj)
    }

    async delBooking(id) {
        return await super.delete("booking", id)
    }
    //loading port
    async getLoadingPort(id = -1) {
        return await super.get("loadingport", id)
    }

    async saveLoadingPort(obj) {
        return await super.save("loadingport", obj)
    }

    async delLoadingPort(id) {
        return await super.delete("loadingport", id)
    }
    //discharge port
    async getDischargePort(id = -1) {
        return await super.get("dischargeport", id)
    }

    async saveDischargePort(obj) {
        return await super.save("dischargeport", obj)
    }
    async delDischargePort(id) {
        return await super.delete("dischargeport", id)
    }
}