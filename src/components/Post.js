import React, { useState } from "react";
import {db} from '../firebase';
import { doc, deleteDoc, updateDoc} from "firebase/firestore";


const Post = ({postObj, isOwener})=>{
  const [edit, setEdit]=useState(false);
  const [newpost,setNewpost] = useState(postObj.content);

  const deletePost = async () =>{
    const question = window.confirm('정말 삭제할까요?');
    if(question){
      await deleteDoc(doc(db, "posts", postObj.id));
    }
  }
  const toggleEditMode =()=>setEdit(prev=>!prev);
  const onChange = (e) =>{
    const{target:{value}} =e;
    setNewpost(value);
  }
  const onSubmit = async (e) =>{
    e.preventDefault();
    const postRef = doc(db, "posts", postObj.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(postRef, {
      content: newpost
    });
    setEdit(false);
  }
  return(
    <li>
      {
        edit ? (
          <>
          <form onSubmit={onSubmit}>
              <input value={newpost} onChange={onChange} />
              <button>업데이트</button>
          </form>
          <button onClick={toggleEditMode}>취소</button>
          </>
        ): (
      <>
        <h4>{postObj.content}</h4>
        {         
         postObj.attachmentUrl !== '' && (
          <img src={postObj.attachmentUrl} width="200" alt=""/>      
          )
        }
        {         
          isOwener && (
          <> 
            <button onClick={toggleEditMode}>수정</button>
            <button onClick={deletePost}>삭제</button>
          </>      
          )
        }
      </>      
      )
      }      
    </li>    
  )
}

export default Post;