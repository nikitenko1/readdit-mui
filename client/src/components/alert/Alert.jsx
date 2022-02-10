import { useSelector } from 'react-redux';
import Loading from './Loading';
import Toast from './Toast';

export const Alert = () => {
  const { alert } = useSelector((state) => state);
  return (
    <div>
      {alert.loading && <Loading />}
      {/* severity="error" "warning" "info" "success" */}
      {alert.errors && (
        <Toast
          toast={true}
          title="Errors"
          body={alert.errors}
          severity="error"
        />
      )}
      {alert.warning && (
        <Toast
          toast={true}
          title="Warning"
          body={alert.warning}
          severity="warning"
        />
      )}
      {alert.success && (
        <Toast
          open={true}
          title="Success"
          body={alert.success}
          severity="success"
        />
      )}
    </div>
  );
};

export const showErrMsg = (msg) => {
  return <div className="errMsg">{msg}</div>;
};
export const showSuccessMsg = (msg) => {
  return <div className="successMsg">{msg}</div>;
};

export default Alert;
