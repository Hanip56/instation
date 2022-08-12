import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../features/auth/userSlice";
import Spinner from "../UI/Spinner";

const ModalEditPhoto = ({ hideModal }) => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSuccess) {
      hideModal();
    }
  }, [isSuccess, hideModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("postimage", profileImage);

    dispatch(updateProfilePicture(formdata));
  };

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={hideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex flex-col justify-center items-center rounded-md">
        {isLoading && <Spinner />}

        {!isLoading && (
          <form onSubmit={handleSubmit}>
            <div className="w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] bg-white rounded-md overflow-hidden flex justify-center items-center">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt=""
                  className="w-full h-full object-contain object-center"
                ></img>
              ) : (
                <>
                  <button
                    className="bg-blue-ig text-white font-semibold p-2 px-4 rounded-md hover:bg-blue-ig/60"
                    onClick={() => inputRef?.current?.click()}
                    type="button"
                  >
                    Select File
                  </button>
                  <input
                    type="file"
                    name="postimage"
                    id="file"
                    ref={inputRef}
                    className="hidden"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </>
              )}
            </div>
            {profileImage && (
              <button
                type="submit"
                className="py-1 px-2 bg-blue-ig rounded-md w-20 text-sm mt-4 ml-[37%] text-white"
              >
                Submit
              </button>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default ModalEditPhoto;
