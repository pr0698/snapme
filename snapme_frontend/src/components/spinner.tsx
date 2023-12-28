import { CirclesWithBar } from "react-loader-spinner";

function Spinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <CirclesWithBar
        color="#00BFFF"
        height={100}
        width={200}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
