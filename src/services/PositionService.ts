import axios from "axios";
import Position from "../models/PositionModel";

const POSITION_API_BASE_URL = "http://localhost:81/be/company-employee-management";
const VERSION_URI = POSITION_API_BASE_URL+"/v1";
const POSITION_URI = VERSION_URI+"/position";
const GET_ALL_URI = POSITION_URI+"/list";
const GET_BY_ID=POSITION_URI+"/find-by-id"
const CREATE_POSITION=POSITION_URI+"/create"
const UPDATE_POSITION=POSITION_URI+"/update"
const DELETE_POSITION=POSITION_URI+"/delete"

const PositionService = {
    getPositions(){
        return axios.get(GET_ALL_URI);
    },

    getPositionById(positionId: number | undefined){
        return axios.get(GET_BY_ID, {params:{id:positionId}})
    },
    
    createPosition(position: Position){
        return axios.post(CREATE_POSITION,position)
    },

    updatePosition(positionId: number, updatedPosition: Position){
        console.log(updatedPosition)
        return axios.put(
            UPDATE_POSITION,
            { 
                name: updatedPosition?.name,
                salary: updatedPosition?.salary
            },
            { 
                params: { id: positionId }
            }
        );
    },

    deletePosition(positionId: number | undefined) {
        return axios.delete(DELETE_POSITION,{params:{id:positionId}})
    }
}

export default PositionService;