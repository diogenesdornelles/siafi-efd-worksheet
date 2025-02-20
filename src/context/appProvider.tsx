import { ReactNode, useReducer, FC } from 'react';
import { reducer } from './appReducer';
import { AppState } from './appState';
import { AppContext } from './appContext';


interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [appState, dispatch] = useReducer(reducer, AppState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
