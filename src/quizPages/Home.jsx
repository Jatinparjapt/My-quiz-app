import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import createQuizImg from './createQuizIm.png';
import myQuizesImg from './myQuizesIm.png';
import playQuizImg from './playQuizIm.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
   <>
      <div className='flex flex-col md:flex-row mt-28'>
        <div className='drop-shadow-2xl shadow-amber-300'>
          <Card className='m-2 w-full md:w-[323px]'>
            <CardActionArea>
              <img src={createQuizImg} alt="Create New Quiz" width={500} height={500} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Create New Quiz
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create My Quiz: Easy online tool for personalized quizzes. User-friendly, diverse options, and shareable links for interactive learning experiences.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to='/createquiz' className='rounded-md text-xl ml-3 text-teal-500'>
                Create Quiz
              </Link>
            </CardActions>
          </Card>
        </div>
        <div className='drop-shadow-2xl shadow-amber-300'>
          <Card className='m-2 w-full md:w-[323px]'>
            <CardActionArea>
              <img src={playQuizImg} alt="Let's Play Quiz" width={500} height={500} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Play Quiz
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Play Quiz: Enjoy interactive challenges with diverse topics, customizable features, and easy sharing options for a fun and engaging experience.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to='/playquiz' className='rounded-md text-xl ml-3 text-teal-500'>
                Play Quiz
              </Link>
            </CardActions>
          </Card>
        </div>
        <div className='drop-shadow-2xl shadow-amber-300'>
          <Card className='m-2 w-full md:w-[323px]'>
            <CardActionArea>
              <img src={myQuizesImg} alt="My Quizes" width={500} height={500} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  My Quizes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Explore diverse quizzes tailored to your interests. Engage in interactive learning with shareable links. Dive into knowledge effortlessly with us.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to='/myquiz' className='rounded-md text-xl ml-3 text-teal-500'>
                MY Quizes
              </Link>
            </CardActions>
          </Card>
        </div>
      </div>
      </>
  );
}

export default Home;
