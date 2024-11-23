import { RequestHandler } from "express";
import db from "../../Db";
import { ErrorResponse, SucessResponse } from "../../Utils"
import { parse, isValid } from 'date-fns';

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

        console.log("Raw Start Date:", startDate, "Raw End Date:", endDate);

        if (!startDate || !endDate) {
            ErrorResponse(res, "Please provide a valid startDate and endDate", 400);
            return;
        }


        const formatStartDate = parse(startDate, 'MM/dd/yyyy', new Date());
        const formatEndDate = parse(endDate, 'MM/dd/yyyy', new Date());

        console.log("Parsed Start Date:", formatStartDate, "Parsed End Date:", formatEndDate);
        console.log("Start Date Type:", typeof formatStartDate, "End Date Type:", typeof formatEndDate);


        if (!isValid(formatStartDate) || !isValid(formatEndDate)) {
            ErrorResponse(res, "Invalid date format. Please use 'MM/dd/yyyy'.", 400);
            return;
        }

        const filters: any = {
            Day: {
                gte: formatStartDate,
                lte: formatEndDate,
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


        console.log("Filters:", filters);


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