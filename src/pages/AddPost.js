import React from 'react'
import {Container,PostForm} from "../components/index"
function AddPost() {
  return (
    <>
    {console.log("reached addpost page")}
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
    </>
  )
}

export default AddPost;
