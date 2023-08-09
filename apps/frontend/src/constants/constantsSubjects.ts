
export const tuitionCategories: {[key: number]: {category: string, area: string, subArea?: string}} = {
    1 :      { category: 'Academic' , area: 'Applied Sciences' , subArea: 'Business'  },
    3 :      { category: 'Academic' , area: 'Applied Sciences' , subArea: 'Engineering and Technology'  },
    2 :      { category: 'Academic' , area: 'Applied Sciences' , subArea: 'Medicine and Health'  },
    4 :      { category: 'Academic' , area: 'Formal Sciences' , subArea: 'Computer Science'  },
    5 :      { category: 'Academic' , area: 'Formal Sciences' , subArea: 'Mathematics'  },
    12 :     { category: 'Academic' , area: 'Humanities' , subArea: 'History'  },
    7 :      { category: 'Academic' , area: 'Humanities' , subArea: 'Languages and Literature'  },
    9 :      { category: 'Academic' , area: 'Humanities' , subArea: 'Law'  },
    6 :      { category: 'Academic' , area: 'Humanities' , subArea: 'Performing Arts'  },
    11 :     { category: 'Academic' , area: 'Humanities' , subArea: 'Philosophy'  },
    8 :      { category: 'Academic' , area: 'Humanities' , subArea: 'Theology'  },
    10 :     { category: 'Academic' , area: 'Humanities' , subArea: 'Visual Arts'  },
    20 :     { category: 'Academic' , area: 'Musical Instrument' , subArea: 'Advanced - General'  },
    19 :     { category: 'Academic' , area: 'Musical Instrument' , subArea: 'Advanced - Jazz'  },
    15 :     { category: 'Academic' , area: 'Musical Instrument' , subArea: 'Bass'  },
    17 :     { category: 'Academic' , area: 'Musical Instrument' , subArea: 'Bowed Strings'  },
    18 :     { category: 'Academic' , area: 'Musical Instrument' , subArea: 'General'  },
    14 :     { category: 'Academic' , area: 'Musical Instrument' , subArea: 'Harps'  },
    21 :     { category: 'Academic' , area: 'Musical Instrument' , subArea: 'Other Instruments'  },
    13 :     { category: 'Academic' , area: 'Musical Instrument' , subArea: 'Percussion'  },
    16 :     { category: 'Academic' , area: 'Musical Instrument' , subArea: 'Woodwind'  },
    23 :     { category: 'Academic' , area: 'Natural Sciences' , subArea: 'Biology'  },
    22 :     { category: 'Academic' , area: 'Natural Sciences' , subArea: 'Chemistry'  },
    26 :     { category: 'Academic' , area: 'Natural Sciences' , subArea: 'Earth Sciences'  },
    25 :     { category: 'Academic' , area: 'Natural Sciences' , subArea: 'Physics'  },
    24 :     { category: 'Academic' , area: 'Natural Sciences' , subArea: 'Space Sciences'  },
    30 :     { category: 'Academic' , area: 'Social Sciences' , subArea: 'Economics'  },
    29 :     { category: 'Academic' , area: 'Social Sciences' , subArea: 'Political Science'  },
    27 :     { category: 'Academic' , area: 'Social Sciences' , subArea: 'Psychology'  },
    28 :     { category: 'Academic' , area: 'Social Sciences' , subArea: 'Sociology'  },
    31 :     { category: 'IT' , area: 'Cloud Providers'  },
    32 :     { category: 'IT' , area: 'Databases'  },
    33 :     { category: 'IT' , area: 'Graphics'  },
    34 :     { category: 'IT' , area: 'Operating Systems'  },
    35 :     { category: 'IT' , area: 'Programming Languages'  },
    36 :     { category: 'IT' , area: 'Software Packages' , subArea: 'Adobe'  },
    37 :     { category: 'IT' , area: 'Software Packages' , subArea: 'Microsoft'  },
    38 :     { category: 'Lifestyle' , area: 'Art and Crafts'  },
    39 :     { category: 'Lifestyle' , area: 'Body and Mind'  },
    40 :     { category: 'Lifestyle' , area: 'Dance'  },
    41 :     { category: 'Lifestyle' , area: 'Food and Drink'  },
    42 :     { category: 'Lifestyle' , area: 'Languages'  },
    43 :     { category: 'Lifestyle' , area: 'Music'  },
    44 :     { category: 'Lifestyle' , area: 'Self Defense'  },
    45 :     { category: 'Lifestyle' , area: 'Sport'  },
    46 :     { category: 'Professional' , area: 'Accountancy'  },
    };
    
    
    type tuitionSubjectsType = {
        subjectId: number;
        subject: string;
        categories: {
            subjectCategoryId: number;
            level: string;
        }[];
    }[]
    

    export const tuitionSubjects: tuitionSubjectsType = [
        {
            subjectId: 1, 
            subject: 'AAT', 
            categories: [
                { subjectCategoryId : 46, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 2, 
            subject: 'ACA(ICAEW)', 
            categories: [
                { subjectCategoryId : 46, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 3, 
            subject: 'ACCA', 
            categories: [
                { subjectCategoryId : 46, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 4, 
            subject: 'Access', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
               ,{ subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 5, 
            subject: 'Accounting', 
            categories: [
                { subjectCategoryId : 1, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 6, 
            subject: 'Adobe Illustrator', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 7, 
            subject: 'Adobe Indesign', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 8, 
            subject: 'Adobe Photoshop', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 9, 
            subject: 'Affinity Designer', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 10, 
            subject: 'Afrikaans', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 11, 
            subject: 'After Effects', 
            categories: [
                { subjectCategoryId : 36, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 12, 
            subject: 'Agriculture', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 13, 
            subject: 'Aikido', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 14, 
            subject: 'Aircraft Studies', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 15, 
            subject: 'Albanian', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 16, 
            subject: 'Amazon DynamoDB', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 17, 
            subject: 'Amazon Redshift', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 18, 
            subject: 'Ancient History', 
            categories: [
                { subjectCategoryId : 12, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 19, 
            subject: 'Animal Management', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 20, 
            subject: 'Animate', 
            categories: [
                { subjectCategoryId : 36, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 21, 
            subject: 'Apple iOS', 
            categories: [
                { subjectCategoryId : 34, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 22, 
            subject: 'Apple MacOS', 
            categories: [
                { subjectCategoryId : 34, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 23, 
            subject: 'Arabic', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 24, 
            subject: 'Archery', 
            categories: [
                { subjectCategoryId : 45, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 25, 
            subject: 'Art and Design', 
            categories: [
                { subjectCategoryId : 10, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 26, 
            subject: 'Asian Cooking', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 27, 
            subject: 'Astronomy', 
            categories: [
                { subjectCategoryId : 24, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 28, 
            subject: 'ATT', 
            categories: [
                { subjectCategoryId : 46, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 29, 
            subject: 'Automotive', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 30, 
            subject: 'AWS', 
            categories: [
                { subjectCategoryId : 31, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 31, 
            subject: 'Azure', 
            categories: [
                { subjectCategoryId : 31, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 32, 
            subject: 'Bahasa Indonesia', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 33, 
            subject: 'Baking', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 34, 
            subject: 'Ballet', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 35, 
            subject: 'Ballroom Dance', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 36, 
            subject: 'Bangladesh Studies', 
            categories: [
                { subjectCategoryId : 28, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 37, 
            subject: 'Baritone', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 38, 
            subject: 'Bass Trombone', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_6_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 39, 
            subject: 'Bassoon', 
            categories: [
                { subjectCategoryId : 16, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 40, 
            subject: 'Beer Brewing', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 41, 
            subject: 'Belly Dancing', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 42, 
            subject: 'Bengali', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 43, 
            subject: 'Biology', 
            categories: [
                { subjectCategoryId : 23, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 44, 
            subject: 'Bollywood Dancing', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 45, 
            subject: 'Bookkeeping', 
            categories: [
                { subjectCategoryId : 46, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 46, 
            subject: 'Boxing', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 47, 
            subject: 'Breakdancing', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 48, 
            subject: 'Bulgarian', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 49, 
            subject: 'Business', 
            categories: [
                { subjectCategoryId : 1, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 50, 
            subject: 'Business Communications', 
            categories: [
                { subjectCategoryId : 1, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 51, 
            subject: 'Business Management', 
            categories: [
                { subjectCategoryId : 1, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 52, 
            subject: 'Business Services', 
            categories: [
                { subjectCategoryId : 1, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 53, 
            subject: 'C#', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
               ,{ subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 54, 
            subject: 'C++', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 55, 
            subject: 'Cake decorating', 
            categories: [
                { subjectCategoryId : 28, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 56, 
            subject: 'Calligraphy', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 57, 
            subject: 'Candle Making', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 58, 
            subject: 'Cantonese', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 59, 
            subject: 'Capoeira', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 60, 
            subject: 'Captivate', 
            categories: [
                { subjectCategoryId : 36, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 61, 
            subject: 'Care', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 62, 
            subject: 'Cassandra', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 63, 
            subject: 'Cello', 
            categories: [
                { subjectCategoryId : 17, level : 'MUSICAL_GRADE_INIT_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 64, 
            subject: 'Ceramics - Pottery', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 65, 
            subject: 'Ceramics - Scultures', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 66, 
            subject: 'Ceramics - Tiles', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 67, 
            subject: 'Ceroc', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 68, 
            subject: 'Chemistry', 
            categories: [
                { subjectCategoryId : 22, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 69, 
            subject: 'Child Care', 
            categories: [
                { subjectCategoryId : 27, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 70, 
            subject: 'Child Development', 
            categories: [
                { subjectCategoryId : 27, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 71, 
            subject: 'Chinese', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 72, 
            subject: 'Chocolate', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 73, 
            subject: 'CIMA', 
            categories: [
                { subjectCategoryId : 46, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 74, 
            subject: 'CIOT', 
            categories: [
                { subjectCategoryId : 46, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 75, 
            subject: 'Citizenship Studies', 
            categories: [
                { subjectCategoryId : 28, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 76, 
            subject: 'Clarinet', 
            categories: [
                { subjectCategoryId : 16, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 77, 
            subject: 'Classical Civilisation', 
            categories: [
                { subjectCategoryId : 12, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 78, 
            subject: 'Climbing', 
            categories: [
                { subjectCategoryId : 45, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 79, 
            subject: 'Comic Art', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 80, 
            subject: 'Commerce', 
            categories: [
                { subjectCategoryId : 1, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 81, 
            subject: 'Computer Science', 
            categories: [
                { subjectCategoryId : 4, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 82, 
            subject: 'Computing', 
            categories: [
                { subjectCategoryId : 4, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 83, 
            subject: 'Construction', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 84, 
            subject: 'Contemporary Dance', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 85, 
            subject: 'Cooking basics', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 86, 
            subject: 'CorelDraw Graphics Suite', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 87, 
            subject: 'Cornet', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 88, 
            subject: 'Countryside management', 
            categories: [
                { subjectCategoryId : 28, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 89, 
            subject: 'Craft', 
            categories: [
                { subjectCategoryId : 10, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 90, 
            subject: 'Croatian', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 91, 
            subject: 'CSS', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 92, 
            subject: 'CTA', 
            categories: [
                { subjectCategoryId : 46, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 93, 
            subject: 'Czech', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 94, 
            subject: 'Dance', 
            categories: [
                { subjectCategoryId : 6, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 95, 
            subject: 'Danish', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 96, 
            subject: 'DB2', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 97, 
            subject: 'Dental', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 98, 
            subject: 'Descant Recorder', 
            categories: [
                { subjectCategoryId : 16, level : 'MUSICAL_GRADE_1_5' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 99, 
            subject: 'Design', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 100, 
            subject: 'Design & Technology', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 101, 
            subject: 'Design and Communication', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 102, 
            subject: 'Design and Technology', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 103, 
            subject: 'Digital Art', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 104, 
            subject: 'Digital Technology', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 105, 
            subject: 'Double Bass', 
            categories: [
                { subjectCategoryId : 17, level : 'MUSICAL_GRADE_INIT_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 106, 
            subject: 'Drama', 
            categories: [
                { subjectCategoryId : 6, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 107, 
            subject: 'Drawing - Chalk', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 108, 
            subject: 'Drawing - Charcoal', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 109, 
            subject: 'Drawing - Crayon', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 110, 
            subject: 'Drawing - Pastel', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 111, 
            subject: 'Drawing - Pen / Ink', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 112, 
            subject: 'Drawing - Pencil', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 113, 
            subject: 'Dreamweaver', 
            categories: [
                { subjectCategoryId : 36, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 114, 
            subject: 'Dutch', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 115, 
            subject: 'E Flat Horm', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_1_8' }
            ]
        },
        {
            subjectId: 116, 
            subject: 'Economics', 
            categories: [
                { subjectCategoryId : 30, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 117, 
            subject: 'Electronics', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 118, 
            subject: 'Engineering', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 119, 
            subject: 'English', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 120, 
            subject: 'English Language', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 121, 
            subject: 'English Literature', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 122, 
            subject: 'Environment Management', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 123, 
            subject: 'Environmental Management', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 124, 
            subject: 'Environmental Science', 
            categories: [
                { subjectCategoryId : 26, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 125, 
            subject: 'Environmental Technology', 
            categories: [
                { subjectCategoryId : 26, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 126, 
            subject: 'Equine Management', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 127, 
            subject: 'Esports', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 128, 
            subject: 'Euphonium', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 129, 
            subject: 'Excel', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 130, 
            subject: 'Fashion', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 131, 
            subject: 'Fashion and Textiles', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 132, 
            subject: 'Fencing', 
            categories: [
                { subjectCategoryId : 45, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 133, 
            subject: 'Film and Animation', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 134, 
            subject: 'Film Studies', 
            categories: [
                { subjectCategoryId : 6, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 135, 
            subject: 'Finance', 
            categories: [
                { subjectCategoryId : 1, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 136, 
            subject: 'Fine Art', 
            categories: [
                { subjectCategoryId : 10, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 137, 
            subject: 'Finnish', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 138, 
            subject: 'Flamenco', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 139, 
            subject: 'Floristry', 
            categories: [
                { subjectCategoryId : 10, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 140, 
            subject: 'Flugelhorn', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 141, 
            subject: 'Flute', 
            categories: [
                { subjectCategoryId : 16, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 142, 
            subject: 'Food Nutrition', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 143, 
            subject: 'Football', 
            categories: [
                { subjectCategoryId : 45, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 144, 
            subject: 'Forensic Criminal', 
            categories: [
                { subjectCategoryId : 9, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 145, 
            subject: 'Forestry', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 146, 
            subject: 'Foxtrot', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 147, 
            subject: 'French', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 148, 
            subject: 'Further Maths', 
            categories: [
                { subjectCategoryId : 5, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 149, 
            subject: 'Gaeilge', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 150, 
            subject: 'Gaelic', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 151, 
            subject: 'Gàidhlig', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 152, 
            subject: 'Geography', 
            categories: [
                { subjectCategoryId : 26, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 153, 
            subject: 'Geology', 
            categories: [
                { subjectCategoryId : 26, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 154, 
            subject: 'German', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 155, 
            subject: 'GIMP', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 156, 
            subject: 'Glass - Stained Glass', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 157, 
            subject: 'Gluten Free', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 158, 
            subject: 'Go', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 159, 
            subject: 'Golf', 
            categories: [
                { subjectCategoryId : 45, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 160, 
            subject: 'Google Android', 
            categories: [
                { subjectCategoryId : 34, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 161, 
            subject: 'Google Cloud', 
            categories: [
                { subjectCategoryId : 31, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 162, 
            subject: 'Graphic Design', 
            categories: [
                { subjectCategoryId : 10, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 163, 
            subject: 'Gravit Designer', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 164, 
            subject: 'Greek', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 165, 
            subject: 'Guitar', 
            categories: [
                { subjectCategoryId : 21, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 166, 
            subject: 'Gujarati', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 167, 
            subject: 'Hair and Beauty', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 168, 
            subject: 'Harp (Non-pedal)', 
            categories: [
                { subjectCategoryId : 14, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 169, 
            subject: 'Harp (Pedal)', 
            categories: [
                { subjectCategoryId : 14, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 170, 
            subject: 'Harpsichord', 
            categories: [
                { subjectCategoryId : 21, level : 'MUSICAL_GRADE_4_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 171, 
            subject: 'Health and Social Care', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 172, 
            subject: 'Healthcare', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 173, 
            subject: 'Hebrew', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 174, 
            subject: 'Hindi', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 175, 
            subject: 'Hinduism', 
            categories: [
                { subjectCategoryId : 8, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 176, 
            subject: 'Hip Hop Dance', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 177, 
            subject: 'History', 
            categories: [
                { subjectCategoryId : 12, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 178, 
            subject: 'History of Art', 
            categories: [
                { subjectCategoryId : 10, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 179, 
            subject: 'Home Economics', 
            categories: [
                { subjectCategoryId : 28, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 180, 
            subject: 'Horn', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 181, 
            subject: 'Horse Riding', 
            categories: [
                { subjectCategoryId : 45, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 182, 
            subject: 'Horticultural', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 183, 
            subject: 'Hospitality', 
            categories: [
                { subjectCategoryId : 30, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 184, 
            subject: 'HTML', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 185, 
            subject: 'Hungarian', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 186, 
            subject: 'IBM', 
            categories: [
                { subjectCategoryId : 31, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 187, 
            subject: 'ICAS', 
            categories: [
                { subjectCategoryId : 46, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 188, 
            subject: 'ICT', 
            categories: [
                { subjectCategoryId : 4, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 189, 
            subject: 'Illustrator', 
            categories: [
                { subjectCategoryId : 36, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 190, 
            subject: 'InDesign', 
            categories: [
                { subjectCategoryId : 36, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 191, 
            subject: 'Indian', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 192, 
            subject: 'Indonesian', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 193, 
            subject: 'Information Technology', 
            categories: [
                { subjectCategoryId : 4, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 194, 
            subject: 'Inkscape', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 195, 
            subject: 'Instrumental / Vocal Teaching', 
            categories: [
                { subjectCategoryId : 20, level : 'MUSICAL_DIP' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 196, 
            subject: 'Irish', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 197, 
            subject: 'isiZulu', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 198, 
            subject: 'Islamic Studies', 
            categories: [
                { subjectCategoryId : 8, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 199, 
            subject: 'Italian', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 41, level : 'HOURLY_RATE' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 200, 
            subject: 'Japanese', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 201, 
            subject: 'Java', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 202, 
            subject: 'Javascript', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 203, 
            subject: 'Jazz', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 204, 
            subject: 'Jazz Clarinet', 
            categories: [
                { subjectCategoryId : 19, level : 'MUSICAL_GRADE_1_5' }
            ]
        },
        {
            subjectId: 205, 
            subject: 'Jazz Cornet', 
            categories: [
                { subjectCategoryId : 19, level : 'MUSICAL_GRADE_1_5' }
            ]
        },
        {
            subjectId: 206, 
            subject: 'Jazz Flugelhorn', 
            categories: [
                { subjectCategoryId : 19, level : 'MUSICAL_GRADE_1_5' }
            ]
        },
        {
            subjectId: 207, 
            subject: 'Jazz Flute', 
            categories: [
                { subjectCategoryId : 19, level : 'MUSICAL_GRADE_1_5' }
            ]
        },
        {
            subjectId: 208, 
            subject: 'Jazz Piano', 
            categories: [
                { subjectCategoryId : 19, level : 'MUSICAL_GRADE_1_5' }
            ]
        },
        {
            subjectId: 209, 
            subject: 'Jazz Saxophone', 
            categories: [
                { subjectCategoryId : 19, level : 'MUSICAL_GRADE_1_5' }
            ]
        },
        {
            subjectId: 210, 
            subject: 'Jazz Trombone', 
            categories: [
                { subjectCategoryId : 19, level : 'MUSICAL_GRADE_1_5' }
            ]
        },
        {
            subjectId: 211, 
            subject: 'Jazz Trumpet', 
            categories: [
                { subjectCategoryId : 19, level : 'MUSICAL_GRADE_1_5' }
            ]
        },
        {
            subjectId: 212, 
            subject: 'Jewelry', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 213, 
            subject: 'Jive', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 214, 
            subject: 'Journalism', 
            categories: [
                { subjectCategoryId : 30, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 215, 
            subject: 'Ju-jutsu', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 216, 
            subject: 'Judo', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 217, 
            subject: 'Karate', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 218, 
            subject: 'Keyboard', 
            categories: [
                { subjectCategoryId : 21, level : 'MUSICAL_METAL_SCALE' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 219, 
            subject: 'Kickboxing', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 220, 
            subject: 'Korean', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 221, 
            subject: 'Krav-Maga', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 222, 
            subject: 'Krump', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 223, 
            subject: 'Kung Fu', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 224, 
            subject: 'Latin', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 225, 
            subject: 'Law', 
            categories: [
                { subjectCategoryId : 9, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 226, 
            subject: 'Leisure', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 227, 
            subject: 'Leisure and Tourism', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 228, 
            subject: 'Leisure Studies', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 229, 
            subject: 'LeRoc', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 230, 
            subject: 'Lifestyle', 
            categories: [
                { subjectCategoryId : 30, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 231, 
            subject: 'Lightroom', 
            categories: [
                { subjectCategoryId : 36, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 232, 
            subject: 'Line Dancing', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 233, 
            subject: 'Linux', 
            categories: [
                { subjectCategoryId : 34, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 234, 
            subject: 'Literature', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 235, 
            subject: 'Malay', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 236, 
            subject: 'Mandarin', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 237, 
            subject: 'Manufacture', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 238, 
            subject: 'Maria', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 239, 
            subject: 'Marine Science', 
            categories: [
                { subjectCategoryId : 23, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 240, 
            subject: 'Marketing', 
            categories: [
                { subjectCategoryId : 1, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 241, 
            subject: 'Materials', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 242, 
            subject: 'Maths', 
            categories: [
                { subjectCategoryId : 5, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 243, 
            subject: 'Maths Applied', 
            categories: [
                { subjectCategoryId : 5, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 244, 
            subject: 'Maths of Mechanics', 
            categories: [
                { subjectCategoryId : 5, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 245, 
            subject: 'Maths Pure', 
            categories: [
                { subjectCategoryId : 5, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 246, 
            subject: 'Matlab', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 247, 
            subject: 'Media', 
            categories: [
                { subjectCategoryId : 30, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 248, 
            subject: 'Metalwork', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 249, 
            subject: 'Microsoft Windows', 
            categories: [
                { subjectCategoryId : 34, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 250, 
            subject: 'Mixed Media', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 251, 
            subject: 'MongoDB', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 252, 
            subject: 'Motor Vehicles', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 253, 
            subject: 'Moving Image Art', 
            categories: [
                { subjectCategoryId : 4, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 254, 
            subject: 'Music', 
            categories: [
                { subjectCategoryId : 6, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 255, 
            subject: 'Music Direction', 
            categories: [
                { subjectCategoryId : 20, level : 'MUSICAL_DIP' }
            ]
        },
        {
            subjectId: 256, 
            subject: 'Music Performance', 
            categories: [
                { subjectCategoryId : 20, level : 'MUSICAL_DIP' }
            ]
        },
        {
            subjectId: 257, 
            subject: 'Music Theory', 
            categories: [
                { subjectCategoryId : 18, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 258, 
            subject: 'Musical Theatre', 
            categories: [
                { subjectCategoryId : 21, level : 'MUSICAL_GRADE_1_3' }
            ]
        },
        {
            subjectId: 259, 
            subject: 'MySQL', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 260, 
            subject: 'Nepal Studies', 
            categories: [
                { subjectCategoryId : 28, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 261, 
            subject: 'Nepali', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 262, 
            subject: 'Norwegian', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 263, 
            subject: 'Nutrition', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 264, 
            subject: 'Oboe', 
            categories: [
                { subjectCategoryId : 16, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 265, 
            subject: 'Office', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 266, 
            subject: 'Oracle', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 267, 
            subject: 'Organ', 
            categories: [
                { subjectCategoryId : 21, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 268, 
            subject: 'Outlook', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 269, 
            subject: 'Paint Acrylic', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 270, 
            subject: 'Paint Oil', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 271, 
            subject: 'Paint Watercolour', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 272, 
            subject: 'Pakistan Studies', 
            categories: [
                { subjectCategoryId : 28, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 273, 
            subject: 'Panjabi', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 274, 
            subject: 'Pecussion (Combined)', 
            categories: [
                { subjectCategoryId : 13, level : 'MUSICAL_GRADE_1_8' }
            ]
        },
        {
            subjectId: 275, 
            subject: 'Performance-only', 
            categories: [
                { subjectCategoryId : 20, level : 'MUSICAL_ARSM' }
            ]
        },
        {
            subjectId: 276, 
            subject: 'Performing Arts', 
            categories: [
                { subjectCategoryId : 6, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 277, 
            subject: 'Perl', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 278, 
            subject: 'Persian', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 279, 
            subject: 'Personal Training', 
            categories: [
                { subjectCategoryId : 45, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 280, 
            subject: 'Pharmaceutical Science', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 281, 
            subject: 'Philosophy', 
            categories: [
                { subjectCategoryId : 11, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 282, 
            subject: 'Photography', 
            categories: [
                { subjectCategoryId : 10, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 283, 
            subject: 'Photoscape', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 284, 
            subject: 'Photoshop', 
            categories: [
                { subjectCategoryId : 36, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 285, 
            subject: 'PHP', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 286, 
            subject: 'Physical Education', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 287, 
            subject: 'Physics', 
            categories: [
                { subjectCategoryId : 25, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 288, 
            subject: 'Piano', 
            categories: [
                { subjectCategoryId : 18, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 289, 
            subject: 'Pilates', 
            categories: [
                { subjectCategoryId : 39, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 290, 
            subject: 'Pole dance', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 291, 
            subject: 'Polish', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 292, 
            subject: 'Politics', 
            categories: [
                { subjectCategoryId : 30, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 293, 
            subject: 'Popping', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 294, 
            subject: 'Portuguese', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 295, 
            subject: 'PostgreSQL', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 296, 
            subject: 'Power BI', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 297, 
            subject: 'Powerpoint', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 298, 
            subject: 'Premiere Pro', 
            categories: [
                { subjectCategoryId : 36, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 299, 
            subject: 'Printmaking', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 300, 
            subject: 'Production Arts', 
            categories: [
                { subjectCategoryId : 6, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 301, 
            subject: 'Project', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 302, 
            subject: 'Psychology', 
            categories: [
                { subjectCategoryId : 27, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 303, 
            subject: 'Public Services', 
            categories: [
                { subjectCategoryId : 29, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 304, 
            subject: 'Publisher', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 305, 
            subject: 'Punjabi', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 306, 
            subject: 'Python', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 307, 
            subject: 'R', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 308, 
            subject: 'Rail Engineering', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 309, 
            subject: 'Reiki', 
            categories: [
                { subjectCategoryId : 39, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 310, 
            subject: 'Religious Studies', 
            categories: [
                { subjectCategoryId : 8, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 311, 
            subject: 'Romanian', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 312, 
            subject: 'Ruby', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 313, 
            subject: 'Russian', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 314, 
            subject: 'Sailing', 
            categories: [
                { subjectCategoryId : 45, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 315, 
            subject: 'Salsa', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 316, 
            subject: 'Sanskrit', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 317, 
            subject: 'SAP HANA', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 318, 
            subject: 'Saxophone', 
            categories: [
                { subjectCategoryId : 16, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 319, 
            subject: 'Scuba Diving', 
            categories: [
                { subjectCategoryId : 45, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 320, 
            subject: 'Sculture', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 321, 
            subject: 'Serbian', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 322, 
            subject: 'Setswana', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 323, 
            subject: 'Sewing', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 324, 
            subject: 'Sharepoint', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 325, 
            subject: 'Sign Language', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 326, 
            subject: 'Singing', 
            categories: [
                { subjectCategoryId : 21, level : 'MUSICAL_GRADE_1_8' }
            ]
        },
        {
            subjectId: 327, 
            subject: 'Sinhala', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 328, 
            subject: 'Sketch', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 329, 
            subject: 'Slovak', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 330, 
            subject: 'Snare Drum', 
            categories: [
                { subjectCategoryId : 13, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 331, 
            subject: 'Soap making', 
            categories: [
                { subjectCategoryId : 38, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 332, 
            subject: 'Social Care', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 333, 
            subject: 'Sociology', 
            categories: [
                { subjectCategoryId : 28, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 334, 
            subject: 'Software Systems Development', 
            categories: [
                { subjectCategoryId : 4, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 335, 
            subject: 'Solaris', 
            categories: [
                { subjectCategoryId : 34, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 336, 
            subject: 'Spanish', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 41, level : 'HOURLY_RATE' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 337, 
            subject: 'Sports Science', 
            categories: [
                { subjectCategoryId : 2, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 338, 
            subject: 'SQL', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 339, 
            subject: 'SQL Server', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
               ,{ subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 340, 
            subject: 'Statistics', 
            categories: [
                { subjectCategoryId : 5, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 341, 
            subject: 'Sushi', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 342, 
            subject: 'Swahili', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 343, 
            subject: 'Swedish', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 344, 
            subject: 'Swift', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 345, 
            subject: 'Taekwondo', 
            categories: [
                { subjectCategoryId : 44, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 346, 
            subject: 'Tamil', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 347, 
            subject: 'Tango', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 348, 
            subject: 'Tap dance', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 349, 
            subject: 'Teradata', 
            categories: [
                { subjectCategoryId : 32, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 350, 
            subject: 'Textiles', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 351, 
            subject: 'Thai', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 41, level : 'HOURLY_RATE' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 352, 
            subject: 'Thinking Skills', 
            categories: [
                { subjectCategoryId : 27, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 353, 
            subject: 'Timpani', 
            categories: [
                { subjectCategoryId : 13, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 354, 
            subject: 'Travel and Tourism', 
            categories: [
                { subjectCategoryId : 30, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 355, 
            subject: 'Treble Recorder', 
            categories: [
                { subjectCategoryId : 16, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 356, 
            subject: 'Trombone', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 357, 
            subject: 'Trumpet', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 358, 
            subject: 'Tuba', 
            categories: [
                { subjectCategoryId : 15, level : 'MUSICAL_GRADE_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 359, 
            subject: 'Tuned Percussion', 
            categories: [
                { subjectCategoryId : 13, level : 'MUSICAL_GRADE_1_8' }
            ]
        },
        {
            subjectId: 360, 
            subject: 'Turkish', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 361, 
            subject: 'Typescript', 
            categories: [
                { subjectCategoryId : 35, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 362, 
            subject: 'Ukrainian', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 363, 
            subject: 'Urdu', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
               ,{ subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 364, 
            subject: 'VBA', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 365, 
            subject: 'Vegan', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 366, 
            subject: 'Vehicle', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 367, 
            subject: 'Vienamese', 
            categories: [
                { subjectCategoryId : 42, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 368, 
            subject: 'Viola', 
            categories: [
                { subjectCategoryId : 17, level : 'MUSICAL_GRADE_INIT_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 369, 
            subject: 'Violin', 
            categories: [
                { subjectCategoryId : 17, level : 'MUSICAL_GRADE_INIT_1_8' }
               ,{ subjectCategoryId : 43, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 370, 
            subject: 'Visio', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 371, 
            subject: 'Waltz', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 372, 
            subject: 'Welsh', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 373, 
            subject: 'Welsh Language', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 374, 
            subject: 'Welsh Literature', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 375, 
            subject: 'Wheelchair Dancing', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 376, 
            subject: 'Windows', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 377, 
            subject: 'Wine', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 378, 
            subject: 'Wine Making', 
            categories: [
                { subjectCategoryId : 41, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 379, 
            subject: 'Woodwork', 
            categories: [
                { subjectCategoryId : 3, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 380, 
            subject: 'Word', 
            categories: [
                { subjectCategoryId : 37, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 381, 
            subject: 'World Literature', 
            categories: [
                { subjectCategoryId : 7, level : 'ACADEMIC' }
            ]
        },
        {
            subjectId: 382, 
            subject: 'Xara Designer Pro X', 
            categories: [
                { subjectCategoryId : 33, level : 'BEG_INT_ADV' }
            ]
        },
        {
            subjectId: 383, 
            subject: 'Yoga', 
            categories: [
                { subjectCategoryId : 39, level : 'HOURLY_RATE' }
            ]
        },
        {
            subjectId: 384, 
            subject: 'Zumba', 
            categories: [
                { subjectCategoryId : 40, level : 'HOURLY_RATE' }
            ]
        }
    ];
    
    export const tuitionLevels: { [key: string]: {type: 'group'|'value', key: number, name: string, items: {subjectLevelItemId: number; levelItem: string}[]}} = {
    
        'ACADEMIC' : { type: 'group', key: 1, name: 'Academic', items:  [ 
            { subjectLevelItemId: 3,    levelItem: 'Primary (Key stage 1 & 2)' },
            { subjectLevelItemId: 5,    levelItem: 'Secondary (Key stage 3)' },
            { subjectLevelItemId: 1,    levelItem: 'GCSE/Nats 3-5' },
            { subjectLevelItemId: 4,    levelItem: 'A-Level/Highers' },
            { subjectLevelItemId: 6,    levelItem: 'IB' },
            { subjectLevelItemId: 2,    levelItem: 'Degree+' },
        ] }, 
        'BEG_INT_ADV' : { type: 'group', key: 2, name: 'Level', items:  [ 
            { subjectLevelItemId: 8,    levelItem: 'Beginner' },
            { subjectLevelItemId: 9,    levelItem: 'Intermediate' },
            { subjectLevelItemId: 7,    levelItem: 'Advanced' },
        ] }, 
        'HOURLY_RATE' : { type: 'value', key: 3, name: 'Recreational Learning', items:  [ 
            { subjectLevelItemId: 10,    levelItem: 'Recreational Learning' },
        ] }, 
        'MUSICAL_ARSM' : { type: 'value', key: 4, name: 'ARSM', items:  [ 
            { subjectLevelItemId: 11,    levelItem: 'ARSM' },
        ] }, 
        'MUSICAL_DIP' : { type: 'group', key: 5, name: 'Musical Grades', items:  [ 
            { subjectLevelItemId: 12,    levelItem: 'DipABRSM' },
            { subjectLevelItemId: 13,    levelItem: 'LRSM' },
            { subjectLevelItemId: 14,    levelItem: 'FRSM' },
        ] }, 
        'MUSICAL_GRADE_1_3' : { type: 'group', key: 6, name: 'Musical Grades', items:  [ 
            { subjectLevelItemId: 15,    levelItem: 'Grade 1' },
            { subjectLevelItemId: 16,    levelItem: 'Grade 2' },
            { subjectLevelItemId: 17,    levelItem: 'Grade 3' },
        ] }, 
        'MUSICAL_GRADE_1_5' : { type: 'group', key: 7, name: 'Musical Grades', items:  [ 
            { subjectLevelItemId: 18,    levelItem: 'Grade 1 - 2' },
            { subjectLevelItemId: 19,    levelItem: 'Grade 3 - 4' },
            { subjectLevelItemId: 20,    levelItem: 'Grade 5' },
        ] }, 
        'MUSICAL_GRADE_1_8' : { type: 'group', key: 8, name: 'Musical Grades', items:  [ 
            { subjectLevelItemId: 21,    levelItem: 'Grade 1 - 2' },
            { subjectLevelItemId: 23,    levelItem: 'Grade 3 - 4' },
            { subjectLevelItemId: 24,    levelItem: 'Grade 5 - 6' },
            { subjectLevelItemId: 22,    levelItem: 'Grade 7 - 8' },
        ] }, 
        'MUSICAL_GRADE_4_8' : { type: 'group', key: 9, name: 'Musical Grades', items:  [ 
            { subjectLevelItemId: 25,    levelItem: 'Grade 4 - 5' },
            { subjectLevelItemId: 26,    levelItem: 'Grade 6 - 7' },
            { subjectLevelItemId: 27,    levelItem: 'Grade 8' },
        ] }, 
        'MUSICAL_GRADE_6_8' : { type: 'group', key: 10, name: 'Musical Grades', items:  [ 
            { subjectLevelItemId: 28,    levelItem: 'Grade 6' },
            { subjectLevelItemId: 29,    levelItem: 'Grade 7' },
            { subjectLevelItemId: 30,    levelItem: 'Grade 8' },
        ] }, 
        'MUSICAL_GRADE_INIT_1_8' : { type: 'group', key: 11, name: 'Musical Grades', items:  [ 
            { subjectLevelItemId: 32,    levelItem: 'Initial Grade' },
            { subjectLevelItemId: 34,    levelItem: 'Grade 1 - 2' },
            { subjectLevelItemId: 31,    levelItem: 'Grade 3 - 4' },
            { subjectLevelItemId: 33,    levelItem: 'Grade 5 - 6' },
            { subjectLevelItemId: 35,    levelItem: 'Grade 7 - 8' },
        ] }, 
        'MUSICAL_METAL_SCALE' : { type: 'group', key: 12, name: 'Musical Grades', items:  [ 
            { subjectLevelItemId: 36,    levelItem: 'Copper' },
            { subjectLevelItemId: 38,    levelItem: 'Bronze' },
            { subjectLevelItemId: 40,    levelItem: 'Silver' },
            { subjectLevelItemId: 37,    levelItem: 'Gold' },
            { subjectLevelItemId: 39,    levelItem: 'Platinium' },
        ] }, 
    };
