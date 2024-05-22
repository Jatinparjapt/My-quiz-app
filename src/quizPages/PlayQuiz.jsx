import React, { useState, useEffect } from 'react';
import { Button, Input, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setUserScore ,setUserName } from '../redux/reducer';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Helmet } from 'react-helmet';
// import { dataStore } from '../path-to-dataStore'; // Adjust the import path to your actual dataStore location

export default function PlayQuiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [radioButtonValue, setRadioButtonValue] = useState(false);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checked, setChecked] = useState({
    option1: { check: false },
    option2: { check: false },
    option3: { check: false }
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://world-wide-news.onrender.com/api/getQuestions");
        console.log(response.data.data ,"xdd")
        setQuestions(response.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUserScore(score))
  }, [score, currentIndex,dispatch]);

  const playerName = (event) => {
    setName(event.target.value);
  }

  const startQuizButton = (event) => {
    event.preventDefault();
    dispatch(setUserName(name))
    setRadioButtonValue(true);
  }

  const updateScore = (event) => {
    const scoreValue = event.target.value;
    setIsDisabled(false);
    setChecked((prevChecked) => ({
      option1: { check: scoreValue === "option1" },
      option2: { check: scoreValue === "option2" },
      option3: { check: scoreValue === "option3" }
    }));
  }

  const submitScore = (event) => {
    event.preventDefault();
    if (score < 100) {
      const currentQuestion = questions[currentIndex];
      if ((checked.option1.check && currentQuestion.option1.checked) ||
          (checked.option2.check && currentQuestion.option2.checked) ||
          (checked.option3.check && currentQuestion.option3.checked)) {
        setScore(prevScore => prevScore + 10);
      }
    }

    if (currentIndex === questions.length - 1) {
      alert("Quiz Completed");
      navigate("/result");
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }

  if (questions.length === 0 || !questions
  ) {
    return (
      <div className="mt-16">
        <h1>Loading ......</h1>
      </div>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Play Quiz Page</title>
        </Helmet>
        <div className="mainDiv">
          <div id="hideDiv" className={`mt-32 flex justify-center ${radioButtonValue ? "hidden" : ""}`}>
            <div className="w-2/4 h-2/4 absolute inset-y-1/3 inset-x-2/5">
              <form className="rounded-xl w-[80%]">
                <Input
                  placeholder="Enter Name"
                  name="name"
                  value={name}
                  onChange={playerName}
                  className="m-2 w-[96%] p-4 rounded-md border border-solid border-black"
                />
                <div className="flex justify-center mr-16">
                  <Button onClick={startQuizButton} className="rounded-full border-solid border-2 hover:bg-black text-md pl-12 pr-12">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className={`mt-24 m-20 border border-sky-400 relative ${radioButtonValue ? "" : "hidden"}`}>
            <div className="mt-0 flex justify-center">
              <h1 className="text-2xl font-bold">
                {questions[currentIndex].category}
              </h1>
            </div>
            <div className="bg-sky-100 mt-20 ml-5">
              <p>{questions[currentIndex].question}</p>
            </div>
            <div className="m-8">
              <FormControl>
                <RadioGroup name="radio-buttons-group" defaultValue={null}>
                  <FormControlLabel value="option1" onChange={updateScore} control={<Radio />} label={questions[currentIndex].option1.data} />
                  <FormControlLabel value="option2" onChange={updateScore} control={<Radio />} label={questions[currentIndex].option2.data} />
                  <FormControlLabel value="option3" onChange={updateScore} control={<Radio />} label={questions[currentIndex].option3.data} />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <div>
                <h4>Question {currentIndex + 1}</h4>
              </div>
              <div className="flex justify-end mr-16">
                {currentIndex === questions.length - 1 ? (
                  <Button onClick={submitScore} className="rounded-full border-solid border-2 hover:bg-black text-md pl-12 pr-12">
                    Submit
                  </Button>
                ) : (
                  <Button onClick={submitScore} disabled={isDisabled} className="rounded-full border-solid border-2 hover:bg-black text-md pl-12 pr-12">
                    Next Question
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
