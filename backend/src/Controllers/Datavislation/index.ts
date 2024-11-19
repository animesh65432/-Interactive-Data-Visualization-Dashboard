import { RequestHandler } from "express";
import db from "../../Db";
import { ErrorResponse, SucessResponse } from "../../Utils"

type FilterTypes = {
    startDate: string;
    endDate: string;
    gender?: string;
    ageRange?: string;
}

const parseAgeRange = (ageRange: string) => {
    if (ageRange === ">25") {
        return { equals: ">25" };
    }
    else {

        return { equals: "15-25" };
    }
    return null;
};


const RetrieveFilteredData: RequestHandler = async (req, res) => {
    try {
        const { startDate, endDate, gender, ageRange } = req.query as FilterTypes;


        if (!startDate || !endDate) {
            ErrorResponse(res, "Please provide a valid startDate and endDate", 400);
            return;
        }


        const filters: any = {
            Day: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (gender) {
            filters.Gender = { equals: gender };
        }

        if (ageRange) {
            const ageFilter = parseAgeRange(ageRange);
            if (ageFilter) {
                filters.Age = ageFilter;
            } else {
                ErrorResponse(res, "Invalid age range format. Use '15-25' or '>25'.", 400);
                return;
            }
        }


        const data = await db.dataVisualizationDashboard.findMany({
            where: filters,
        });


        SucessResponse(res, "Data retrieved successfully", data);
    } catch (error) {
        console.error("Error retrieving data:", error);
        ErrorResponse(res, "An unexpected error occurred", 500);
    }
};




export { RetrieveFilteredData };