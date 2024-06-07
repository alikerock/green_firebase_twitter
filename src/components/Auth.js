import React, { useState } from "react";

const Auth = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const onChange = (e) =>{
    console.log(e.target.value);
  }
  const onSubmit = (e) =>{
    e.preventDefault();
  }
  return(
    <form onSubmit={onSubmit}>
      <input type="email" name="email" placeholder="Email 입력하세요" onChange={onChange} />
      <input type="password" name="password" placeholder="비번을 입력하세요" onChange={onChange} />
      <p><button>로그인</button></p>
    </form>
  )
}

export default Auth;