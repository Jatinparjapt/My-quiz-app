import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from "@mui/material";
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
export default function ResultQuiz() {
  const { score} = useSelector(state=>state.quizSlice);
  // const playerName = typeof window !== 'undefined' ? sessionStorage.getItem("score") : null;
  // const score = playerName ? JSON.parse(playerName) : null;

  return (
    <>
      <Helmet>
        <title>Result Page</title>
      </Helmet>
      {/* <div className="mt-16">
        <ProgressBar />
      </div> */}
      <div className='mt-20 flex justify-center'>
        <div>
          <Typography variant="subtitle1" component="div">
            <h1 className='rounded-md text-4xl ml-3 text-gray-800'>
              Hey! Hacker, that's your result: {score}
            </h1>
          </Typography>
          <br />
          <div className='flex justify-center'>
            <Link className='rounded-full border-solid border-2 hover:text-sky-100 hover:bg-black text-2xl pl-20 pr-20 pt-5 pb-5' to="/">
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
