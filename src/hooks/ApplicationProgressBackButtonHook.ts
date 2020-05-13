import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LeadApplicationActions } from '../state/lead-application/actions';

const useApplicationProgressBackButtonHook = (): void => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => () => {
    if (history.action === 'POP') {
      dispatch(LeadApplicationActions.popApplicationProgressState());
    }
  }, [dispatch, history]);
};

export default useApplicationProgressBackButtonHook;
