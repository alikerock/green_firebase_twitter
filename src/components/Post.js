import React from "react";

const Post = ({postObj, isOwener})=>{
  console.log(postObj);
  const deletePost = () =>{
    const question = window.confirm('정말 삭제할까요?');
    if(question){

    }
  }
  return(
    <li>
      <h4>{postObj.content}</h4>
      {
        isOwener && (
        <> 
          <button>수정</button>
          <button onClick={deletePost}>삭제</button>
        </>      
        )      
      }      
    </li>
  )
}

export default Post;