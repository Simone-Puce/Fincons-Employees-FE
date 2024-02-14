import axios from "axios";
import Position from "../models/PositionModel";
import Cookies from "js-cookie";

const POSITION_API_BASE_URL = "http://localhost:8080/company-employee-management";
const VERSION_URI = POSITION_API_BASE_URL + "/v1";
const POSITION_URI = VERSION_URI + "/position";
const GET_ALL_URI = POSITION_URI + "/list";
const GET_BY_POSITION_CODE = POSITION_URI + "/find-by-code"
const CREATE_POSITION = POSITION_URI + "/create"
const UPDATE_POSITION = POSITION_URI + "/update"
const DELETE_POSITION = POSITION_URI + "/delete"

const token = Cookies.get("jwt-token");
const config = { Authorization: `Bearer ${token}` }

export const getPositions = async () => {
    const response = await axios.get(GET_ALL_URI, { headers: config });
    return response.data
}

export const getPositionByPositionCode = async (positionCode : string) => {
    const response = await axios.get(GET_BY_POSITION_CODE, { params: { positionCode: positionCode }, headers: config })
    return response.data
}

export const createPosition = async (position: Position) => {
    const response = await axios.post(CREATE_POSITION, position, { headers: config })
    return response.data
}

export const updatePosition = async (positionCode: string, updatedPosition: Position) => {
    const response = await axios.put(
        UPDATE_POSITION,
        {
            name: updatedPosition?.name,
            salary: updatedPosition?.salary
        },
        {
            params: { positionCode: positionCode },
            headers: config
        }
    )
    return response.data
}

export const deletePosition = async (positionId: number | undefined) => {
    const response = await axios.delete(DELETE_POSITION, { params: { id: positionId }, headers: config })
    return response
}


