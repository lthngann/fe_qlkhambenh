import { toast } from "react-toastify";
import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctorService,
    createNewSpecialtyService,
    getAllSpecialtyService,
    editSpecialtyService,
    getSpecialtyByIdService,
    deleteSpecialtyService,
    createNewClinicService,
    editClinicService,
    deleteClinicService,
    getAllClinicService,
    getDetailClinicById,
    getAllCodeTypeService,
} from "../../services/userService";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user success!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.warn(res.errMessage);
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                toast.error("Fetch all user error!");
                dispatch(fetchAllUserFailed());
            }
        } catch (error) {
            toast.error("Fetch all user error!");
            dispatch(fetchAllUserFailed());
        }
    };
};

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data,
});

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const editAUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                toast.success("Update user success!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Update user error!");
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error("Update user error!");
            dispatch(editUserFailed());
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user success!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

// Doctor
export const fetchTopDoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService("25");
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (error) {
            console.log("Erorr fetch top doctor failed: ", error);
            dispatch(fetchTopDoctorFailed());
        }
    };
};

export const fetchTopDoctorSuccess = (topDoctorData) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: topDoctorData,
});

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
});

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (error) {
            console.log("Erorr fetch all doctor failed: ", error);
            dispatch(fetchAllDoctorsFailed());
        }
    };
};

export const fetchAllDoctorsSuccess = (allDoctors) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data: allDoctors,
});

export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save detail infor doctor success!");
                dispatch(saveDetailDoctorSuccess());
            } else {
                toast.error("Save detail infor doctor error!");
                dispatch(saveDetailDoctorFailed());
            }
        } catch (error) {
            toast.error("Save detail infor doctor error!");
            console.log("Erorr save detail doctor failed: ", error);
            dispatch(saveDetailDoctorFailed());
        }
    };
};

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

export const fetchDetailInforDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailInforDoctorService(data);
            if (res && res.errCode === 0) {
                dispatch(fetchDetailInforDoctorSuccess(res.data));
            } else {
                dispatch(fetchDetailInforDoctorFailed());
            }
        } catch (error) {
            console.log("Erorr fetch detail infor doctor failed: ", error);
            dispatch(fetchDetailInforDoctorFailed());
        }
    };
};

export const fetchDetailInforDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_INFOR_DOCTOR_SUCCESS,
    data: data,
});

export const fetchDetailInforDoctorFailed = () => ({
    type: actionTypes.FETCH_DETAIL_INFOR_DOCTOR_FAILED,
});

// All code
export const fetchAllcodeType = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeTypeService(type);
            if (res && res.errCode === 0) {
                dispatch(fetchAllcodeTypeSuccess(res.data));
            } else {
                dispatch(fetchAllcodeTypeFailed());
            }
        } catch (error) {
            console.log("Erorr fetch all code schedule time failed: ", error);
            dispatch(fetchAllcodeTypeFailed());
        }
    };
};

export const fetchAllcodeTypeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_TYPE_SUCCESS,
    data: data,
});

export const fetchAllcodeTypeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_TYPE_FAILED,
});

export const fetchAllcodeScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch(fetchAllcodeScheduleTimeSuccess(res.data));
            } else {
                dispatch(fetchAllcodeScheduleTimeFailed());
            }
        } catch (error) {
            console.log("Erorr fetch all code schedule time failed: ", error);
            dispatch(fetchAllcodeScheduleTimeFailed());
        }
    };
};

export const fetchAllcodeScheduleTimeSuccess = (dataTime) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    data: dataTime,
});

export const fetchAllcodeScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
});

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialtyService();
            let resClinic = await getAllClinicService();
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (error) {
            console.log("Error getRequiredDoctorInfor: ", error);
            dispatch(fetchRequiredDoctorInforFailed());
        }
    };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

// Specialty
export const createNewSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new specialty success!");
                dispatch({ type: actionTypes.CREATE_SPECIALTY_SUCCESS });
                dispatch(fetchAllSpecialty());
            } else {
                toast.warn(res.errMessage);
                dispatch({ type: actionTypes.CREATE_SPECIALTY_FAILED });
            }
        } catch (error) {
            dispatch({ type: actionTypes.CREATE_SPECIALTY_FAILED });
        }
    };
};

export const fetchAllSpecialty = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialtyService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.data.reverse()));
            } else {
                toast.error("Fetch all specialty error!");
                dispatch(fetchAllSpecialtyFailed());
            }
        } catch (error) {
            toast.error("Fetch all specialty error!");
            dispatch(fetchAllSpecialtyFailed());
        }
    };
};

export const fetchAllSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    data: data,
});

export const fetchAllSpecialtyFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
});

