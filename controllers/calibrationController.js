const ApiError = require("../errors/apiErrors");

var markingType = "Default";
var formState = {
  camera_id: "string",
  point_type: "Distance",
  points: [
    {
      width: 10,
      height: 20,
      name: "P01",
      distance: 30,
      comment: "Comment here",
      color: "#3FC6D4",
    },
    {
      width: 11,
      height: 23,
      name: "P11",
      distance: 37,
      comment: "Comment here",
      color: "#D4C157",
    },
  ],
  intrinsic_file: "string",
  distance_csv_file: "string",
  direction_points: "string",
  roi_points: "string",
  extrinsic_output: "string",
}

class RecorderController {
  
  async setPointType(req, res, next) {

    const PointType = req.body;
    console.log('PT', req.body)
    try {
      formState.point_type = PointType;
      console.log(formState);
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("setPointType error"));
    }
  }

  async setPointLocation(req, res, next) {

    const PointLocation = req.body;
    try {
      formState.points.push(PointLocation);
      console.log(formState);
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("setPointLocation error"));
    }
  }

  async setMarkingType(req, res, next) {

    const Marking = req.body;
    try {
      markingType = Marking
      if(Marking === 'Clear') {
        formState.points = []
      }
      console.log(formState);
      return res.status(201).json(markingType);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("setPointType error"));
    }
  }

  async getState(req, res, next) {
    const response = formState;
    try {
      console.log(formState);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(ApiError.notFound("Get state error"));
    }
  }
}

module.exports = new RecorderController();
