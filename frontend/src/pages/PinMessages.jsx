import Sidebar from "../components/Sidebar";
import Box from '@mui/material/Box';
import React from "react";
export default function PinMessages() {
  return (
    <div>
    <Box height={80} />
    <Box sx={{ display: 'flex' }}>
    <Sidebar/>
    <div>
    <h1>This is PinMessage page </h1>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>  
   
      </Box>
    </div>
    </Box>
        
    </div>
  )
}
