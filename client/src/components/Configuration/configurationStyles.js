class configurationStyles {
    static Page = {
        'display': 'flex',
        'flex-direction': 'column',
    };
    static GeneralHeading = {
        'display': 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        'align-content': 'stretch',
        marginBottom: '10px'
    };
    static SpecificHeading = {
        'margin-right': '20px'
    }
    static ButtonsContainer = {
        'display': 'flex',
        justifyContent: 'flex-end'
    }
    static EditButtonContainer = {
        paddingRight: '5px'
    }
    static EditButton = {
        float: 'left',
        paddingTop: '2px',
        paddingBottom: '2px',
    };
    static Tabs = {
        'margin-left': '24px',
        'margin-top': '5px'
    };
    static StubContainer = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
    static StubIcon = {
        height: '145px',
        width: '145px',
    }
    static StubText = {
        color: "#A6A1A9",
        fontWeight: 'medium',
        fontSize: '20px'
    }

}

export default configurationStyles;