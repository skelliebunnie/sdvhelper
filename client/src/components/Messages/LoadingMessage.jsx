import { LoaderIcon } from "lucide-react-motion";

const LoadingMessage = () => {
  return (
    <div className="loader">
      <LoaderIcon trigger="mount" size={64} />
    </div>
  );
};

export default LoadingMessage;
