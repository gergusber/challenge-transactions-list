import { navigate } from "../NaiveRouter";

const BackButton: React.FC = () => {
  const handleGoBack = () => navigate(`/transactions`);

  return (
    <div>
      <button
        onClick={handleGoBack}
        type="button"
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
      >
        Go back
      </button>
    </div>
  );
};


export default BackButton;