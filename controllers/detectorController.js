var formState = {
    Multiclass: { DetectorStatus: false},
    Segmentation: { DetectorStatus: false},
    FCW: { DetectorStatus: false},
    V2I: { DetectorStatus: true},
}

class DetectorController {

    async getMulticlass(req, res) {
        console.log(formState)
        return res.status(201).json(formState.Multiclass)
    }

    async getSegmentation(req, res) {
        console.log(formState)
        return res.status(201).json(formState.Segmentation)
    }

    async getFcw(req, res) {
        console.log(formState)
        return res.status(201).json(formState.FCW)
    }

    async getV2i(req, res) {
        console.log(formState)
        return res.status(201).json(formState.V2I)
    }

    async updateMulticlass(req, res) {
        formState.Multiclass = req.body;
        return res.status(201).json(formState.Multiclass)
    }

    async updateSegmentation(req, res) {
        formState.Segmentation = req.body;
        return res.status(201).json(formState.Segmentation)
    }

    async updateFcw(req, res) {
        formState.FCW = req.body;
        return res.status(201).json(formState.FCW)
    }

    async updateV2i(req, res) {
        formState.V2I = req.body;
        return res.status(201).json(formState.V2I)
    }
}

export default new DetectorController();
