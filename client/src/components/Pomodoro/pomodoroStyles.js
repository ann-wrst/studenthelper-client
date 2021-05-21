class pomodoroStyles {

    static Interval = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'

    };
    static Counter = {
        display: 'flex'
    };
    static IntervalText = {
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: '700'
    };
    static IntervalContainer = {
        marginTop: '25px'
    };

    static Title = {
        fontSize: '3rem',
        fontWeight: '400',
        letterSpacing: '2px',
        color: '#263646',
        marginBottom: 0,
        fontFamily: "'Raleway', sans-serif"
    };

    static SessionHeader = {
        color: '#3e3d46',
        marginTop: '20px',
        paddingTop: '20px',
        fontFamily: "'Karla', sans-serif",
        fontSize: '25px',
        marginBottom: '75px'
    };
    static SessionContainer = {
        border: '5px solid #31369B',
        boxShadow: '0 2px 10px rgba(0,0,0,0.40)',
        width: '400px',
        height: '400px',
        margin: '25px auto',
        borderRadius: '100%',
    };
    static Buttons = {
        marginLeft: '25px'
    }
    static Colon = {
        fontSize: '6rem',
        color: '#3e3d46',
        fontWeight: '400',
        position: 'relative',
        bottom: '7px',
        margin: '0 8px'
    }
    static Timer = {
        margin: '0 0 20px 0',
        fontSize: '6rem',
        color: '#3e3d46',
        fontWeight: '400'
    }
}

export default pomodoroStyles;