import { createContext, useReducer } from "react";
import { SET_ACCOUNT, SET_BALANCE, SET_LOGOUT, SET_PROFILE, SET_BANNER } from "./ActionTypes";

// 초기 상태
//initial state
const initialState = {
  user: {
    account: '',
    balance: '',
    name: '',
    profile: '',
    banner: '',
  }
};

// Context 생성
/**
 * 빈 객체를 기본값으로 가지는 새로운 Context를 생성.
 * @type {React.Context<{}>}
 */
const Context = createContext({});    // 빈 객체가 기본값

/**
 * 사용자의 데이터를 관리하기 위한 리듀서 함수.
 * 
 * @param {Object} state - 현재 상태.
 * @param {Object} action - 수행할 액션을 나타내는 객체. `type`과 `payload`를 포함.
 * 
 * @returns {Object} 새로운 상태.
 * 
 * @case {SET_LOGOUT} 모든 사용자 데이터를 초기 상태로 재설정.
 * @case {SET_ACCOUNT} 사용자 데이터 중 `account`를 업데이트.
 * @case {SET_PROFILE} 사용자 데이터 중 `profile`을 업데이트.
 * @case {SET_BANNER} 사용자 데이터 중 `banner`를 업데이트.
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGOUT:
            return {
              ...state,
              user: {
                account: '',
                balance: '',
                name: '',
                profile: '',
                banner: '',
              },
            }
    case SET_ACCOUNT:
        return {
          ...state,
          user: {
            ...state.user,
            account: action.payload
          }
        }
    case SET_BALANCE:
      return {
          ...state,
          user: {
              ...state.user,
              balance: action.payload
          }
      }

    case SET_PROFILE:
      return {
          ...state,
          user: {
              ...state.user,
              profile: action.payload
          }
      }

    case SET_BANNER:
        return {
            ...state,
            user: {
                ...state.user,
                banner: action.payload
            }
        }
  }
}

// value 객체를 Context.Provider에 제공, value 객체는 state와 dispatch를 포함
/**
 * @param {Object} props - 자식 요소를 props로 받음
 * @returns {Object} Context.Provider - value 값을 가진 Context.Provider를 반환, value는 state와 dispatch를 포함한 객체
 * 
 * @function useReducer
 * @param {function} reducer - 상태를 변환하는 데 사용되는 reducer 함수
 * @param {object} initialState - 초기 상태 값
 * @returns {Array} state와 dispatch - 현재 상태와 상태를 업데이트하는 dispatch 함수를 반환
 */
const Provider = ({ children }) => {
  // reducer 함수와 initialState를 인수로 받아 상태와 상태를 업데이트하는 dispatch를 반환
  const [state, dispatch] = useReducer(reducer, initialState);
  // Context.Provider에 제공되는 값으로, 상태(state)와 상태를 업데이트하는 함수(dispatch)를 포함한 객체
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>
};

export { Context, Provider };
