//import swal from "sweetalert";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "react-query";

const Profile = () => {
  const { userDetails } = useContext(AuthContext);
  
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data;
    },
  });

  const usersFilter = users.filter(
    (user) =>
    userDetails.email === user.email
  );



    return (
      <div className="max-w-screen-xl mx-auto px-28 pt-10">
        
  
        <div className="flex flex-row w-full gap-7 ">
          <div className="w-1/4 bg-white shadow-md rounded-xl flex items-center justify-center ">
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/medical-science-lab/blood-drop-icon.png"
              alt="user category"
              className="w-1/4 "
            />
          </div>
  
          <div className=" w-3/4 py-5 px-10 leading-10 bg-white shadow-md rounded-xl flex flex-row justify-between items-center">
            <div>
              <h2>
                Name: <span className="text-xl font-semibold">{usersFilter[0].displayName}</span>
              </h2>
              <p>Address: {usersFilter[0].district}, {usersFilter[0].upazila}</p>
              <p>Blood Group: {usersFilter[0].bloodGroup}</p>
              <p>Email: {usersFilter[0].email}</p>
              
            </div>
            <img
              src={usersFilter[0].image}
              alt="photo"
              className="w-[120px] h-[120px] rounded-full ring-4 ring-blue-500 ring-offset-white ring-offset-4"
            />
           
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;
  