import { getUserId } from "./localStorageUtil.js";
import { openWsConnection, closeWsConnection } from './wsUtil.js';
import { toast } from 'react-toastify';

const showGrade = (grade) => {
  const gradeElement = document.querySelector('.grade-container');
  gradeElement.innerHTML = grade; 
  gradeElement.classList.add('active')
  gradeElement.classList.add(grade.toLowerCase())
}

export const aggregateExercises = async () => {
  let userId = getUserId();
  const exercises = [...document.querySelectorAll('.link-card')];
  const card = document.querySelector('.link-card-grid')
  if(!card) {
    return;
  }
  const grades = await fetch(`api/users/${userId}`);
  const data = await grades.json() 

  let completed = []
  let unanswered = []
  console.log(unanswered.length)
  console.log('should start aggereagae')
  exercises.forEach(exercise => {
    const gradeInfo = data.find(i => i.exerciseid == exercise.id);
    const mark = exercise.getElementsByClassName('grade-container')
    if(gradeInfo) {
      mark[0].innerHTML = gradeInfo.grade;
      mark[0].classList.add(gradeInfo.grade.toLowerCase())
      exercise.classList.add('show')
      completed.push(exercise.outerHTML)
      return;
    }

    if(unanswered.length < 3) {
      exercise.classList.add('show')
    }
    unanswered.push(exercise.outerHTML)
  }); 

  card.innerHTML =  `
  ${completed.length > 0 ? '<h1>Exercise list which are already <span class="text-gradient">Completed</span></h1>' : ''}
    ${completed.join('')}
  ${unanswered.length > 0 ? '<h1>Exercise list which are <span class="text-gradient">Unanswered</span></h1>' : ''}
    ${unanswered.join('')}
  `;  
}
// Initialize websocket 
export const initWsConnection = async () => {
  const handleMessage = (messageEvent) => {
  const { exerciseId, result } = JSON.parse(messageEvent.data)
  
    showGrade(result);

    toast(`Finished grading exercise ${exerciseId}. You got ${result} mark`)
    const card = document.querySelector('.link-card-grid')
    if(card) {
      aggregateExercises();
    }

    return false;
  }

  openWsConnection(handleMessage);
  closeWsConnection()
};

export const disableReSubmission = async () => {
  const container = document.querySelector('.instructions'); 
  const exerciseId = container.id
  const grade = await fetch(`/api/users/${getUserId()}/exercises/${exerciseId}`)
  const data = await grade.json()
  
  if(data) {
    showGrade(data.grade)
    document.querySelector('.code-pannel')
      .toggleAttribute('disabled', true)
    document.querySelector('.button-primary')
      .toggleAttribute('disabled', true)
  }
};
