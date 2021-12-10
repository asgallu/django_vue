import Api from "../Api"

const nombreEnc = "booking";
const nombreDet = "vehicles";

export class ApiBook extends Api {
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

    async get(id) {
        return await super.get(nombreEnc, id)
    }

    async guardarDetalle(obj) {
        return await super.save(nombreDet, obj);
    }

}