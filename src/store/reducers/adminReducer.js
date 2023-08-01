import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    detailDoctor: [],
    // markdown: [],
    allScheduleTime: [],

    allRequiredDoctorInfor: [],
    specialties: [],
    specialtiesById: [],
    clinicsById: [],
    clinics: [],
    clinic: {},
    allCodeType: [],
};

const adminReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            copyState.isLoadingGender = false;
            copyState.genders = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_POSITION_START:
            return {
                ...copyState,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState.positions = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            copyState.positions = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState.roles = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            copyState.roles = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            copyState.users = action.users;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_USER_FAILED:
            copyState.users = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            copyState.topDoctors = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            copyState.topDoctors = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            copyState.allDoctors = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            copyState.allDoctors = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_DETAIL_INFOR_DOCTOR_SUCCESS:
            copyState.detailDoctor = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_DETAIL_INFOR_DOCTOR_FAILED:
            copyState.detailDoctor = [];
            return {
                ...copyState,
            };
        // case actionTypes.FETCH_MARKDOWN_SUCCESS:
        //     copyState.mardown = action.data;
        //     return {
        //         ...copyState,
        //     };
        // case actionTypes.FETCH_MARKDOWN_FAILED:
        //     copyState.mardown = [];
        //     return {
        //         ...copyState,
        //     };
        case actionTypes.FETCH_ALLCODE_TYPE_SUCCESS:
            copyState.allCodeType = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALLCODE_TYPE_FAILED:
            copyState.allCodeType = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            copyState.allScheduleTime = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            copyState.allScheduleTime = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            copyState.allRequiredDoctorInfor = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            copyState.allRequiredDoctorInfor = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            copyState.specialties = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            copyState.specialties = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_SPECIALTY_BY_ID_SUCCESS:
            copyState.specialtiesById = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_SPECIALTY_BY_ID_FAILED:
            copyState.specialtiesById = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_CLINIC_BY_ID_SUCCESS:
            copyState.clinicsById = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_CLINIC_BY_ID_FAILED:
            copyState.clinicsById = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            copyState.clinics = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            copyState.clinics = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_CLINIC_BY_ID_SUCCESS:
            copyState.clinic = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_CLINIC_BY_ID_FAILED:
            copyState.clinic = {};
            return {
                ...copyState,
            };
        default:
            return copyState;
    }
};

export default adminReducer;
