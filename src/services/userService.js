import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("/api/login", {
        email: userEmail,
        password: userPassword,
    });
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`);
};

const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
    return axios.delete("/api/delete-user", {
        data: { id: userId },
    });
};

const editUserService = (inputData) => {
    return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
};
const getAllCodeTypeService = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
    return axios.get("/api/get-all-doctors");
};

const saveDetailDoctorService = (data) => {
    return axios.post("/api/save-infor-doctors", data);
};

const getDetailInforDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctorService = (data) => {
    return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};

const getExtraDoctorInforById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookingAppointment = (data) => {
    return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
    return axios.post("/api/verify-book-appointment", data);
};

// Specialty
const createNewSpecialtyService = (data) => {
    return axios.post("/api/create-new-specialty", data);
};

const deleteSpecialtyService = (id) => {
    return axios.delete("/api/delete-specialty", {
        data: { id: id },
    });
};

const getAllSpecialtyService = () => {
    return axios.get("/api/get-all-specialty");
};

const getDetailSpecialtyById = (data) => {
    return axios.get(
        `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
    );
};
const getSpecialtyByIdService = (data) => {
    return axios.get(
        `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
    );
};

const editSpecialtyService = (data) => {
    return axios.put("/api/edit-specialty", data);
};

// Clinic
const createNewClinic = (data) => {
    return axios.post("/api/create-new-clinic", data);
};

const createNewClinicService = (data) => {
    return axios.post("/api/create-new-clinic", data);
};

const getAllClinicService = () => {
    return axios.get("/api/get-all-clinic");
};

const editClinicService = (data) => {
    return axios.put("/api/edit-clinic", data);
};

const getDetailClinicById = (data) => {
    return axios.get(
        `/api/get-detail-clinic-by-id?id=${data.id}&location=${data.location}`
    );
};

const deleteClinicService = (id) => {
    return axios.delete("/api/delete-clinic", {
        data: { id: id },
    });
};

const getAllPatentForDoctor = (data) => {
    return axios.get(
        `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
    );
};

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
};

export {
    // All code
    getAllCodeTypeService,
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctorService,
    saveBulkScheduleDoctorService,
    getScheduleDoctorByDate,
    getExtraDoctorInforById,
    getProfileDoctorById,
    postPatientBookingAppointment,
    postVerifyBookAppointment,

    // Specialty
    createNewSpecialtyService,
    deleteSpecialtyService,
    editSpecialtyService,
    getAllSpecialtyService,
    getDetailSpecialtyById,
    getSpecialtyByIdService,

    // Clinic
    createNewClinic,
    editClinicService,
    createNewClinicService,
    getAllClinicService,
    deleteClinicService,
    getDetailClinicById,
    getAllPatentForDoctor,
    postSendRemedy,
};
