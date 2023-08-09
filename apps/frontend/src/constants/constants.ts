export const userTypes = {
    TUTOR:   { userTypeId: 1, userTypeDesc: 'Tutor',   pathname: '/user-registration-tutor'   },
    STUDENT: { userTypeId: 2, userTypeDesc: 'Student', pathname: '/user-registration-student' },
    PARENT:  { userTypeId: 3, userTypeDesc: 'Parent',  pathname: '/user-registration-parent'  },
    CHILD:   { userTypeId: 4, userTypeDesc: 'Child',   pathname: '/user-registration-child'   },
};

export const accountTypes = [
    { key: 0, value: "Account type"},
    { key: 1, value: "Tutor",   fieldName: 'tutorAcc'},
    { key: 2, value: "Parent",  fieldName: 'parentAcc'  },
    { key: 3, value: "Student", fieldName: 'studentAcc' },
];

export const userTitles = [
    { key: 0, value: "Title", gender: ''},
    { key: 1, value: "Mrs",    gender: 'F'},
    { key: 2, value: "Miss",   gender: 'F'},
    { key: 3, value: "Ms",     gender: 'F'},
    { key: 4, value: "Mr",     gender: 'M'},
    { key: 5, value: "Mx",     gender: 'U'},
    { key: 6, value: "Dr",     gender: 'U'},
    { key: 7, value: "Prof",   gender: 'U'},
];


export const uploadMediaCategories = [
    {mediaCatId: 1, mediaCat: 'PHOTO',   fileType: 'Photo', noSlots: 3 },
    {mediaCatId: 2, mediaCat: 'VIDEO',   fileType: 'Video', noSlots: 1 },
    {mediaCatId: 3, mediaCat: 'ID',      fileType: 'Photo', noSlots: 1 },
    {mediaCatId: 4, mediaCat: 'ADDRESS', fileType: 'Photo', noSlots: 1 },
    {mediaCatId: 5, mediaCat: 'DBS',     fileType: 'Photo', noSlots: 3 },
    {mediaCatId: 6, mediaCat: 'PHOTO',   fileType: 'Photo', noSlots: 1 },
]

