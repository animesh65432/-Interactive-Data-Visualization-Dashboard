import { RequestHandler } from "express";
import db from "../../Db";
import { ErrorResponse, SucessResponse } from "../../Utils";
import { RetrivethedatabyspefictimeTypes } from "../../types"

const RetrieveDataByTimeRange: RequestHandler = async (req, res) => {
    try {
        const { startDate, endDate } = req.query as RetrivethedatabyspefictimeTypes

        if (!startDate || !endDate) {
            ErrorResponse(res, "Please provide valid startDate and endDate", 400);
            return
        }







        const data = await db.dataVisualizationDashboard.findMany({
            where: {
                Day: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });




        SucessResponse(res, "Data retrieved successfully", data);

    } catch (error) {
        console.error("Error retrieving data by time range:", error);
        ErrorResponse(res, "An unexpected error occurred", 500);
    }
};

export { RetrieveDataByTimeRange };