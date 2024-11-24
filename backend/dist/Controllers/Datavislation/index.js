"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveFilteredData = void 0;
const Db_1 = __importDefault(require("../../Db"));
const Utils_1 = require("../../Utils");
const date_fns_1 = require("date-fns");
const parseAgeRange = (ageRange) => {
    if (ageRange === ">25") {
        return { equals: ">25" };
    }
    else {
        return { equals: "15-25" };
    }
    return null;
};
const RetrieveFilteredData = async (req, res) => {
    try {
        const { startDate, endDate, gender, ageRange } = req.query;
        console.log("Raw Start Date:", startDate, "Raw End Date:", endDate);
        if (!startDate || !endDate) {
            (0, Utils_1.ErrorResponse)(res, "Please provide a valid startDate and endDate", 400);
            return;
        }
        const formatStartDate = (0, date_fns_1.parse)(startDate, 'MM/dd/yyyy', new Date());
        const formatEndDate = (0, date_fns_1.parse)(endDate, 'MM/dd/yyyy', new Date());
        console.log("Parsed Start Date:", formatStartDate, "Parsed End Date:", formatEndDate);
        console.log("Start Date Type:", typeof formatStartDate, "End Date Type:", typeof formatEndDate);
        if (!(0, date_fns_1.isValid)(formatStartDate) || !(0, date_fns_1.isValid)(formatEndDate)) {
            (0, Utils_1.ErrorResponse)(res, "Invalid date format. Please use 'MM/dd/yyyy'.", 400);
            return;
        }
        const filters = {
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
            }
            else {
                (0, Utils_1.ErrorResponse)(res, "Invalid age range format. Use '15-25' or '>25'.", 400);
                return;
            }
        }
        console.log("Filters:", filters);
        const data = await Db_1.default.dataVisualizationDashboard.findMany({
            where: filters,
        });
        (0, Utils_1.SucessResponse)(res, "Data retrieved successfully", data);
    }
    catch (error) {
        console.error("Error retrieving data:", error);
        (0, Utils_1.ErrorResponse)(res, "An unexpected error occurred", 500);
    }
};
exports.RetrieveFilteredData = RetrieveFilteredData;
