import { createContext, Dispatch } from "react"

type CurrentUser = {
  name: string,
  edit: boolean
}

interface State {
  currentUser: CurrentUser | null;
  currentSortKey: string;
  userDeleted: boolean;
}

type Action = 
  | { type: "SHOW_NOTIFICATION"; payload: CurrentUser | null}
  | { type: "SET_SORTKEY"; payload: string }
  | { type: "SET_USER_DELETED"; payload: boolean }


const initialState: State = {
  currentUser: null,
  currentSortKey:"firstName",
  userDeleted:false,
}


const reducer = (state: State, action: Action): State => {
  switch (action.type) {

    case "SHOW_NOTIFICATION":
      return { 
        ...state, 
        currentUser: action.payload
      }
      

    case "SET_SORTKEY":
      return { 
        ...state, 
        currentSortKey: action.payload
      }

    case "SET_USER_DELETED":
      return { 
        ...state, 
        userDeleted: action.payload
      }
  }
}


const UsersContext = createContext<{
  state: State 
  dispatch: Dispatch<Action> | null
}>({ state: initialState, dispatch: null })

export { initialState, reducer, UsersContext }