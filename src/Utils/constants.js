export const AttachmentType = {
    NO_TYPE: { value: 'NO_TYPE', label: '(no type)' },
    URL: { value: 'URL', label: 'URL' },
    DOCS: { value: 'DOCS', label: 'Google Doc' },
    SHEETS: { value: 'SHEETS', label: 'Google Sheet' },
    DRIVE: { value: 'DRIVE', label: 'Google Drive' },
    CONCEPTS:{ value: 'CONCEPTS', label: 'Concepts' },
    GITHUB: { value: 'GITHUB', label: 'Github' },
    SKETCHUP: { value: 'SKETCHUP', label: 'Sketchup' },
    YOUTUBE: { value: 'YOUTUBE', label: 'Youtube' },
}

export const ProjectType = {
    NO_TYPE: { value: 'NO_TYPE', label: '(no type)' },
    HOBBY: { value: 'HOBBY', label: 'Hobby' },
    CHORE: { value: 'CHORE', label: 'Chore' },
    WORK: { value: 'WORK', label: 'Work' },
    SOCIAL: { value: 'SOCIAL', label: 'Social' },
    LEISURE:{ value: 'LEISURE', label: 'Leisure' },
}

export const ProjectSubtype = {
    HOBBY: {
        NO_TYPE: { value: 'NO_TYPE', label: '(no type)' },
        WOODWORKING: { value: 'WOODWORKING', label: 'Woodworking' },
        GUITAR: { value: 'GUITAR', label: 'Guitar' },
        LADDER_BRACKET: { value: 'LADDER_BRACKET', label: 'Ladder Bracket' },
        TASK_FRACTAL: { value: 'TASK_FRACTAL', label: 'Task Fractal' },
        PROGRAMMING: { value: 'PROGRAMMING', label: 'Programming' }
    },
    /*
    CHORE: {

    }
    */
    WORK: {
        NO_TYPE: { value: 'NO_TYPE', label: '(no subtype)' },
        DISPUTES: { value: 'DISPUTES', label: 'Disputes' },
        BANKING: { value: 'BANKING', label: 'Banking' },
        CA_ALERTS: { value: 'CA_ALERTS', label: 'Canadian Alerts' },
        GE_WEB: { value: 'GE_WEB', label: 'Team GE Web' },
        LEARNING: { value: 'LEARNING', label: 'Learning' },
        SAPPHIRE: { value: 'SAPPHIRE', label: 'Team Sapphire' },
        FAUCET: { value: 'FAUCET', label: 'Faucet' }
    },
    /*
    SOCIAL: {

    }
    */
    /*
    LEISURE: {

    }
    */
}