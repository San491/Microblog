// import { IKUpload, IKContext } from "imagekitio-react";
// import { useRef } from "react";

// const publicKey = import.meta.env.VITE_REACT_publicKey;
// const urlEndpoint = import.meta.env.VITE_REACT_urlEndpoint;

// console.log(publicKey + "key");

// const authenticator = async () => {
//     try {
//         const response = await fetch('http://localhost:8800/api/upload/auth');

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`Request failed with status ${response.status}: ${errorText}`);
//         }

//         const data = await response.json();
//         const { signature, expire, token } = data;
//         return { signature, expire, token };
//     } catch (error) {
//         throw new Error(`Authentication request failed: ${error}`);
//     }
// };

// const onError = (err: any) => {
//     console.log("Error", err);
// };

// const onSuccess = (res: any) => {
//     console.log("Success", res);
// };

// const onUploadProgress = (progress: any) => {
//     console.log("Progress", progress)
// }

// const Upload = () => {
//     const IKUploadRef = useRef<any>(null);

//     return (
//         <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator} >
//             <IKUpload useUniqueFileName onError={onError} onSuccess={onSuccess} onUploadProgress={onUploadProgress} 
//             style={{display:'none'}}
//             ref={IKUploadRef}/>
//             <button onClick={()=>IKUploadRef.current?.click()}>Upload</button>
//         </IKContext>
//     )

// }

// export default Upload;