const getErrorMsg = (err) => {
  if (err?.response?.data?.msg) {
    return err.response.data.msg;
  } else if (err?.msg === 'Network Error') {
    return err.msg;
  } else {
    return 'Something went wrong.';
  }
};

export default getErrorMsg;
