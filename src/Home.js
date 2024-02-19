import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, Grid, Grow, Icon, Skeleton, Slide, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import XIcon from '@mui/icons-material/X';


function Home() {

const [data,setData] = useState("")
const [userInfo,setUserInfo] = useState("")
const [checked, setChecked] = useState(false);
const navigation = useNavigate()   



 useEffect(()=>{
    axios.get('https://api.github.com/users').then(res=>{
    setData(res.data)
  })

 },[])   


function handleClick(event)
{
  
  const queryParams = {
    user: event.row.login,
  };

  const queryString = new URLSearchParams(queryParams).toString();

  const url = `/user?${queryString}`;
  navigation(url)

  // axios.get(`https://api.github.com/users/${event.row.login}`).then(res=>{
  //   setUserInfo(res.data)
  //   setChecked(true)
  // })
}

console.log()

 const columns = [
    {
        field: 'avatar_url',
        headerName: 'Image',
        width: 250,        
                
        renderCell: (params) => (
            <img src={params.value} alt={params.row.login} style={{ width: '50px', borderRadius: '50%' }} />
        ),
    },
    { field: 'login', headerName: 'User Name', width: 150 ,  renderCell: (params) => (
      <div style={{ fontSize: '17px' }}>
      {params.value}
  </div>
  ),},   
  
];
  

  return (
    <>
    <h1 className='heading'>Git Bees</h1>

    <Grid container spacing={5} justifyContent='center' display='flex'>
      
      <Grid item >
      {data ? 
            <Box>
                
            <DataGrid                        
            sx={{m:3,height:'75vh',width:'550px',padding:'30px','&, [class^=MuiDataGrid]': {borderBottom: 'none',borderWidth:'2px',borderColor:'#B1C381',borderRadius:'25px',overflowX:'hidden',fontSize:'20px',fontFamily:'monospace',cursor:'pointer' }}}    
            rowHeight={70}              
            onRowClick={(e)=>handleClick(e)}
            rows={data}
            columns={columns}
            hideFooter={true}    
            /></Box> : 
            <> 
           <Skeleton variant="circular" width={40} height={40} /><br></br>
          <Skeleton variant="rectangular" width={510} height={70} /><br></br>
            <Skeleton variant="rounded" width={510} height={70} /> <br></br>
            <Skeleton variant="rounded" width={510} height={70} /><br></br>
            <Skeleton variant="rounded" width={510} height={70} /> </>}
      </Grid>

     
    </Grid>
          
    </>
  )
}

export default Home