import { useEffect, useState } from "react";

export default function useAsync({
  fn = () => {},
  onSuccess = () => {},
  onError = () => {},
  callOnMount = false,
  callOnMountData = {},
}) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState(null);

  async function main(data) {
    try {
      setLoading(true);
      const res = await fn(data);
      setRequestData(data);
      setResult(res);
      setSuccess(true);
    } catch (error) {
      setError(error?.response?.data?.message || error);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setError(null);
    setSuccess(false);
    setResult(null);
    setLoading(false);
  }

  useEffect(() => {
    if (callOnMount) {
      main(callOnMountData);
    }
  }, []);

  useEffect(() => {
    if (success) {
      onSuccess();
    }

    if (error) {
      onError();
    }

    return () => {
      reset();
    };
  }, [success, error]);

  return { main, error, success, loading, result, requestData };
}
