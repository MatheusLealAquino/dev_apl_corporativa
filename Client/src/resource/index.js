import AnswersProvider from './AnswersProvider'
import QuestionsProvider from './QuestionsProvider'
import CustomUsersProvider from './CustomUsersProvider'
import SubjectsProvider from './SubjectsProvider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AnswersService = new AnswersProvider('answers')
export const QuestionsService = new QuestionsProvider('questions')
export const CustomUsersService = new CustomUsersProvider('CustomUsers')
export const SubjectsService = new SubjectsProvider('Subjects')
