'use client'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a2a2a', 
    },
  },
  components: {
    MuiButton: {
        styleOverrides: {
          root: {
            // backgroundColor: '#2a2a2a', // Set the desired original color for the button
            '&:hover': {
            //   backgroundColor: '#2E7D32', // Set the desired hover color for the button
            },
          },
        },
      },
  }
});

export default theme;
