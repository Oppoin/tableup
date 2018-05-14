const config = {
    paging: true, 
    rowsPerPageOptions: [2, 5, 10],
    rowsPerPage: 5,
    checkbox: true,
    search: true,
    tableTheme: {
        header: {
            backgroundColor: '#000',
            color: "#fff"
        },
        oddRow: {
            backgroundColor: "#8ed8f6",
            color: "#000",
        },
        evenRow: {
            backgroundColor: "#a5f68e",
            color: "#000",
            
        },
        selected: {
            backgroundColor: "rgba(248, 203, 0, 0.4)",
            color: "#000"
        },
        hover: {
            '&:hover' : {
                backgroundColor: "#00be35",
                color: "#000",
            }
        }
    },
    checkboxTheme: {
        checked: {
            color: "#fe3c02"
        }
    },
    toolbarTheme: {
        highlight: {
            backgroundColor: "#e2fbff",
            color: "#0031f5"
        }
    }
}

export default config;