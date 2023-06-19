import { createMachine, assign } from 'xstate';
import questions from './questions.json';

export const appMachine = createMachine({
    predictableActionArguments: true,
  id: 'app',
  initial: 'userInfo',
  context: {
    userInfo: {
        name: "",
        email: "",
        hasSubmittedOnce: false
    },
    survey: {
        responses: {},
        questions,
        hasSubmittedOnce: false
    }
  },
  states: {
    userInfo: {},
    survey: {},
    confirmation: {}
  },
  on: {
    SUBMIT_USER_INFO: {
      target: 'survey',
      actions: assign({
        userInfo: (context, event) => ({
            ...event.userInfo,
            hasSubmittedOnce: true}
            ),
      })
    },
    SUBMIT_SURVEY: {
        target: 'confirmation',
        actions: assign({
          survey: (context, event) => ({
            ...context.survey,
            ...event.survey,
            hasSubmittedOnce: true}
            ),
        })
      },
      BACK_TO_USER_INFO: {
        target: 'userInfo'
      },
      BACK_TO_SURVEY: {
        target: 'survey'
      },
      RESET: {
        target: "userInfo",
        actions: assign({
            userInfo: ()=>({
                name: "",
                email: "",
                hasSubmittedOnce: false
            }),
            survey: ()=>({
                responses: {},
                questions,
                hasSubmittedOnce: false
            })
        })
      }
  }
});