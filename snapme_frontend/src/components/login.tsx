import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwt_decode from "jwt-decode";
import { client } from "../client";

function Login() {
  const navigate = useNavigate();
  const responseGoogle = (credentialResponse: CredentialResponse) => {
    const response: any = jwt_decode(credentialResponse.credential || "");
    localStorage.setItem("user", JSON.stringify(response));
    const { name, sub, picture } = response;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    
      navigate("/", { replace: true });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative h-full w-full">
        <video
          src={shareVideo}
          // @ts-ignore
          type="video/mp4"
          loop
          muted
          controls={false}
          autoPlay
          className="h-full w-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
