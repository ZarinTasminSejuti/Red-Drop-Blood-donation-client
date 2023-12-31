import { BsThreeDotsVertical } from "react-icons/bs";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "react-query";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import PropTypes from "prop-types"; // ES6
import { useContext, useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const RecentDonation = () => {

  const [recentData, setRecentData] = useState([]);
  const navigate = useNavigate();
  const [somethingHappend, setSomethingHappend] = useState(true);
const { userDetails } = useContext(AuthContext);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://red-drop-server-two.vercel.app/CreateDonation");
        const data = await response.json();
        setRecentData(data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [somethingHappend]);


  const slicedData = recentData
  ?.filter((data) => data.requesterEmail === userDetails.email)
  .sort((a, b) => b.submitTime - a.submitTime)
  .slice(0, 3);


console.log(slicedData.length);
 

   // Function to handle user deletion
   const handleDelete = (Id) => {
    console.log(Id);
    fetch(`https://red-drop-server-two.vercel.app/deleteDonationData/${Id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          swal("Deleted!", "Donation Data has been deleted.", "success");
          setSomethingHappend(!somethingHappend);
          navigate("/dashboard");
        }
      });
  };
    

  return (
    <div>
      {slicedData?.length === 0 ? <p className="text-slate-500 text-center mt-24">You do not have any donation request</p> : 
        <div>
      <div className="my-5 p-10 text-center">
        <h2 className="text-2xl">My Created All Donation Requests</h2>
      </div>
 
     
        <div className="relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* table header */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Serial
                </th>
                <th scope="col" className="px-4 py-3">
                  Recipient Profile
                </th>
                <th scope="col" className="px-4 py-3">
                  Donation Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Donation Time
                                </th>
                <th scope="col" className="px-4 py-3">
                  Donation Status
                </th>

                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            {/* table body */}
            <tbody>
              {slicedData.map((singleDonationData, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <p>{index + 1}</p>
                    </div>
                  </td>

                  {/* user profile with map function */}
                  <th
                    scope="row"
                    className="flex items-center pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="p-3">
                      <div className="text-base font-semibold">
                        {singleDonationData.recipientName}
                      </div>
                      <div className="flex  flex-col gap-1 font-normal text-gray-500">
                        <p> Upazilla: {singleDonationData.recipientUpazila}</p>
                        <p> District: {singleDonationData.recipientDistrict}</p>
                      </div>
                    </div>
                  </th>

                  <td className="px-6 py-4 ">
                    <p>{singleDonationData.donationDate}</p>
                  </td>
                  <td className="px-6 py-4 ">
                          <p>{singleDonationData.donationTime}</p>
                      </td>

                  <td className="px-6 py-4">
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <div tabIndex={0} role="button" className=" m-1">
                        <button className=" rounded-md text-white font-bold bg-green-500 border-none btn-primary px-3 py-1">
                          <BsThreeDotsVertical />
                        </button>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a>Pending</a>
                        </li>

                        <li>
                          <a>inprogress</a>
                          {/* onClick={() => handleMVol(user)} */}
                        </li>
                        <li>
                          <a>Done</a>
                          {/* onClick={() => handleBlock(user)} */}
                        </li>
                        <li>
                          <a>Canceled</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                  {/* <td className="px-6 py-4">{user.role}</td> */}
                  <td className="pr-6 py-4">
                    <div className="flex justify-evenly items-center text-xl">
                      <a
                        href="#"
                        className="text-red-600"
                         onClick={() => handleDelete(singleDonationData._id)}
                      >
                        {" "}
                        <MdDelete />
                      </a>
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <FaEdit />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
      }
    </div>
  );
};

RecentDonation.propTypes = {
  recentData: PropTypes.array,
};

export default RecentDonation;
