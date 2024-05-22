import { Routes, Route } from 'react-router-dom';
import Home from './quizPages/Home';
import CreateQuiz from './quizPages/CreateQuiz';
import MyQuiz from './quizPages/MyQuiz';
import Playquiz from './quizPages/PlayQuiz';
// import MyQuiz from './quizPages/myQuiz';
// import PlayQuiz from './quizPages/playQuiz';
import ResultQuiz from './quizPages/ResultQuiz';
import DrawerAppBar from './components/navbar';
function App() {
  return (
    <>
    <div>
    <DrawerAppBar/>
    </div>
    <Routes>
         <Route path="/" element={<Home />} />
      <Route path="/createquiz" element={<CreateQuiz />} />
      <Route path="/myquiz" element={<MyQuiz />} />
      <Route path="/playquiz" element={<Playquiz />} />
      <Route path="/result" element={<ResultQuiz />} />
  </Routes>
  </>
  );
}

export default App;
