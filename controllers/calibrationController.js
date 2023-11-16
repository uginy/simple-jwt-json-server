import ApiError from "../errors/apiErrors.js";

const pointTypeMap = {
    Distance: 'distance_points',
    Direction: 'direction_points',
    ROI: 'roi_points',
    Control: 'control_points',
}

const defaultPoints = {
    distance_points: [],
    direction_points: [],
    roi_points: [],
    control_points: [],
}

var markingType = "Default";
var formStateDisk = {
    state: "Compute_Available",
    fov: 2222,
    marking: false,
    camera_id: "VC666602_sensor180013",
    intrinsic_file: "string",
    direction_points: "string",
    extrinsic_output: "string",
    roi_points: "roi_points",
    points: {
        distance_points: [
            {
                point_type: "Distance",
                distance: 12,
                color: "color",
                width: 0,
                name: "name1",
                comment: "comment",
                height: 6
            },
            {
                point_type: "Distance",
                distance: 1.12,
                color: "color",
                width: 0,
                name: "name2",
                comment: "comment",
                height: 6
            }
        ],
        direction_points: [
            {
                point_type: "Direction",
                distance: 0,
                color: "color",
                width: 0,
                name: "name1",
                comment: "comment",
                height: 6
            },
        ],
        roi_points: [
            {
                point_type: "ROI",
                distance: 0,
                color: "color",
                width: 0,
                name: "name1",
                comment: "comment",
                height: 6
            },
        ],
        control_points: [
            {
                point_type: "Control",
                distance: 0,
                color: "color",
                width: 0,
                name: "name1",
                comment: "comment",
                height: 6
            },
        ]
    },
    distance_csv_file: "distance_csv_file",
    settings: {
        action: "None",
        camera_height: 470,
        auto_calib: false,
        non_flat_surface: false,
    }
};
var formState = {
    state: "Compute_Available",
    fov: 1111,
    marking: false,
    camera_id: "VC666602_sensor180013",
    intrinsic_file: "string",
    direction_points: "string",
    extrinsic_output: "string",
    roi_points: "roi_points",
    points: {
        distance_points: [
            {
                point_type: "Distance",
                distance: 12,
                color: "color",
                width: 0,
                name: "name1",
                comment: "comment",
                height: 6
            },
            {
                point_type: "Distance",
                distance: 1.12,
                color: "color",
                width: 0,
                name: "name2",
                comment: "comment",
                height: 6
            },
            {
                point_type: "Distance",
                distance: 1.12,
                color: "color",
                width: 0,
                name: "name3",
                comment: "comment",
                height: 6
            },
            {
                point_type: "Distance",
                distance: 1.12,
                color: "color",
                width: 0,
                name: "name4",
                comment: "comment",
                height: 6
            }
        ],
        direction_points: [
            {
                point_type: "Direction",
                distance: 0,
                color: "color",
                width: 0,
                name: "name1",
                comment: "comment",
                height: 6
            },
            {
                point_type: "Direction",
                distance: 0,
                color: "color",
                width: 0,
                name: "name2",
                comment: "comment",
                height: 6
            },
            {
                point_type: "Direction",
                distance: 0,
                color: "color",
                width: 0,
                name: "name3",
                comment: "comment",
                height: 6
            }
        ],
        roi_points: [
            {
                point_type: "ROI",
                distance: 0,
                color: "color",
                width: 0,
                name: "name1",
                comment: "comment",
                height: 6
            },
            {
                point_type: "ROI",
                distance: 0,
                color: "color",
                width: 0,
                name: "name2",
                comment: "comment",
                height: 6
            },
            {
                point_type: "ROI",
                distance: 0,
                color: "color",
                width: 0,
                name: "name3",
                comment: "comment",
                height: 6
            }
        ],
        control_points: [
            {
                point_type: "Control",
                distance: 0,
                color: "color",
                width: 0,
                name: "name1",
                comment: "comment",
                height: 6
            },
            {
                point_type: "Control",
                distance: 0,
                color: "color",
                width: 0,
                name: "name2",
                comment: "comment",
                height: 6
            },
            {
                point_type: "Control",
                distance: 0,
                color: "color",
                width: 0,
                name: "name3",
                comment: "comment",
                height: 6
            }
        ]
    },
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
        const currentPointType = pointTypeMap[req.body.point_type]
        try {
            const foundIndex = formState.points[currentPointType]?.findIndex((el) => el.width === PointLocation.width && el.height === PointLocation.height);
            if (foundIndex !== -1) {
                formState.points[currentPointType][foundIndex] = PointLocation;
            } else {
                if (!formState.points[currentPointType]?.length) {
                    formState.points[currentPointType] = []
                }
                formState.points[currentPointType].push(PointLocation);
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
                formState = {
                    ...formState,
                    points: defaultPoints
                }
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
            response.state = ["Extrinsics_Exists", "Compute_available"][Math.random() > 0.5 ? 1 : 0]
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next(ApiError.notFound("Get state error"));
        }
    }

    async updateState(req, res, next) {
        const isReset = req.body.action === 'Reset'
        const isLoad = req.body.action === 'Load'
        try {
            formState = {
                ...formState,
                points: isReset ? defaultPoints : isLoad ? formStateDisk.points : formState.points,
                settings: {...req.body }
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
