import AnswersProvider from './AnswersProvider'
import QuestionsProvider from './QuestionsProvider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AnswersService = new AnswersProvider('answers')
export const QuestionsService = new QuestionsProvider('questions')
