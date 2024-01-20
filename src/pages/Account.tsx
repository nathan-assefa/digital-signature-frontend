import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserAccountForm from "../forms/UserAccountForm";
import useProfile from "../hooks/useUserAccount";
import axios from "axios";
import AuthToken from "../utils/AuthToken";
import LeftSideBar from "../components/LeftSideBar";
import { useEffect } from "react";
// import { useState } from "react";

const Account = () => {
  // const [error, setError] = useState<string | null>(null);
  const { profile, isLoading, isError } = useProfile();

  const accessToken = AuthToken();

  const queryClient = useQueryClient();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  interface UpdatedProfile {
    first_name: string;
    last_name: string;
    email: string;
  }

  const apiUrl: string = "http://localhost:8000/api";

  const AccountMutation = useMutation(
    async (updatedPost: UpdatedProfile) => {
      const { first_name, last_name, email } = updatedPost;
      const url = `${apiUrl}/update-profile/`;
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + String(accessToken),
      };
      const data = {
        first_name: first_name || "",
        last_name: last_name || "",
        email: email || "",
      };

      try {
        const response = await axios.patch(url, data, { headers });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    }
  );

  const onProfileUpdate = async (formData: {
    first_name: string;
    last_name: string;
    email: string;
  }): Promise<void> => {
    try {
      const updatedData: any = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      };

      await AccountMutation.mutateAsync(updatedData);
    } catch (error) {
      Promise.reject(error);
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>Can't fetch user profile</div>;
  }
  return (
    <div>
      <div>
        <div className="account-wrapper">
          <div className="account-left-col">
            <LeftSideBar />
          </div>
          <div className="account-right-col">
            <div className="account-header">Account</div>
            <div className="account-detail">Details</div>
            <div className="user-account-from">
              <UserAccountForm
                isLoading={false}
                isError={false}
                autoFocus={true}
                initialValue={{
                  first_name: profile?.user.first_name || "",
                  last_name: profile?.user.last_name || "",
                  email: profile?.user.email || "",
                }}
                onSubmit={onProfileUpdate}
              />
              {/* {error && (
                <p className="error-while-registration">
                  <div style={{ color: "red" }}>{error}</div>
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
