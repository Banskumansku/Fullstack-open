import React, { FC } from 'react'

const Header: FC<{ courseName: string }> = ({ courseName }) => {
  return <h1>{courseName}</h1>
};

export default Header