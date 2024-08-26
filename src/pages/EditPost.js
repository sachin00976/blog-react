import React,{useState,useEffect} from 'react'
import {Container,PostForm} from '../components'
import appwriteService from "../appwrite/config"
import {useNavigate,useParams } from 'react-router-dom'

function EditPost() {
    const [posts,setPosts]=useState(null);
    const {slug}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        if(slug)
        {
            appwriteService.getPost(slug)
            .then((post)=>{
                if(post)
                {
                    setPosts(post);
                }

         })
        }
        else
        {
            navigate('/')
        }
    },[slug,navigate])
  return posts? (
   <Container>
      <div className='py-8'>
        <PostForm  post={posts}/>
      </div>
   </Container>
  ):null

   
}

export default EditPost;
