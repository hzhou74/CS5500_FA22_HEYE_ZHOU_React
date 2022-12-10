import React, { useEffect, useState } from "react";
import Tuits from "../tuits";
import tuitsArray from "../tuits/tuits-data.json";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import * as authService from "../../services/auth-service";
import * as tuitService from "../../services/tuits-service";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom'
const Home = () => {

  const navigate = useNavigate();
  const [authprofile, setAuthProfile] = useState({});
  const [tuits, setTuits] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  let searchQuery=searchParams.get('q');
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await authService.profile();
        setAuthProfile(user);
        const alltuit = await tuitService.findAllTuits();

        const tempTuits=[];
        if(searchQuery!==null && searchQuery.length>0 ){
          searchQuery=searchQuery.toUpperCase();
          for(let i=0;i<alltuit.length;i++){

            const tuit=alltuit[i].tuit.toUpperCase();

            if(tuit.indexOf(searchQuery)!==-1){
              tempTuits.push(alltuit[i]);
            }
          }
          setTuits(tempTuits);
        } else {
          setTuits(alltuit);
        }

      } catch (e) {
        //   console.log("session profile not found, send to login page");
        //   navigate("/profile/login");
      }
    };
    fetchProfile();
  }, [searchQuery]);

  const fetchAllTuits = async () => {
    try {
      const alltuit = await tuitService.findAllTuits();
      setTuits(alltuit);
    } catch (e) {
      // navigate("/profile/login");
    }
  };
  useEffect(() => {
    fetchAllTuits();
  }, []);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      tuit: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const uid = authprofile._id;

    const tuitCreated = await tuitService.createTuitByUser(uid, data);
    console.log(tuitCreated);
    const alltuit = await tuitService.findAllTuits();
    setTuits(alltuit);
    reset();
  };

  console.log(authprofile);
  console.log(tuits);

  return (
      <div className="ttr-home">
        <div className="border border-bottom-0">
          <h4 className="fw-bold p-2">Home Screen</h4>
          <div className="d-flex">
            <div className="p-2">
              <img
                  className="ttr-width-50px rounded-circle"
                  src="../images/nasa-logo.jpg"
                  alt="NASA logo"
              />
            </div>
            <div className="p-2 w-100">
              <form>
                <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
                  {authprofile.username
                      ? `Logged in as ${authprofile.username}`
                      : `Not logged in`}
                </Typography>

                <Controller
                    name={"tuit"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            id="tuit"
                            fullWidth
                            label="Type your tuit here"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            multiline
                            rows={4}
                            sx={{ mb: 1, border: "none" }}
                        />
                    )}
                />
              </form>
              <div className="row">
                <div className="col-9 ttr-font-size-150pc text-primary">
                  <i className="fas fa-portrait me-3"></i>
                  <i className="far fa-gif me-3"></i>
                  <i className="far fa-bar-chart me-3"></i>
                  <i className="far fa-face-smile me-3"></i>
                  <i className="far fa-calendar me-3"></i>
                  <i className="far fa-map-location me-3"></i>
                </div>
                <div className="col-3">
                  <Button
                      size="large"
                      variant="contained"
                      disabled={!authprofile.username}
                      onClick={handleSubmit(onSubmit)}
                  >
                    Tuit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tuits tuits={tuits} />
      </div>
  );
};
export default Home;
// import React from "react";
// import Tuits from "../tuits";
// import * as service from "../../services/tuits-service";
// import {useEffect, useState} from "react";
// import {useLocation, useParams} from "react-router-dom";
//
// const Home = () => {
//   const location = useLocation();
//   const {uid} = useParams();
//   const [tuits, setTuits] = useState([]);
//   const [tuit, setTuit] = useState('');
//   const userId = uid;
//   const findTuits = () => {
//     if(uid) {
//       return service.findTuitsByUser(uid)
//         .then(tuits => setTuits(tuits))
//     } else {
//       return service.findAllTuits()
//         .then(tuits => setTuits(tuits))
//     }
//   }
//   useEffect(() => {
//     let isMounted = true;
//     findTuits()
//     return () => {isMounted = false;}
//   }, []);
//   const createTuit = () =>
//       service.createTuit(userId, {tuit})
//           .then(findTuits)
//   const deleteTuit = (tid) =>
//       service.deleteTuit(tid)
//           .then(findTuits)
//   return(
//     <div className="ttr-home">
//       <div className="border border-bottom-0">
//         <h4 className="fw-bold p-2">Home Screen</h4>
//         {
//           uid &&
//           <div className="d-flex">
//             <div className="p-2">
//               <img className="ttr-width-50px rounded-circle"
//                    src="../images/nasa-logo.jpg"/>
//             </div>
//             <div className="p-2 w-100">
//               <textarea
//                   onChange={(e) =>
//                       setTuit(e.target.value)}
//                 placeholder="What's happening?"
//                 className="w-100 border-0"></textarea>
//               <div className="row">
//                 <div className="col-10 ttr-font-size-150pc text-primary">
//                   <i className="fas fa-portrait me-3"></i>
//                   <i className="far fa-gif me-3"></i>
//                   <i className="far fa-bar-chart me-3"></i>
//                   <i className="far fa-face-smile me-3"></i>
//                   <i className="far fa-calendar me-3"></i>
//                   <i className="far fa-map-location me-3"></i>
//                 </div>
//                 <div className="col-2">
//                   <a onClick={createTuit}
//                      className={`btn btn-primary rounded-pill fa-pull-right
//                                   fw-bold ps-4 pe-4`}>
//                     Tuit
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         }
//       </div>
//       <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
//     </div>
//   );
// };
// export default Home;