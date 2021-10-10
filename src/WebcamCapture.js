import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router';
import "./WebcamCapture.css";

const videoConstraints = { 
    width: 250,
    height: 400,
    facingMode: "user",
};

function WebcamCapture() {
    const webcamref = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const capture = useCallback(() => {
        const imagesrc = webcamref.current.getScreenshot();
        dispatch(setCameraImage(imagesrc));
        history.push('/preview')
     
    },[webcamref])

    return (
        <div className="webcamcapture">
            <Webcam 
                audio={false}
                height={videoConstraints.height}
                ref={webcamref}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />

            <RadioButtonUncheckedIcon
                className="webcapture_button" onClick={capture} fontSize="large"
            />
         
            
        </div>
    )
}

export default WebcamCapture