export const fetchSpecialtyById = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getSpecialtyByIdService(data);
            if (res && res.errCode === 0) {
                dispatch(fetchSpecialtyByIdSuccess(res.data));
            } else {
                toast.error("Fetch specialty by id error!");
                dispatch(fetchSpecialtyByIdFailed());
            }
        } catch (error) {
            toast.error("Fetch specialty by id error!");
            dispatch(fetchSpecialtyByIdFailed());
        }
    };
};

export const fetchSpecialtyByIdSuccess = (data) => ({
    type: actionTypes.FETCH_SPECIALTY_BY_ID_SUCCESS,
    data: data,
});

export const fetchSpecialtyByIdFailed = () => ({
    type: actionTypes.FETCH_SPECIALTY_BY_ID_FAILED,
});

export const deleteASpecialty = (specialtyId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSpecialtyService(specialtyId);
            if (res && res.errCode === 0) {
                toast.success("Delete the specialty success!");
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchAllSpecialty());
            } else {
                toast.error("Delete the specialty error!");
                dispatch(deleteSpecialtyFailed());
            }
        } catch (error) {
            toast.error("Delete the specialty error!");
            dispatch(deleteSpecialtyFailed());
        }
    };
};

export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS,
});

export const deleteSpecialtyFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED,
});

export const editASpecialty = (specialty) => {
    return async (dispatch, getState) => {
        try {
            let res = await editSpecialtyService(specialty);
            if (res && res.errCode === 0) {
                toast.success("Update specialty success!");
                dispatch(editSpecialtySuccess());
                dispatch(fetchAllSpecialty());
            } else {
                toast.error("Update specialty error!");
                dispatch(editSpecialtyFailed());
            }
        } catch (error) {
            toast.error("Update specialty error!");
            dispatch(editSpecialtyFailed());
        }
    };
};

export const editSpecialtySuccess = () => ({
    type: actionTypes.EDIT_SPECIALTY_SUCCESS,
});

export const editSpecialtyFailed = () => ({
    type: actionTypes.EDIT_SPECIALTY_FAILED,
});

// Clinic
export const createNewClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewClinicService(data);
            console.log("Check res from action: ", res);
            if (res && res.errCode === 0) {
                toast.success("Create a new clinic success!");
                dispatch({ type: actionTypes.CREATE_CLINIC_SUCCESS });
                dispatch(fetchAllClinic());
            } else {
                toast.warn(res.errMessage);
                dispatch({ type: actionTypes.CREATE_CLINIC_FAILED });
            }
        } catch (error) {
            dispatch({ type: actionTypes.CREATE_CLINIC_FAILED });
        }
    };
};

export const fetchAllClinic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinicService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.data.reverse()));
            } else {
                toast.error("Fetch all clinic error!");
                dispatch(fetchAllClinicFailed());
            }
        } catch (error) {
            toast.error("Fetch all clinic error!");
            dispatch(fetchAllClinicFailed());
        }
    };
};

export const fetchAllClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    data: data,
});

export const fetchAllClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED,
});

export const fetchClinicById = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailClinicById(data);
            if (res && res.errCode === 0) {
                dispatch(fetchClinicByIdSuccess(res.data));
            } else {
                toast.error("Fetch clinic error!");
                dispatch(fetchClinicByIdFailed());
            }
        } catch (error) {
            toast.error("Fetch clinic error!");
            dispatch(fetchClinicByIdFailed());
        }
    };
};

export const fetchClinicByIdSuccess = (data) => ({
    type: actionTypes.FETCH_CLINIC_BY_ID_SUCCESS,
    data: data,
});

export const fetchClinicByIdFailed = () => ({
    type: actionTypes.FETCH_CLINIC_BY_ID_FAILED,
});

export const editAClinic = (clinic) => {
    return async (dispatch, getState) => {
        try {
            let res = await editClinicService(clinic);
            if (res && res.errCode === 0) {
                toast.success("Update clinic success!");
                dispatch({
                    type: actionTypes.EDIT_CLINIC_SUCCESS,
                });
                dispatch(fetchAllClinic());
            } else {
                toast.error("Update clinic error!");
                dispatch(editClinicFailed());
            }
        } catch (error) {
            toast.error("Update clinic error!");
            dispatch(editClinicFailed());
        }
    };
};

export const editClinicFailed = () => ({
    type: actionTypes.EDIT_CLINIC_FAILED,
});

export const deleteAClinic = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteClinicService(id);
            if (res && res.errCode === 0) {
                toast.success("Delete the clinic success!");
                dispatch({
                    type: actionTypes.DELETE_SPECIALTY_SUCCESS,
                });
                dispatch(fetchAllClinic());
            } else {
                toast.error("Delete the clinic error!");
                dispatch(deleteClinicFailed());
            }
        } catch (error) {
            toast.error("Delete the clinic error!");
            dispatch(deleteClinicFailed());
        }
    };
};

export const deleteClinicFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED,
});
