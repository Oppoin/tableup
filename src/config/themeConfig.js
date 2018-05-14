const themeConfig = {
    overrides: {
      MuiTableRow: { // Name of the component ⚛️ / style shee
        root: { // Name of the rule
          backgroundColor: '#ff9247', // Some CSS
          '&:nth-of-type(odd):not($selected):not(:hover)': {
            backgroundColor: '#feac62',
          },
          '&$hover:hover': {
              backgroundColor: "#50a9f2",
          },
          '&$selected': {
            backgroundColor: "#2d8aef",
          },
          
        }     
      },
      MuiTableCell: {
        body: {
          color: "white"
        },
        head: {
          backgroundColor: '#dd8337',
          color: "#ebebeb"
        }
      },
      MuiTablePagination: {
        root: {
          backgroundColor: '#dd8337',
          color: "white"
        }
      },
      MuiCheckbox: {
        root: {
          color: "white",
        },
        colorSecondary: {
          '&$checked': {
            color: "#9b1bbc",
          },
        }
      },
    },
    palette: {
      secondary: {
        main: '#3e873d',// contextual toolbar uses this value to calculate it's color when highlighted
      },
    }
  }

  export default themeConfig;