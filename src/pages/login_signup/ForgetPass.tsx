import React from 'react'
import { ChangeEvent, useState } from 'react';
import { supabase } from '../../createClient';




const ForgetPass = () => {
    const [input, setInput] = useState<Record<string, string>>({});
    const [step, setStep] = useState("prompt"); // this shit has prompt, code, change


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setInput((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleForget = async (event: React.FormEvent) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from("DIM_USER")
            .select("*")
            .eq("STUDENT_ID", input.id);

        if (error) {
            console.error("Error fetching data:", error.message);
        }
        if (data && data.length > 0) {
            const user = data[0];
            if (user.USER_EMAIL === input.email) {
                setStep("code");

                try {
                    const response = await fetch("http://localhost:5000/api/send-reset-code", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: input.email }),
                    });
                    const data = await response.json();

                    if (response.ok) {
                        alert(data.message);

                    } else {
                    }
                } catch (error) {
                    console.error("Error:", error);
                }

            } else {
                alert("Request failed, invalid ID or Email");
            }
        } else {
            alert("No matching records found.");
        }
    };

    const InputCode = () => {
        const handleCancel = (event: React.FormEvent) => {
            event.preventDefault();
            setStep("prompt");
        };
        const [code, setCode] = useState("");

        const handleVerify = async (event: React.FormEvent) => {
            event.preventDefault();

            try {
                const response = await fetch("http://localhost:5000/api/verify-reset-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: input.email, code }),
                });
                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    setStep("change")
                }


            } catch (error) {
                console.error("Error:", error);
            }
        };

        return (
            <div
                className="form-container
          justify-between items-center 
          flex flex-col sm:block
          "
            >
                <input
                    placeholder="Reset Code"
                    id="id-input"
                    className="
              w-full
              border-black border-2
              rounded-full
              h-11 p-5 mb-3
              font-normal
              "

                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button
                    id="verify-button"
                    onClick={handleVerify}
                    className="
                    bg-gradient-to-r
                    from-[#6B66FB] to-[#000000]
                    text-white
                    font-normal
                    rounded-full
                    w-28 h-10
                    mt-3 self-end
                  "

                >
                    Verify Code
                </button>

                <button
                    id="cancel"
                    className="
                  font-thin text-sm ml-2
                  text-left
                  "
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        );
    };
    const ResetPassword = () => {
        const [newPassword, setNewPassword] = useState("");

        const handleReset = async (event: React.FormEvent) => {
            event.preventDefault();


            if (!newPassword) {
                alert("Please enter a new password.");
                return;
            }

            try {

                const { data, error } = await supabase
                    .from("DIM_USER")
                    .update({ USER_PASS: newPassword })
                    .eq("STUDENT_ID", input.id);

                if (error) {
                    console.error("Error updating password:", error.message);
                    alert("Failed to update password. Please try again.");
                } else {
                    alert("Password updated successfully!");
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred. Please try again.");
            }

        };
        return (
            <div className="form-container flex flex-col">
                <h2>Reset Your Password</h2>
                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full
              border-black border-2
              rounded-full
              h-11 p-5 mb-3
              font-normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                    onClick={handleReset}
                    className="
                    bg-gradient-to-r
                    from-[#6B66FB] to-[#000000]
                    text-white
                    font-normal
                    rounded-full
                    w-35 h-10
                    mt-3 self-end
                  "
                >
                    Reset Password
                </button>
            </div>
        );
    };

    return (
        <div>
            {step === "prompt" && (
                <div
                    className="form-container
              justify-between items-center
              flex flex-col sm:block
              "
                >
                    <input
                        placeholder="ID Number"
                        id="id-input"
                        className="
                  w-full
                  border-black border-2
                  rounded-full
                  h-11 p-5 mb-3
                  font-normal
                  "
                        name="id"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        id="email-input"
                        onChange={handleChange}
                        className="
                  w-full
                  border-black border-2
                  rounded-full
                  h-11 p-5 mb-3
                  font-normal
                  "
                        name="email"
                    />
                    <div
                        className="flex w-full
                justify-between flex-col
                items-stretch
                "
                    >
                        <button
                            id="return-login"
                            className="
                  font-thin text-sm ml-2
                  text-left
                  "
                        >
                            Return to Log In
                        </button>
                        <button
                            id="submit-button"
                            onClick={handleForget}
                            className="
                    bg-gradient-to-r
                    from-[#6B66FB] to-[#000000]
                    text-white
                    font-normal
                    rounded-full
                    w-28 h-10
                    mt-3 self-end
                  "
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
            {step === "code" && <InputCode />}
            {step === "change" && <ResetPassword />}
        </div>
    );

};

export default ForgetPass;