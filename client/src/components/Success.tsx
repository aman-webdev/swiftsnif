import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

const Success = ({data,setData}:{data:any,setData:React.Dispatch<React.SetStateAction<any>>}) => {
    const URL = `${import.meta.env.VITE_BE_URL}/${data.shortId}`
  
    const copyToClipboard = async() => {
      await window.navigator.clipboard.writeText(URL)
    }
  
    return (
      <div className=" mt-20 mx-auto md:w-1/2  ">
        <h1 className=" text-3xl sm:text-4xl font-heading ">Your Shortened URL is</h1>
        <Link onClick={copyToClipboard} className="text-center w-full  block mt-6 text-lg sm:text-xl bg-[#DCF2F1] px-6 py-2 rounded-xl border-[#4c4c4c] border-4" target="_blank" to={URL}>{URL}</Link>
        {data.expirationTime && <div>
          <p className="font-heading mt-8">Expires On : <span>{new Date(data.expirationTime).toString()}</span></p>
        </div>}
       <div className="mt-20 mx-auto w-32 h-32 md:w-48 md:h-48 ">
        <QRCode  color="#4c4c4c" style={{border:"6px solid #4c4c4c",borderRadius:"4px", height: "auto", maxWidth: "100%", width: "100%",padding:"5px" }} value={URL} />
        <p className="text-xs text-center mt-3">Scan the QR Code to visit</p>
        </div> 
        <div>
        <p onClick={()=>setData('')} className="mt-20 text-center border-4 border-[#4c4c4c] font-bold w-44 py-2 mx-auto cursor-pointer">Create new</p>
  
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 text-center mx-auto mt-2" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>
        </div>
      </div>
    );
  };
  

  export default Success