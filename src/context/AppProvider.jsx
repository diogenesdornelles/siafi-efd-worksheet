import proptypes from 'prop-types';
import { useReducer } from 'react';
import { reducer } from './AppReducer';
import { AppState } from './AppState';
import { AppContext } from './AppContext';

/**
 * Global context provider component for the AppContext.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} - The AppContext provider component, with values app global state and dispatch function gived by useReducer hook.
 */

export const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(reducer, AppState);
  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: proptypes.node,
};
