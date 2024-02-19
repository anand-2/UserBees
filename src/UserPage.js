import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Grid, Grow, Icon, Skeleton, Slide, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import XIcon from '@mui/icons-material/X';




function UserPage() {

 const navigation = useNavigate()   
const [userInfo,setUserInfo] = useState("")
const [name,setName] =useState("")
const [checked, setChecked] = useState(false);

useEffect(()=>{
    const queryString = window.location.search;      
    const queryParams = new URLSearchParams(queryString);      
    setName(queryParams.get('user'));      
},[])


useEffect(()=>{
    if(name)
    {
        axios.get(`https://api.github.com/users/${name}`).then(res=>{
            setUserInfo(res.data)
            setChecked(true)       
    })}
},[name])
      


  return (
    <div> 
       <h1 className='heading'>Git Bees</h1>
       {userInfo ?   
       <>      
        <Grid item sm={8} padding='2rem'>
        <ArrowBackIcon style={{cursor:'pointer'}} onClick={()=> navigation('/')}>Go Back</ArrowBackIcon>

          <Box 
          margin={3}
          borderRadius= '5px'
          padding='0 5rem'          
          display='flex'
          alignItems='center'
          >
            <Box
             component="img"
              sx={{
                width: 160,
                borderRadius:'50%',
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="User."
              src={userInfo?.avatar_url}            
            />
  
              <Grid item>
              <Box className='userName' onClick={()=> window.open(userInfo?.html_url, '_blank')}>{userInfo?.name}</Box>
              <Box className='bio'>{userInfo?.bio}</Box>
              <Grid item display='flex'>
              <FolderCopyOutlinedIcon className='icon' style={{height:'22px'}}></FolderCopyOutlinedIcon>
              <Box id='repo'>{userInfo?.public_repos} public repository</Box>
              
              </Grid>
              
              <Grid item display='flex'>
              <PeopleAltIcon className='icon' style={{height:'22px'}}></PeopleAltIcon>
              <Box id='following'>{userInfo?.followers} followers</Box>
              <p style={{paddingLeft:'0.5rem',fontWeight:'bolder'}}>·</p>
              <Box id='followers'>{userInfo?.following} following</Box>
              </Grid>
              
              
              </Grid>            
              
          </Box>
          
          <Card style={{  width:'70vw',marginLeft: '5rem',padding:'1rem',display:'flex',flexDirection:'column',alignContent:'center',backgroundColor:'#F0F4F9'}}>
            <Box className='contact'>User Info</Box>
            
            {userInfo?.company && <Grid item  style={{  alignItems:'center',display:'flex'}}><WorkOutlinedIcon className='icon' style={{height:'17px'}} /><span className='contactList '>{userInfo?.company}</span></Grid>}
            {userInfo?.location && <Grid item  style={{  alignItems:'center',display:'flex'}}><FmdGoodOutlinedIcon className='icon' style={{height:'17px'}} /><span className='contactList '>{userInfo?.location}</span></Grid>}       
            {userInfo?.email && <Grid item style={{  alignItems:'center',display:'flex'}}><EmailOutlinedIcon className='icon' style={{height:'17px'}} /><span className='contactList '>{userInfo?.email}</span></Grid>}
            {userInfo?.twitter_username && <Grid item style={{  alignItems:'center',display:'flex'}}><XIcon className='icon' style={{height:'17px'}} /><span className='contactList '>{userInfo?.twitter_username}</span></Grid>}
            {userInfo?.blog && <Grid item style={{  alignItems:'center',display:'flex',cursor:'pointer'}} onClick={()=> window.open(userInfo?.blog, '_blank')}><LanguageOutlinedIcon className='icon' style={{height:'17px'}} /><span className='contactList '>{userInfo?.blog}</span></Grid>}
  
          
            
            </Card>
        </Grid></>
        : <div style={{padding:'3rem' ,marginLeft:'5rem'}}> 
        <Skeleton variant="circular" width={100} height={100} /><br></br>
       <Skeleton variant="rectangular" width={910} height={70} /><br></br>
         <Skeleton variant="rounded" width={910} height={70} /> <br></br>
         <Skeleton variant="rounded" width={910} height={100} /><br></br>
          </div>}
        </div>
  )
}

export default UserPage