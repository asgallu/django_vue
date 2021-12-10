import Api from "../Api"

export class ApiPort extends Api {
    constructor() {
        super()
    }

    async getLoadingPort(id = -1) {
        return await super.get("loadingport", id)
    }

    async saveLoadingPort(obj) {
        return await super.save("loadingport", obj)
    }

    async delLoadingPort(id) {
        return await super.delete("loadingport", id)
    }

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