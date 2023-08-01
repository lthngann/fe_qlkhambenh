export const adminMenu = [
    {
        // Manage User
        name: "menu.admin.manage-user",
        menus: [
            // {
            //     name: "menu.admin.crud",
            //     link: "/system/user-manage",
            // },
            {
                name: "menu.admin.manage-users",
                link: "/system/user-redux",
            },
            {
                name: "menu.admin.manage-doctor",
                link: "/system/manage-doctor",
            },
            {
                // Manage schedule
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
        ],
    },
    {
        // Manage clinic
        name: "menu.admin.clinic",
        menus: [
            {
                name: "menu.admin.manage-clinic",
                link: "/system/manage-clinic",
            },
        ],
    },
    {
        // Manage specialty
        name: "menu.admin.specialty",
        menus: [
            {
                name: "menu.admin.manage-specialty",
                link: "/system/manage-specialty",
            },
        ],
    },
];
export const doctorMenu = [
    {
        name: "menu.admin.manage-user",
        menus: [
            {
                // Manage schedule
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
            {
                name: "menu.doctor.manage-patient",
                link: "/doctor/manage-patient",
            },
        ],
    },
];
