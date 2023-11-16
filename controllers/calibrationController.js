import ApiError from "../errors/apiErrors.js";

var markingType = "Default";
var formState = {
    state: "Compute_Available",
    fov: 1111,
    point_type: "Distance",
    marking: false,
    camera_id: "VC666602_sensor180013",
    intrinsic_file: "string",
    direction_points: "string",
    extrinsic_output: "string",
    roi_points: "roi_points",
    points: [
        {
            width: 10,
            height: 20,
            name: "P01",
            distance: 30,
            comment: "Comment here",
            color: "3FC6D4",
        },
        {
            width: 11,
            height: 23,
            name: "P11",
            distance: 37,
            comment: "Comment here",
            color: "D4C157",
        },
    ],
    distance_csv_file: "distance_csv_file",
    settings: {
        action: "None",
        camera_height: 470,
        auto_calib: false,
        non_flat_surface: false,
    }
};

class RecorderController {
    async setPointType(req, res, next) {
        const PointType = req.body;
        // console.log("PT", req.body);
        try {
            formState.point_type = PointType;
            // console.log(formState);
            return res.status(201).json();
        } catch (error) {
            console.log(error);
            next(ApiError.notFound("setPointType error"));
        }
    }

    async setPointLocation(req, res, next) {
        const PointLocation = req.body;
        try {
            const findedIndex = formState.points.findIndex((el) => el.width === PointLocation.width && el.height === PointLocation.height);
            if (findedIndex !== -1) {
                formState.points[findedIndex] = PointLocation;
            } else {
                // console.log(PointLocation);
                formState.points.push(PointLocation);
            }
            console.log(formState);
            return res.status(201).json();
        } catch (error) {
            console.log(error);
            next(ApiError.notFound("setPointLocation error"));
        }
    }

    async getPointLocation(req, res, next) {
        try {
            // console.log(req.query);
            const preview = {
                width: 640,
                height: 480,
            };

            return res.status(201).json({
                width: (+req.query.width * (200 / preview.width) - 99).toString(),
                height: (250 - +req.query.height * (250 / preview.height)).toString(),
            });
        } catch (error) {
            console.log(error);
            next(ApiError.notFound("setPointLocation error"));
        }
    }

    async setMarkingType(req, res, next) {
        const Marking = req.body;
        try {
            markingType = Marking;
            if (Marking === "Start") {
                formState.marking = true;
            }
            if (Marking === "Stop") {
                formState.marking = false;
            }
            if (Marking === "Clear") {
                formState.points = [];
            }
            // console.log(formState);
            return res.status(204).json(markingType);
        } catch (error) {
            console.log(error);
            next(ApiError.notFound("setPointType error"));
        }
    }

    async getState(req, res, next) {
        const response = formState;
        try {
            // console.log(formState);
            response.extrinsic_output = `asdasdasd`;
            response.state = ["Extrinsics_Exists","Compute_available"][Math.random() > 0.5 ? 1 : 0]
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next(ApiError.notFound("Get state error"));
        }
    }

    async updateState(req, res, next) {
        try {
            // console.log(req.body);
            formState = {
                ...formState,
                settings: req.body
            };
            return res.status(204).json();
        } catch (error) {
            console.log(error);
            next(ApiError.notFound("Update settings error"));
        }
    }

    async updateRoi(req, res, next) {
        try {
            return res.status(201).json();
        } catch (error) {
            console.log(error);
            next(ApiError.notFound("Update settings error"));
        }
    }

}

export default new RecorderController();
