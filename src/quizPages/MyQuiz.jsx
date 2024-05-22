import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { styled, Input } from '@mui/material';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit'; 
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Helmet } from 'react-helmet';
// import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function MyQuiz() {
  const [questions, setQuestions] = useState([]);
  const [idToUpdateQuestion, setIdToUpdateQuestion] = useState('');
  const [updateQuestion, setUpdateQuestion] = useState('');
  const [radioButtonValue, setRadioButtonValue] = useState(true);
  const [secondButton, setSecondButton] = useState(true);
  const [isChecked, setChecked] = useState(true);
  // const history = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://world-wide-news.onrender.com/api/getQuestions");
        console.log(response.data.data , "djfsl")
        setQuestions(response.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const questionUpdate = (e) => {
    setUpdateQuestion(e.target.value);
    const data = JSON.stringify(e.target.value);
    localStorage.setItem("newQuestion", data);
  };

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const selectQuestionDelete = async (id) => {
    let deleteConfirm = window.confirm("Are you sure to delete this question?");
    if (deleteConfirm) {
      try {
        const response = await axios.delete("https://elastic-voice-production.up.railway.app/api/deleteQuestion", { data: { id } });
        if (response.status === 200) {
          alert("Question Deleted");
          setQuestions(questions.filter(q => q._id !== id));
        } else {
          alert("Some error occurred");
        }
      } catch (error) {
        console.error("Error deleting question:", error);
        alert("Some error occurred");
      }
    }
  };

  const updateSelectedQuestion = (id) => {
    setIdToUpdateQuestion(id);
    setRadioButtonValue(false);
    setSecondButton(false);
  };

  const changeHideSetting = async () => {
    setRadioButtonValue(true);
    setSecondButton(true);
    try {
      const response = await axios.put("https://elastic-voice-production.up.railway.app/api/updateQuestion", {
        id: idToUpdateQuestion,
        question: localStorage.getItem("newQuestion")
      });
      if (response.status === 200) {
        alert("Question Updated");
        setQuestions(questions.map(q => q._id === idToUpdateQuestion ? { ...q, question: localStorage.getItem("newQuestion") } : q));
      } else {
        alert("Failed to update question");
      }
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question");
    }
  };
 
  if (!questions.length) {
    return (
      <div className="mt-16">
        <h1>Loading ......</h1>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Quiz Page</title>
      </Helmet>
      <div className='mt-20 m-5'>
        <div id="hideDiv" className={`mt-32 flex justify-center ${radioButtonValue ? "hidden" : ""}`}>
          <div className="w-2/5 h-2/6 absolute inset-y-1/3 inset-x-1/3">
            <form className="rounded-xl w-[96%]">
              <FormControl className="m-3" variant="standard">
                <FormLabel className="text-2xl text-zinc-100">
                  <Input
                    placeholder="Enter Question"
                    name="updateQuestion"
                    value={updateQuestion}
                    onChange={questionUpdate}
                    className="m-2 w-[96%] p-4 rounded-md border border-solid border-black"
                  />
                  <Button className='rounded-full border-solid font-semibold text-blue-700 border-blue-700 border-2 hover:bg-black text-md pl-12 pt-2 pb-3 pr-12' onClick={changeHideSetting}>
                    Save Update
                  </Button>
                </FormLabel>
              </FormControl>
            </form>
          </div>
        </div>
        <div className={`${secondButton ? "" : "hidden"}`}>
          <div className="flex justify-end mr-16 mb-5">
            <Button className="rounded-full border-solid text-blue-700 border-blue-700 border-2 hover:bg-black text-md pl-12 pt-2 pb-3 pr-12" >
              Create Quiz
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table className='w-full' aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Quiz No</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Created On</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((item, index) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                    <StyledTableCell>{item.category}</StyledTableCell>
                    <StyledTableCell>
                      <FormControlLabel
                        onChange={handleChange}
                        label={isChecked ? "Active" : "Inactive"}
                        control={<Switch defaultChecked />}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{new Date(item.createdAt).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell>
                      <Grid item xs={8}>
                        <DeleteIcon onClick={() => selectQuestionDelete(item._id)} />
                        <EditIcon onClick={() => updateSelectedQuestion(item._id)} />
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