export type UploadFileType  = {fileExtensions: string[], allowedFileExtensions: string, maxSize: number, fileTypes: string[]}
export type UploadFileTypes = {[key: string]: UploadFileType}
export const uploadFileTypes:UploadFileTypes = {
    Photo: { fileExtensions: ['.jpg', '.jpeg', '.png', '.gif'],
        allowedFileExtensions: '.jpg, .jpeg, .png, .gif',
        maxSize: 1048576 * 5,
        fileTypes: ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif'] },
    Video: { fileExtensions: ['.mp4', '.avi', '.mov'],
        allowedFileExtensions: '.mp4, .avi, .mov',
        maxSize: 1048576 * 100,
        fileTypes: ['video/mp4', 'video/quicktime'] }
};

export const uploadMediaDetails = [
    {id: 1,   mediaType: 'PROFILE_PHOTO',        displayName: 'Profile Photo',              mediaCatId: 1,      bucketPrefix: 'upload',         slots: true},
    {id: 2,   mediaType: 'PROFILE_VIDEO',        displayName: 'Profile Video',              mediaCatId: 2,      bucketPrefix: 'upload',         slots: true},

    {id: 10,  mediaType: 'ID_PASSPORT',          displayName: 'Passport',                   mediaCatId: 3,      bucketPrefix: 'private-upload', slots: true},
    {id: 11,  mediaType: 'ID_DRIVING_LICENCE',   displayName: 'Driving Licence',            mediaCatId: 3,      bucketPrefix: 'private-upload', slots: true},

    {id: 20,  mediaType: 'ADDR_DRIVING_LICENCE', displayName: 'Driving Licence',            mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 21,  mediaType: 'ADDR_COUNCIL_TAX',     displayName: 'Council Tax',                mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 22,  mediaType: 'ADDR_UTILITY',         displayName: 'Utility Bill',               mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 23,  mediaType: 'ADDR_BANK',            displayName: 'Bank Statement',             mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 24,  mediaType: 'ADDR_CREDIT_CARD',     displayName: 'Credit Card Statement',      mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 25,  mediaType: 'ADDR_CREDIT_UNION',    displayName: 'Credit Union Statement',     mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 26,  mediaType: 'ADDR_TENANCY',         displayName: 'Tenancy Agreement',          mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 27,  mediaType: 'ADDR_MORTGAGE',        displayName: 'Mortgage Statement',         mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 28,  mediaType: 'ADDR_BENEFIT',         displayName: 'Benefit Letter',             mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 29,  mediaType: 'ADDR_HMRC_TAX',        displayName: 'HMRC Tax Letter',            mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 30,  mediaType: 'ADDR_DWP',             displayName: 'DWP Letter',                 mediaCatId: 4,      bucketPrefix: 'private-upload', slots: true},
    {id: 40,  mediaType: 'DBS',                  displayName: 'Enhanced DBS Check',         mediaCatId: 5,      bucketPrefix: 'private-upload', slots: true},
    {id: 50,  mediaType: 'AUTH_PHOTO',           displayName: 'Photo for authentication',   mediaCatId: 6,      bucketPrefix: 'private-upload', slots: true},
];

// export const uploadMediaDetails = [
//     {id: 1,   mediaType: 'PROFILE_PHOTO',        displayName: 'Profile Photo',          mediaCatId: 1,      mediaCat: 'PHOTO',      bucketPrefix: 'upload',         slots: true},
//     {id: 2,   mediaType: 'PROFILE_VIDEO',        displayName: 'Profile Video',          mediaCatId: 1,      mediaCat: 'VIDEO',      bucketPrefix: 'upload',         slots: true},

//     {id: 10,  mediaType: 'ID_PASSPORT',          displayName: 'Passport',               mediaCatId: 3,      mediaCat: 'ID',         bucketPrefix: 'private-upload', slots: true},
//     {id: 11,  mediaType: 'ID_DRIVING_LICENCE',   displayName: 'Driving Licence',        mediaCatId: 3,      mediaCat: 'ID',         bucketPrefix: 'private-upload', slots: true},

//     {id: 20,  mediaType: 'ADDR_DRIVING_LICENCE', displayName: 'Driving Licence',        mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 21,  mediaType: 'ADDR_COUNCIL_TAX',     displayName: 'Council Tax',            mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 22,  mediaType: 'ADDR_UTILITY',         displayName: 'Utility Bill',           mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 23,  mediaType: 'ADDR_BANK',            displayName: 'Bank Statement',         mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 24,  mediaType: 'ADDR_CREDIT_CARD',     displayName: 'Credit Card Statement',  mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 25,  mediaType: 'ADDR_CREDIT_UNION',    displayName: 'Credit Union Statement', mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 26,  mediaType: 'ADDR_TENANCY',         displayName: 'Tenancy Agreement',      mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 27,  mediaType: 'ADDR_MORTGAGE',        displayName: 'Mortgage Statement',     mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 28,  mediaType: 'ADDR_BENEFIT',         displayName: 'Benefit Letter',         mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 29,  mediaType: 'ADDR_HMRC_TAX',        displayName: 'HMRC Tax Letter',        mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},
//     {id: 30,  mediaType: 'ADDR_DWP',             displayName: 'DWP Letter',             mediaCatId: 4,      mediaCat: 'ADDRESS',    bucketPrefix: 'private-upload', slots: true},

//     // GP LETTER
//     // SOLICITOR LETTER

//     {id: 40,  mediaType: 'DBS',                  displayName: 'Enhanced DBS Check',     mediaCatId: 5,      mediaCat: 'DBS',        bucketPrefix: 'private-upload', slots: true},
// ];


// export const uploadTypes = ['PHOTO', 'VIDEO', 'ID', 'ADDRESS', 'DBS'];


export const userGender = [
    { key: 0, value: "Gender",                gender: ''},
    { key: 1, value: "Female",                gender: 'F'},
    { key: 2, value: "Male",                  gender: 'M'},
    { key: 3, value: "Prefer not to  say",    gender: 'X'},
];

export const notApplicable = [
    { key: "0", value: "Not Applicable." }
];


export const loadingData = [
    { key: 0, value: "Loading ..." }
];

export const yesNo = [
    { key: 0, value: "No"         },
    { key: 1, value: "Yes"        },
];

export const yesNoAskQuestion = [
    { key: 0, value: "Please Ask." },
    { key: 1, value: "No."         },
    { key: 2, value: "Yes."        },
];

export const travelDistances = [
    { key: 0,  value: "0"    },
    { key: 1,  value: "1 Mile"    },
    { key: 3,  value: "3 Miles"    },
    { key: 5,  value: "5 Miles"    },
    { key: 7,  value: "7 Miles"    },
    { key: 10, value: "10 Miles"   },
];

export const languageNative = [
    { key: 1, value: "Not Selected" },
    { key: 2, value: "No"         },
    { key: 3, value: "Yes"        },
];


export const languageProficiency = [
    { key: 0,  value: "Not Selected" },
    { key: 1,  value: "Beginner" },
    { key: 2,  value: "Elementary" },
    { key: 3,  value: "Intermediate" },
    { key: 4,  value: "Advanced" },
    { key: 5,  value: "Superior" },
    { key: 6,  value: "Master" },
];


export const languagesSpoken = [
    { key: 0,  value: 'Not Selected'  },
    { key: 1,  value: 'Albanian'      },
    { key: 2,  value: 'Arabic'        },
    { key: 3,  value: 'Bengali'       },
    { key: 4,  value: 'Bulgarian'     },
    { key: 5,  value: 'Croatian'      },
    { key: 6,  value: 'Czech'         },
    { key: 7,  value: 'Danish'        },
    { key: 8,  value: 'Dutch'         },
    { key: 9,  value: 'English'       },
    { key: 10, value: 'Finnish'       },
    { key: 11, value: 'French'        },
    { key: 12, value: 'Gaelic'        },
    { key: 13, value: 'Greek'         },
    { key: 14, value: 'Gujarati'      },
    { key: 15, value: 'Hindi'         },
    { key: 16, value: 'Hungarian'     },
    { key: 17, value: 'Indonesian'    },
    { key: 18, value: 'Italian'       },
    { key: 19, value: 'Japanese'      },
    { key: 20, value: 'Latin'         },
    { key: 21, value: 'Korean'        },
    { key: 22, value: 'Malay'         },
    { key: 23, value: 'Mandarin'      },
    { key: 24, value: 'Norwegian'     },
    { key: 25, value: 'Polish'        },
    { key: 26, value: 'Portuguese'    },
    { key: 27, value: 'Punjabi'       },
    { key: 28, value: 'Romanian'      },
    { key: 29, value: 'Russian'       },
    { key: 30, value: 'Serbian'       },
    { key: 31, value: 'Sign Language' },
    { key: 32, value: 'Slovak'        },
    { key: 33, value: 'Spanish'       },
    { key: 34, value: 'Swedish'       },
    { key: 35, value: 'Thai'          },
    { key: 36, value: 'Turkish'       },
    { key: 37, value: 'Ukrainian'     },
    { key: 38, value: 'Urdu'          },
    { key: 39, value: 'Vienamese'     }
];



// export const countries = [
//     { key: "0", value: "Select"},
//     { key: "1", value: "Afghanistan"},
//     { key: "2", value: "Aland Islands"},
//     { key: "3", value: "Albania"},
//     { key: "4", value: "Algeria"},
//     { key: "5", value: "American Samoa"},
//     { key: "6", value: "Andorra"},
//     { key: "7", value: "Angola"},
//     { key: "8", value: "Anguilla"},
//     { key: "9", value: "Antarctica"},
//     { key: "10", value: "Antigua and Barbuda"},
//     { key: "11", value: "Argentina"},
//     { key: "12", value: "Armenia"},
//     { key: "13", value: "Aruba"},
//     { key: "14", value: "Australia"},
//     { key: "15", value: "Austria"},
//     { key: "16", value: "Azerbaijan"},
//     { key: "17", value: "Bahamas"},
//     { key: "18", value: "Bahrain"},
//     { key: "19", value: "Bangladesh"},
//     { key: "20", value: "Barbados"},
//     { key: "21", value: "Belarus"},
//     { key: "22", value: "Belgium"},
//     { key: "23", value: "Belize"},
//     { key: "24", value: "Benin"},
//     { key: "25", value: "Bermuda"},
//     { key: "26", value: "Bhutan"},
//     { key: "27", value: "Bolivia"},
//     { key: "28", value: "Bonaire, Saint Eustatius and Saba "},
//     { key: "29", value: "Bosnia and Herzegovina"},
//     { key: "30", value: "Botswana"},
//     { key: "31", value: "Bouvet Island"},
//     { key: "32", value: "Brazil"},
//     { key: "33", value: "British Indian Ocean Territory"},
//     { key: "34", value: "British Virgin Islands"},
//     { key: "35", value: "Brunei"},
//     { key: "36", value: "Bulgaria"},
//     { key: "37", value: "Burkina Faso"},
//     { key: "38", value: "Burundi"},
//     { key: "39", value: "Cabo Verde"},
//     { key: "40", value: "Cambodia"},
//     { key: "41", value: "Cameroon"},
//     { key: "42", value: "Canada"},
//     { key: "43", value: "Cayman Islands"},
//     { key: "44", value: "Central African Republic"},
//     { key: "45", value: "Chad"},
//     { key: "46", value: "Chile"},
//     { key: "47", value: "China"},
//     { key: "48", value: "Christmas Island"},
//     { key: "49", value: "Cocos Islands"},
//     { key: "50", value: "Colombia"},
//     { key: "51", value: "Comoros"},
//     { key: "52", value: "Cook Islands"},
//     { key: "53", value: "Costa Rica"},
//     { key: "54", value: "Croatia"},
//     { key: "55", value: "Cuba"},
//     { key: "56", value: "Curacao"},
//     { key: "57", value: "Cyprus"},
//     { key: "58", value: "Czechia"},
//     { key: "59", value: "Democratic Republic of the Congo"},
//     { key: "60", value: "Denmark"},
//     { key: "61", value: "Djibouti"},
//     { key: "62", value: "Dominica"},
//     { key: "63", value: "Dominican Republic"},
//     { key: "64", value: "Ecuador"},
//     { key: "65", value: "Egypt"},
//     { key: "66", value: "El Salvador"},
//     { key: "67", value: "Equatorial Guinea"},
//     { key: "68", value: "Eritrea"},
//     { key: "69", value: "Estonia"},
//     { key: "70", value: "Eswatini"},
//     { key: "71", value: "Ethiopia"},
//     { key: "72", value: "Falkland Islands"},
//     { key: "73", value: "Faroe Islands"},
//     { key: "74", value: "Fiji"},
//     { key: "75", value: "Finland"},
//     { key: "76", value: "France"},
//     { key: "77", value: "French Guiana"},
//     { key: "78", value: "French Polynesia"},
//     { key: "79", value: "French Southern Territories"},
//     { key: "80", value: "Gabon"},
//     { key: "81", value: "Gambia"},
//     { key: "82", value: "Georgia"},
//     { key: "83", value: "Germany"},
//     { key: "84", value: "Ghana"},
//     { key: "85", value: "Gibraltar"},
//     { key: "86", value: "Greece"},
//     { key: "87", value: "Greenland"},
//     { key: "88", value: "Grenada"},
//     { key: "89", value: "Guadeloupe"},
//     { key: "90", value: "Guam"},
//     { key: "91", value: "Guatemala"},
//     { key: "92", value: "Guernsey"},
//     { key: "93", value: "Guinea"},
//     { key: "94", value: "Guinea-Bissau"},
//     { key: "95", value: "Guyana"},
//     { key: "96", value: "Haiti"},
//     { key: "97", value: "Heard Island and McDonald Islands"},
//     { key: "98", value: "Honduras"},
//     { key: "99", value: "Hong Kong"},
//     { key: "100", value: "Hungary"},
//     { key: "101", value: "Iceland"},
//     { key: "102", value: "India"},
//     { key: "103", value: "Indonesia"},
//     { key: "104", value: "Iran"},
//     { key: "105", value: "Iraq"},
//     { key: "106", value: "Ireland"},
//     { key: "107", value: "Isle of Man"},
//     { key: "108", value: "Israel"},
//     { key: "109", value: "Italy"},
//     { key: "110", value: "Ivory Coast"},
//     { key: "111", value: "Jamaica"},
//     { key: "112", value: "Japan"},
//     { key: "113", value: "Jersey"},
//     { key: "114", value: "Jordan"},
//     { key: "115", value: "Kazakhstan"},
//     { key: "116", value: "Kenya"},
//     { key: "117", value: "Kiribati"},
//     { key: "118", value: "Kosovo"},
//     { key: "119", value: "Kuwait"},
//     { key: "120", value: "Kyrgyzstan"},
//     { key: "121", value: "Laos"},
//     { key: "122", value: "Latvia"},
//     { key: "123", value: "Lebanon"},
//     { key: "124", value: "Lesotho"},
//     { key: "125", value: "Liberia"},
//     { key: "126", value: "Libya"},
//     { key: "127", value: "Liechtenstein"},
//     { key: "128", value: "Lithuania"},
//     { key: "129", value: "Luxembourg"},
//     { key: "130", value: "Macao"},
//     { key: "131", value: "Madagascar"},
//     { key: "132", value: "Malawi"},
//     { key: "133", value: "Malaysia"},
//     { key: "134", value: "Maldives"},
//     { key: "135", value: "Mali"},
//     { key: "136", value: "Malta"},
//     { key: "137", value: "Marshall Islands"},
//     { key: "138", value: "Martinique"},
//     { key: "139", value: "Mauritania"},
//     { key: "140", value: "Mauritius"},
//     { key: "141", value: "Mayotte"},
//     { key: "142", value: "Mexico"},
//     { key: "143", value: "Micronesia"},
//     { key: "144", value: "Moldova"},
//     { key: "145", value: "Monaco"},
//     { key: "146", value: "Mongolia"},
//     { key: "147", value: "Montenegro"},
//     { key: "148", value: "Montserrat"},
//     { key: "149", value: "Morocco"},
//     { key: "150", value: "Mozambique"},
//     { key: "151", value: "Myanmar"},
//     { key: "152", value: "Namibia"},
//     { key: "153", value: "Nauru"},
//     { key: "154", value: "Nepal"},
//     { key: "155", value: "Netherlands"},
//     { key: "156", value: "Netherlands Antilles"},
//     { key: "157", value: "New Caledonia"},
//     { key: "158", value: "New Zealand"},
//     { key: "159", value: "Nicaragua"},
//     { key: "160", value: "Niger"},
//     { key: "161", value: "Nigeria"},
//     { key: "162", value: "Niue"},
//     { key: "163", value: "Norfolk Island"},
//     { key: "164", value: "North Korea"},
//     { key: "165", value: "North Macedonia"},
//     { key: "166", value: "Northern Mariana Islands"},
//     { key: "167", value: "Norway"},
//     { key: "168", value: "Oman"},
//     { key: "169", value: "Pakistan"},
//     { key: "170", value: "Palau"},
//     { key: "171", value: "Palestinian Territory"},
//     { key: "172", value: "Panama"},
//     { key: "173", value: "Papua New Guinea"},
//     { key: "174", value: "Paraguay"},
//     { key: "175", value: "Peru"},
//     { key: "176", value: "Philippines"},
//     { key: "177", value: "Pitcairn"},
//     { key: "178", value: "Poland"},
//     { key: "179", value: "Portugal"},
//     { key: "180", value: "Puerto Rico"},
//     { key: "181", value: "Qatar"},
//     { key: "182", value: "Republic of the Congo"},
//     { key: "183", value: "Reunion"},
//     { key: "184", value: "Romania"},
//     { key: "185", value: "Russia"},
//     { key: "186", value: "Rwanda"},
//     { key: "187", value: "Saint Barthelemy"},
//     { key: "188", value: "Saint Helena"},
//     { key: "189", value: "Saint Kitts and Nevis"},
//     { key: "190", value: "Saint Lucia"},
//     { key: "191", value: "Saint Martin"},
//     { key: "192", value: "Saint Pierre and Miquelon"},
//     { key: "193", value: "Saint Vincent and the Grenadines"},
//     { key: "194", value: "Samoa"},
//     { key: "195", value: "San Marino"},
//     { key: "196", value: "Sao Tome and Principe"},
//     { key: "197", value: "Saudi Arabia"},
//     { key: "198", value: "Senegal"},
//     { key: "199", value: "Serbia"},
//     { key: "200", value: "Serbia and Montenegro"},
//     { key: "201", value: "Seychelles"},
//     { key: "202", value: "Sierra Leone"},
//     { key: "203", value: "Singapore"},
//     { key: "204", value: "Sint Maarten"},
//     { key: "205", value: "Slovakia"},
//     { key: "206", value: "Slovenia"},
//     { key: "207", value: "Solomon Islands"},
//     { key: "208", value: "Somalia"},
//     { key: "209", value: "South Africa"},
//     { key: "210", value: "South Georgia and the South Sandwich Islands"},
//     { key: "211", value: "South Korea"},
//     { key: "212", value: "South Sudan"},
//     { key: "213", value: "Spain"},
//     { key: "214", value: "Sri Lanka"},
//     { key: "215", value: "Sudan"},
//     { key: "216", value: "Suriname"},
//     { key: "217", value: "Svalbard and Jan Mayen"},
//     { key: "218", value: "Sweden"},
//     { key: "219", value: "Switzerland"},
//     { key: "220", value: "Syria"},
//     { key: "221", value: "Taiwan"},
//     { key: "222", value: "Tajikistan"},
//     { key: "223", value: "Tanzania"},
//     { key: "224", value: "Thailand"},
//     { key: "225", value: "Timor Leste"},
//     { key: "226", value: "Togo"},
//     { key: "227", value: "Tokelau"},
//     { key: "228", value: "Tonga"},
//     { key: "229", value: "Trinidad and Tobago"},
//     { key: "230", value: "Tunisia"},
//     { key: "231", value: "Turkey"},
//     { key: "232", value: "Turkmenistan"},
//     { key: "233", value: "Turks and Caicos Islands"},
//     { key: "234", value: "Tuvalu"},
//     { key: "235", value: "U.S. Virgin Islands"},
//     { key: "236", value: "Uganda"},
//     { key: "237", value: "Ukraine"},
//     { key: "238", value: "United Arab Emirates"},
//     { key: "239", value: "United Kingdom"},
//     { key: "240", value: "United States"},
//     { key: "241", value: "United States Minor Outlying Islands"},
//     { key: "242", value: "Uruguay"},
//     { key: "243", value: "Uzbekistan"},
//     { key: "244", value: "Vanuatu"},
//     { key: "245", value: "Vatican"},
//     { key: "246", value: "Venezuela"},
//     { key: "247", value: "Vietnam"},
//     { key: "248", value: "Wallis and Futuna"},
//     { key: "249", value: "Western Sahara"},
//     { key: "250", value: "Yemen"},
//     { key: "251", value: "Zambia"},
//     { key: "252", value: "Zimbabwe"},
// ];


export const countries = [
    { key: 101, value: "Afghanistan"},
    { key: 102, value: "Aland Islands"},
    { key: 103, value: "Albania"},
    { key: 104, value: "Algeria"},
    { key: 105, value: "American Samoa"},
    { key: 106, value: "Andorra"},
    { key: 107, value: "Angola"},
    { key: 108, value: "Anguilla"},
    { key: 109, value: "Antarctica"},
    { key: 110, value: "Antigua and Barbuda"},
    { key: 111, value: "Argentina"},
    { key: 112, value: "Armenia"},
    { key: 113, value: "Aruba"},
    { key: 114, value: "Australia"},
    { key: 115, value: "Austria"},
    { key: 116, value: "Azerbaijan"},
    { key: 117, value: "Bahamas"},
    { key: 118, value: "Bahrain"},
    { key: 119, value: "Bangladesh"},
    { key: 120, value: "Barbados"},
    { key: 121, value: "Belarus"},
    { key: 122, value: "Belgium"},
    { key: 123, value: "Belize"},
    { key: 124, value: "Benin"},
    { key: 125, value: "Bermuda"},
    { key: 126, value: "Bhutan"},
    { key: 127, value: "Bolivia"},
    { key: 128, value: "Bonaire, Saint Eustatius and Saba "},
    { key: 129, value: "Bosnia and Herzegovina"},
    { key: 130, value: "Botswana"},
    { key: 131, value: "Bouvet Island"},
    { key: 132, value: "Brazil"},
    { key: 133, value: "British Indian Ocean Territory"},
    { key: 134, value: "British Virgin Islands"},
    { key: 135, value: "Brunei"},
    { key: 136, value: "Bulgaria"},
    { key: 137, value: "Burkina Faso"},
    { key: 138, value: "Burundi"},
    { key: 139, value: "Cabo Verde"},
    { key: 140, value: "Cambodia"},
    { key: 141, value: "Cameroon"},
    { key: 142, value: "Canada"},
    { key: 143, value: "Cayman Islands"},
    { key: 144, value: "Central African Republic"},
    { key: 145, value: "Chad"},
    { key: 146, value: "Chile"},
    { key: 147, value: "China"},
    { key: 148, value: "Christmas Island"},
    { key: 149, value: "Cocos Islands"},
    { key: 150, value: "Colombia"},
    { key: 151, value: "Comoros"},
    { key: 152, value: "Cook Islands"},
    { key: 153, value: "Costa Rica"},
    { key: 154, value: "Croatia"},
    { key: 155, value: "Cuba"},
    { key: 156, value: "Curacao"},
    { key: 157, value: "Cyprus"},
    { key: 158, value: "Czechia"},
    { key: 159, value: "Democratic Republic of the Congo"},
    { key: 160, value: "Denmark"},
    { key: 161, value: "Djibouti"},
    { key: 162, value: "Dominica"},
    { key: 163, value: "Dominican Republic"},
    { key: 164, value: "Ecuador"},
    { key: 165, value: "Egypt"},
    { key: 166, value: "El Salvador"},
    { key: 167, value: "Equatorial Guinea"},
    { key: 168, value: "Eritrea"},
    { key: 169, value: "Estonia"},
    { key: 170, value: "Eswatini"},
    { key: 171, value: "Ethiopia"},
    { key: 172, value: "Falkland Islands"},
    { key: 173, value: "Faroe Islands"},
    { key: 174, value: "Fiji"},
    { key: 175, value: "Finland"},
    { key: 176, value: "France"},
    { key: 177, value: "French Guiana"},
    { key: 178, value: "French Polynesia"},
    { key: 179, value: "French Southern Territories"},
    { key: 180, value: "Gabon"},
    { key: 181, value: "Gambia"},
    { key: 182, value: "Georgia"},
    { key: 183, value: "Germany"},
    { key: 184, value: "Ghana"},
    { key: 185, value: "Gibraltar"},
    { key: 186, value: "Greece"},
    { key: 187, value: "Greenland"},
    { key: 188, value: "Grenada"},
    { key: 189, value: "Guadeloupe"},
    { key: 190, value: "Guam"},
    { key: 191, value: "Guatemala"},
    { key: 192, value: "Guernsey"},
    { key: 193, value: "Guinea"},
    { key: 194, value: "Guinea-Bissau"},
    { key: 195, value: "Guyana"},
    { key: 196, value: "Haiti"},
    { key: 197, value: "Heard Island and McDonald Islands"},
    { key: 198, value: "Honduras"},
    { key: 199, value: "Hong Kong"},
    { key: 200, value: "Hungary"},
    { key: 201, value: "Iceland"},
    { key: 202, value: "India"},
    { key: 203, value: "Indonesia"},
    { key: 204, value: "Iran"},
    { key: 205, value: "Iraq"},
    { key: 206, value: "Ireland"},
    { key: 207, value: "Isle of Man"},
    { key: 208, value: "Israel"},
    { key: 209, value: "Italy"},
    { key: 210, value: "Ivory Coast"},
    { key: 211, value: "Jamaica"},
    { key: 212, value: "Japan"},
    { key: 213, value: "Jersey"},
    { key: 214, value: "Jordan"},
    { key: 215, value: "Kazakhstan"},
    { key: 216, value: "Kenya"},
    { key: 217, value: "Kiribati"},
    { key: 218, value: "Kosovo"},
    { key: 219, value: "Kuwait"},
    { key: 220, value: "Kyrgyzstan"},
    { key: 221, value: "Laos"},
    { key: 222, value: "Latvia"},
    { key: 223, value: "Lebanon"},
    { key: 224, value: "Lesotho"},
    { key: 225, value: "Liberia"},
    { key: 226, value: "Libya"},
    { key: 227, value: "Liechtenstein"},
    { key: 228, value: "Lithuania"},
    { key: 229, value: "Luxembourg"},
    { key: 230, value: "Macao"},
    { key: 231, value: "Madagascar"},
    { key: 232, value: "Malawi"},
    { key: 233, value: "Malaysia"},
    { key: 234, value: "Maldives"},
    { key: 235, value: "Mali"},
    { key: 236, value: "Malta"},
    { key: 237, value: "Marshall Islands"},
    { key: 238, value: "Martinique"},
    { key: 239, value: "Mauritania"},
    { key: 240, value: "Mauritius"},
    { key: 241, value: "Mayotte"},
    { key: 242, value: "Mexico"},
    { key: 243, value: "Micronesia"},
    { key: 244, value: "Moldova"},
    { key: 245, value: "Monaco"},
    { key: 246, value: "Mongolia"},
    { key: 247, value: "Montenegro"},
    { key: 248, value: "Montserrat"},
    { key: 249, value: "Morocco"},
    { key: 250, value: "Mozambique"},
    { key: 251, value: "Myanmar"},
    { key: 252, value: "Namibia"},
    { key: 253, value: "Nauru"},
    { key: 254, value: "Nepal"},
    { key: 255, value: "Netherlands"},
    { key: 256, value: "Netherlands Antilles"},
    { key: 257, value: "New Caledonia"},
    { key: 258, value: "New Zealand"},
    { key: 259, value: "Nicaragua"},
    { key: 260, value: "Niger"},
    { key: 261, value: "Nigeria"},
    { key: 262, value: "Niue"},
    { key: 263, value: "Norfolk Island"},
    { key: 264, value: "North Korea"},
    { key: 265, value: "North Macedonia"},
    { key: 266, value: "Northern Mariana Islands"},
    { key: 267, value: "Norway"},
    { key: 268, value: "Oman"},
    { key: 269, value: "Pakistan"},
    { key: 270, value: "Palau"},
    { key: 271, value: "Palestinian Territory"},
    { key: 272, value: "Panama"},
    { key: 273, value: "Papua New Guinea"},
    { key: 274, value: "Paraguay"},
    { key: 275, value: "Peru"},
    { key: 276, value: "Philippines"},
    { key: 277, value: "Pitcairn"},
    { key: 278, value: "Poland"},
    { key: 279, value: "Portugal"},
    { key: 280, value: "Puerto Rico"},
    { key: 281, value: "Qatar"},
    { key: 282, value: "Republic of the Congo"},
    { key: 283, value: "Reunion"},
    { key: 284, value: "Romania"},
    { key: 285, value: "Russia"},
    { key: 286, value: "Rwanda"},
    { key: 287, value: "Saint Barthelemy"},
    { key: 288, value: "Saint Helena"},
    { key: 289, value: "Saint Kitts and Nevis"},
    { key: 290, value: "Saint Lucia"},
    { key: 291, value: "Saint Martin"},
    { key: 292, value: "Saint Pierre and Miquelon"},
    { key: 293, value: "Saint Vincent and the Grenadines"},
    { key: 294, value: "Samoa"},
    { key: 295, value: "San Marino"},
    { key: 296, value: "Sao Tome and Principe"},
    { key: 297, value: "Saudi Arabia"},
    { key: 298, value: "Senegal"},
    { key: 299, value: "Serbia"},
    { key: 300, value: "Serbia and Montenegro"},
    { key: 301, value: "Seychelles"},
    { key: 302, value: "Sierra Leone"},
    { key: 303, value: "Singapore"},
    { key: 304, value: "Sint Maarten"},
    { key: 305, value: "Slovakia"},
    { key: 306, value: "Slovenia"},
    { key: 307, value: "Solomon Islands"},
    { key: 308, value: "Somalia"},
    { key: 309, value: "South Africa"},
    { key: 310, value: "South Georgia and the South Sandwich Islands"},
    { key: 311, value: "South Korea"},
    { key: 312, value: "South Sudan"},
    { key: 313, value: "Spain"},
    { key: 314, value: "Sri Lanka"},
    { key: 315, value: "Sudan"},
    { key: 316, value: "Suriname"},
    { key: 317, value: "Svalbard and Jan Mayen"},
    { key: 318, value: "Sweden"},
    { key: 319, value: "Switzerland"},
    { key: 320, value: "Syria"},
    { key: 321, value: "Taiwan"},
    { key: 322, value: "Tajikistan"},
    { key: 323, value: "Tanzania"},
    { key: 324, value: "Thailand"},
    { key: 325, value: "Timor Leste"},
    { key: 326, value: "Togo"},
    { key: 327, value: "Tokelau"},
    { key: 328, value: "Tonga"},
    { key: 329, value: "Trinidad and Tobago"},
    { key: 330, value: "Tunisia"},
    { key: 331, value: "Turkey"},
    { key: 332, value: "Turkmenistan"},
    { key: 333, value: "Turks and Caicos Islands"},
    { key: 334, value: "Tuvalu"},
    { key: 335, value: "U.S. Virgin Islands"},
    { key: 336, value: "Uganda"},
    { key: 337, value: "Ukraine"},
    { key: 338, value: "United Arab Emirates"},
    { key: 339, value: "United Kingdom"},
    { key: 340, value: "United States"},
    { key: 341, value: "United States Minor Outlying Islands"},
    { key: 342, value: "Uruguay"},
    { key: 343, value: "Uzbekistan"},
    { key: 344, value: "Vanuatu"},
    { key: 345, value: "Vatican"},
    { key: 346, value: "Venezuela"},
    { key: 347, value: "Vietnam"},
    { key: 348, value: "Wallis and Futuna"},
    { key: 349, value: "Western Sahara"},
    { key: 350, value: "Yemen"},
    { key: 351, value: "Zambia"},
    { key: 352, value: "Zimbabwe"},
];
